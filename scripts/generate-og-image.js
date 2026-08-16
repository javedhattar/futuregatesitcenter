import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020B18" />
      <stop offset="50%" stop-color="#021B4E" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EA580C" />
      <stop offset="100%" stop-color="#F97316" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.4" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />

  <!-- Subtle Grid Accent -->
  <g opacity="0.05" stroke="#FFFFFF" stroke-width="1">
    <line x1="0" y1="105" x2="1200" y2="105" />
    <line x1="0" y1="210" x2="1200" y2="210" />
    <line x1="0" y1="315" x2="1200" y2="315" />
    <line x1="0" y1="420" x2="1200" y2="420" />
    <line x1="0" y1="525" x2="1200" y2="525" />
    <line x1="200" y1="0" x2="200" y2="630" />
    <line x1="400" y1="0" x2="400" y2="630" />
    <line x1="600" y1="0" x2="600" y2="630" />
    <line x1="800" y1="0" x2="800" y2="630" />
    <line x1="1000" y1="0" x2="1000" y2="630" />
  </g>

  <!-- Left Accent Bar -->
  <rect x="0" y="0" width="16" height="630" fill="url(#orangeGrad)" />

  <!-- Top Badge -->
  <g transform="translate(80, 80)">
    <rect x="0" y="0" width="360" height="40" rx="8" fill="#1E293B" stroke="#334155" stroke-width="1" />
    <circle cx="20" cy="20" r="6" fill="#22C55E" />
    <text x="36" y="26" fill="#E2E8F0" font-family="Arial, sans-serif" font-size="14" font-weight="bold" letter-spacing="1.5">VERIFIED IT &amp; AI TRAINING CENTER</text>
  </g>

  <!-- Main Title -->
  <text x="80" y="200" fill="#FFFFFF" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="58" font-weight="900" letter-spacing="-1">
    FUTURE GATES IT CENTER
  </text>

  <!-- Slogan with Accent -->
  <text x="80" y="265" fill="#F97316" font-family="'Plus Jakarta Sans', Arial, sans-serif" font-size="36" font-weight="800" letter-spacing="0.5">
    Where Skills Become Your Income
  </text>

  <!-- Subtitle Description -->
  <text x="80" y="325" fill="#94A3B8" font-family="Arial, sans-serif" font-size="20" font-weight="normal">
    Practical IT, AI &amp; Career Training • Khushab, Punjab, Pakistan
  </text>
  <text x="80" y="358" fill="#94A3B8" font-family="Arial, sans-serif" font-size="20" font-weight="normal">
    Web Development • Graphic Design • Video Editing • AI Tools • MS Office • SEO
  </text>

  <!-- Features Badges Row -->
  <g transform="translate(80, 420)">
    <!-- Badge 1 -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="220" height="60" rx="12" fill="#0F172A" stroke="#1E293B" stroke-width="1.5" />
      <text x="24" y="26" fill="#F97316" font-family="Arial, sans-serif" font-size="12" font-weight="bold">ONLINE VERIFIABLE</text>
      <text x="24" y="46" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="16" font-weight="bold">Certificates</text>
    </g>

    <!-- Badge 2 -->
    <g transform="translate(240, 0)">
      <rect x="0" y="0" width="220" height="60" rx="12" fill="#0F172A" stroke="#1E293B" stroke-width="1.5" />
      <text x="24" y="26" fill="#38BDF8" font-family="Arial, sans-serif" font-size="12" font-weight="bold">HANDS-ON LABS</text>
      <text x="24" y="46" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="16" font-weight="bold">100% Practical</text>
    </g>

    <!-- Badge 3 -->
    <g transform="translate(480, 0)">
      <rect x="0" y="0" width="220" height="60" rx="12" fill="#0F172A" stroke="#1E293B" stroke-width="1.5" />
      <text x="24" y="26" fill="#4ADE80" font-family="Arial, sans-serif" font-size="12" font-weight="bold">GLOBAL EARNINGS</text>
      <text x="24" y="46" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="16" font-weight="bold">Freelancing Support</text>
    </g>
  </g>

  <!-- Bottom Details Bar -->
  <g transform="translate(80, 535)">
    <text x="0" y="20" fill="#64748B" font-family="Arial, sans-serif" font-size="15" font-weight="bold">
      🌐 futuregatesitcenter.com  •  📞 +92301-6775690  •  ✉️ futuregatesitcenter@gmail.com
    </text>
  </g>

  <!-- Right Logo Badge -->
  <g transform="translate(930, 200)">
    <circle cx="110" cy="110" r="110" fill="#021B4E" stroke="#EA580C" stroke-width="6" filter="url(#glow)" />
    <circle cx="110" cy="110" r="92" fill="#FFFFFF" />
    <circle cx="110" cy="110" r="86" fill="#021B4E" />
    <text x="110" y="100" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="28" font-weight="900" text-anchor="middle">FUTURE</text>
    <text x="110" y="130" fill="#F97316" font-family="Arial, sans-serif" font-size="24" font-weight="900" text-anchor="middle">GATES</text>
    <text x="110" y="152" fill="#93C5FD" font-family="Arial, sans-serif" font-size="11" font-weight="bold" text-anchor="middle">IT CENTER</text>
  </g>
</svg>
`;

async function generate() {
  const outputPath = path.join(process.cwd(), 'public', 'og-image.png');
  await sharp(Buffer.from(ogSvg))
    .png({ quality: 95 })
    .toFile(outputPath);
  console.log('Successfully generated 1200x630 OG image at:', outputPath);
}

generate().catch(console.error);
