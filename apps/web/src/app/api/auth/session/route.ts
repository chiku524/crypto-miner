import { NextResponse } from 'next/server';
import { getSessionCookie, getUserIdFromSession, getEnv } from '@/lib/auth-server';

export async function GET(request: Request) {
  try {
    const token = getSessionCookie(request);
    if (!token) {
      return NextResponse.json({ user: null });
    }

    const userId = await getUserIdFromSession(token);
    if (!userId) {
      return NextResponse.json({ user: null });
    }

    const { DB } = await getEnv();
    const row = await DB.prepare(
      'select id, email, account_type, display_name, network_name, network_website, created_at, updated_at from users where id = ?'
    )
      .bind(userId)
      .first();

    if (!row) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: row.id,
        email: row.email,
        account_type: row.account_type,
        display_name: row.display_name,
        network_name: row.network_name,
        network_website: row.network_website,
        created_at: row.created_at,
        updated_at: row.updated_at,
      },
    });
  } catch (err) {
    console.error('Session error:', err);
    return NextResponse.json({ user: null });
  }
}
