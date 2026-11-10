import { useMemo, type CSSProperties } from 'react';

/** Velas flotantes del Gran Salón (CSS puro), como fondo. */
export function Candles({ count = 12 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        '--x': `${i % 2 ? 84 + Math.random() * 12 : 2 + Math.random() * 12}%`, // solo en los bordes: no tapan el texto
        '--y': `${4 + Math.random() * 78}vh`,
        '--d': `${-Math.random() * 6}s`,
        '--t': `${4 + Math.random() * 3}s`,
        '--s': `${0.7 + Math.random() * 0.6}`,
      }) as CSSProperties),
    [count],
  );
  return (
    <div className="candles" aria-hidden="true">
      {items.map((style, i) => (
        <span key={i} className="candle" style={style}>
          <i className="candle__flame" />
          <i className="candle__wax" />
        </span>
      ))}
    </div>
  );
}
