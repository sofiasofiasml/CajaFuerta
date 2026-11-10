import { useMemo, type CSSProperties } from 'react';

/** Explosión de partículas doradas desde el centro del contenedor (position: relative). */
export function Sparkles({ count = 36, delay = 0 }: { count?: number; delay?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 90 + Math.random() * 190;
        return {
          '--dx': `${Math.cos(angle) * dist}px`,
          '--dy': `${Math.sin(angle) * dist - 40}px`,
          '--s': `${3 + Math.random() * 6}px`,
          '--d': `${delay + Math.random() * 0.5}s`,
          '--t': `${1.4 + Math.random() * 1.2}s`,
        } as CSSProperties;
      }),
    [count, delay],
  );
  return (
    <div className="sparkles" aria-hidden="true">
      {items.map((style, i) => (
        <span key={i} style={style} />
      ))}
    </div>
  );
}
