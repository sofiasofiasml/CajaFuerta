export function LockIcon({ open = false }: { open?: boolean }) {
  return (
    <svg className="icon-lock" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" fill="currentColor" fillOpacity=".15" />
      <path d={open ? 'M8 10.5V7a4 4 0 0 1 7.6-1.7' : 'M8 10.5V7a4 4 0 0 1 8 0v3.5'} />
      <circle cx="12" cy="15.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

/** Copa de campeona en SVG (dorado metálico). */
export function TrophyIcon() {
  return (
    <svg className="trophy-svg" viewBox="0 0 120 130" width="120" height="130" aria-hidden="true">
      <defs>
        <linearGradient id="tg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff1b8" />
          <stop offset=".45" stopColor="#c9a44c" />
          <stop offset="1" stopColor="#7a5a1c" />
        </linearGradient>
        <linearGradient id="tb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a1a20" />
          <stop offset="1" stopColor="#2b0b0e" />
        </linearGradient>
      </defs>
      <path d="M30 18H14c0 22 8 34 26 38M90 18h16c0 22-8 34-26 38" fill="none" stroke="url(#tg)" strokeWidth="7" strokeLinecap="round" />
      <path d="M30 10h60v34c0 20-13 32-30 32S30 64 30 44z" fill="url(#tg)" />
      <path d="M40 16h8v30c0 10 4 18 10 22-12-3-18-12-18-24z" fill="#fff" opacity=".28" />
      <rect x="54" y="74" width="12" height="18" fill="url(#tg)" />
      <path d="M38 92h44l6 10H32z" fill="url(#tg)" />
      <rect x="28" y="102" width="64" height="20" rx="3" fill="url(#tb)" stroke="#c9a44c" strokeWidth="2" />
      <rect x="46" y="108" width="28" height="8" rx="2" fill="url(#tg)" />
      <path d="M60 22l4.5 9.5 10 1.2-7.4 6.9 2 10L60 44.500l-9.100 5.100 2-10-7.400-6.900 10-1.200z" fill="#fff6cf" opacity=".85" />
    </svg>
  );
}
