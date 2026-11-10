import { useEffect, useRef, useState } from 'react';
import type { GameProps } from '../types/game';
import { GameShell } from './GameShell';

const WIDTHS = [0.4, 0.35, 0.3]; // zona dorada ancha, algo más estrecha cada vez
const newCenter = (w: number) => w / 2 + 0.05 + Math.random() * (0.9 - w);

/** Para la aguja dentro de la zona dorada 3 veces. */
export function TimingGame({ file, onWin, onClose, play }: GameProps) {
  const [hits, setHits] = useState(0);
  const [center, setCenter] = useState(() => newCenter(WIDTHS[0]));
  const [pos, setPos] = useState(0);
  const [msg, setMsg] = useState('');
  const [won, setWon] = useState(false);
  const state = useRef({ x: 0, dir: 1, speed: 0.45 });
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  useEffect(() => {
    if (won) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const s = state.current;
      s.x += s.dir * s.speed * ((now - last) / 1000);
      last = now;
      if (s.x >= 1) { s.x = 1; s.dir = -1; }
      if (s.x <= 0) { s.x = 0; s.dir = 1; }
      setPos(s.x);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [won]);

  const stop = () => {
    if (won) return;
    const w = WIDTHS[hits];
    if (Math.abs(state.current.x - center) <= w / 2) {
      const n = hits + 1;
      play('success');
      setHits(n);
      if (n === WIDTHS.length) {
        setWon(true);
        setMsg('¡Snitch atrapada!');
        timer.current = window.setTimeout(onWin, 900);
      } else {
        setMsg('¡Bien! Más difícil…');
        setCenter(newCenter(WIDTHS[n]));
        state.current.speed += 0.08;
      }
    } else {
      play('error');
      setMsg('Se escapó. ¡Inténtalo otra vez!'); // sin perder aciertos
    }
  };

  const w = WIDTHS[Math.min(hits, WIDTHS.length - 1)];
  return (
    <GameShell file={file} title="Atrapa la snitch dorada" hint={`Aciertos: ${hits}/${WIDTHS.length} · toca cuando la snitch esté en la zona dorada`} onClose={onClose}>
      <div className="timing" onPointerDown={stop}>
        <div className="timing__zone" style={{ left: `${(center - w / 2) * 100}%`, width: `${w * 100}%` }} />
        <div className="timing__needle" style={{ left: `${pos * 100}%` }}><i /></div>
      </div>
      <p className="game__moves" role="status">{msg || ' '}</p>
      <button className="btn" onClick={stop} disabled={won}>¡ATRAPAR!</button>
    </GameShell>
  );
}
