/**
 * Server-side auth helpers for API routes.
 * Uses Cloudflare bindings (D1, KV) via getCloudflareContext().
 */
import { getCloudflareContext } from '@opennextjs/cloudflare';

// Cloudflare binding types (from @cloudflare/workers-types)
interface EnvBindings {
  DB: D1Database;
  KV: KVNamespace;
  R2: R2Bucket;
}
import { randomBytes, pbkdf2 } from 'crypto';
import { promisify } from 'util';

const pbkdf2Async = promisify(pbkdf2);

const SALT_LEN = 16;
const KEY_LEN = 64;
const ITERATIONS = 100000;
const SESSION_TTL = 60 * 60 * 24 * 7; // 7 days
const SESSION_COOKIE = 'vibeminer-session';

const MAX_EMAIL_LEN = 256;
const MAX_PASSWORD_LEN = 128;
const MIN_PASSWORD_LEN = 6;
const MAX_DISPLAY_NAME_LEN = 128;
const MAX_NETWORK_NAME_LEN = 128;
const MAX_NETWORK_WEBSITE_LEN = 256;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: unknown): email is string {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  return trimmed.length > 0 && trimmed.length <= MAX_EMAIL_LEN && EMAIL_REGEX.test(trimmed);
}

export function validatePasswordLength(password: unknown): boolean {
  if (typeof password !== 'string') return false;
  return password.length >= MIN_PASSWORD_LEN && password.length <= MAX_PASSWORD_LEN;
}

export { MIN_PASSWORD_LEN, MAX_PASSWORD_LEN, MAX_DISPLAY_NAME_LEN, MAX_NETWORK_NAME_LEN, MAX_NETWORK_WEBSITE_LEN };

export type AccountType = 'user' | 'network';

export interface User {
  id: string;
  email: string;
  account_type: AccountType;
  display_name: string | null;
  network_name: string | null;
  network_website: string | null;
  created_at: string;
  updated_at: string;
  is_admin?: boolean;
}

export function hashPassword(password: string, salt: Buffer): Promise<string> {
  return pbkdf2Async(password, salt, ITERATIONS, KEY_LEN, 'sha256').then((buf) =>
    buf.toString('hex')
  );
}

export function verifyPassword(
  password: string,
  saltHex: string,
  hashHex: string
): Promise<boolean> {
  const salt = Buffer.from(saltHex, 'hex');
  return hashPassword(password, salt).then((h) => h === hashHex);
}

export function generateId(): string {
  return randomBytes(16).toString('hex');
}

export function generateSessionToken(): string {
  return randomBytes(32).toString('hex');
}

export function getSessionCookie(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
  return match ? match[1] : null;
}

export function sessionCookieHeader(token: string, maxAge: number = SESSION_TTL): string {
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

export function clearSessionCookie(): string {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

let _env: EnvBindings | null = null;

export async function getEnv(): Promise<EnvBindings> {
  if (_env) return _env;
  try {
    const ctx = getCloudflareContext();
    _env = ctx.env as EnvBindings;
    return _env;
  } catch {
    throw new Error('Cloudflare context not available. Run with wrangler (npm run preview) or deploy to Cloudflare.');
  }
}

export async function createSession(userId: string): Promise<string> {
  const { KV } = await getEnv();
  const token = generateSessionToken();
  await KV.put(`session:${token}`, userId, { expirationTtl: SESSION_TTL });
  return token;
}

export async function getUserIdFromSession(token: string): Promise<string | null> {
  if (!token) return null;
  const { KV } = await getEnv();
  const userId = await KV.get(`session:${token}`);
  return userId;
}

export async function deleteSession(token: string): Promise<void> {
  if (!token) return;
  const { KV } = await getEnv();
  await KV.delete(`session:${token}`);
}
