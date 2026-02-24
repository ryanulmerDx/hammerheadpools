import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'HammerHead Pools — Pool Maintenance & Repair in Phoenix';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a2342 0%, #0d3b6e 55%, #0a2342 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top cyan glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '500px',
            background: 'radial-gradient(ellipse, rgba(34,211,238,0.18) 0%, transparent 70%)',
          }}
        />

        {/* Logo circle */}
        <div
          style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'white',
            marginBottom: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 0 60px rgba(34,211,238,0.3)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${baseUrl}/logo-mascot.webp`}
            width={140}
            height={140}
            alt=""
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontSize: '80px',
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-2px',
            lineHeight: 1,
            marginBottom: '6px',
          }}
        >
          HAMMERHEAD
        </div>
        <div
          style={{
            fontSize: '38px',
            fontWeight: 600,
            color: '#22d3ee',
            letterSpacing: '18px',
            marginBottom: '40px',
          }}
        >
          POOLS
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '26px',
            color: 'rgba(224,242,254,0.65)',
            textAlign: 'center',
          }}
        >
          Pool Maintenance &amp; Repair · Phoenix Valley
        </div>
      </div>
    ),
    { ...size }
  );
}
