import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'VibeMiner — Decentralized Mining, Simplified';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0f14 0%, #0f172a 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Diamond + logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
          <svg
            width="72"
            height="72"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
            <path
              d="M24 2 L46 24 L24 46 L2 24 Z"
              fill="url(#g)"
              stroke="#22d3ee"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              background: 'linear-gradient(90deg, #22d3ee 0%, #34d399 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            VibeMiner
          </span>
        </div>
        <p
          style={{
            fontSize: 28,
            color: '#94a3b8',
            margin: 0,
            maxWidth: 600,
            textAlign: 'center',
          }}
        >
          Decentralized mining, simplified
        </p>
        <p
          style={{
            fontSize: 20,
            color: '#64748b',
            marginTop: 16,
            margin: 0,
          }}
        >
          Mine cryptocurrencies for networks that need you
        </p>
      </div>
    ),
    { ...size }
  );
}
