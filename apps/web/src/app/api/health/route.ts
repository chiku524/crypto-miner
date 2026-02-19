import { NextResponse } from 'next/server';
import { site } from '@/lib/site';

/**
 * Simple health check for uptime monitoring and load balancers.
 * GET /api/health returns { ok, name, version }.
 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    name: site.name,
    version: '1.0.1',
  });
}
