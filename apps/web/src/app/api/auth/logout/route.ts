import { NextResponse } from 'next/server';
import { getSessionCookie, deleteSession, clearSessionCookie } from '@/lib/auth-server';

export async function POST(request: Request) {
  try {
    const token = getSessionCookie(request);
    if (token) {
      await deleteSession(token);
    }
    const response = NextResponse.json({ ok: true });
    response.headers.set('Set-Cookie', clearSessionCookie());
    return response;
  } catch (err) {
    console.error('Logout error:', err);
    const response = NextResponse.json({ ok: true });
    response.headers.set('Set-Cookie', clearSessionCookie());
    return response;
  }
}
