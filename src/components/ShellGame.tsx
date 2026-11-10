import { useEffect, useRef, useState } from 'react';
import type { GameProps } from '../types/game';
import { GameShell } from './GameShell';

const ROUNDS = 3;
const SWAP_MS = 520;

/** Sigue la snitch dorado bajo las copas. */
export function ShellGame({ file, onWin, onClose, play }: GameProps) {
  const [round, setRound] = useState(0);
  const [ball, setBall] = useState(() => Math.floor(Math.random() * 3));
  const [slot, setSlot] = useState([0, 1, 2]); // posición (0-2) de cada copa
  const [lifted, setLifted] = useState<number | null>(ball);
  const [phase, setPhase] = useState<'show' | 'shuffle' | 'pick' | 'result'>('show');
  const [msg, setMsg] = useState('Memoriza dónde está la snitch…');
  const timers = useRef<number[]>([]);
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const begin = (r: number) => {
    const b = Math.floor(Math.random() * 3);
    setBall(b);
    setLifted(b);
    setPhase('show');
    setMsg('Memoriza dónde está la snitch…');
    later(() => {
      setLifted(null);
      setPhase('shuffle');
      setMsg('Sigue la copa…');
      const swaps = 5 + r * 3;
      for (let i = 0; i < swaps; i++) {
        later(() => {
          play('click');
          setSlot((s) => {
            const a = Math.floor(Math.random() * 3);
            const c = (a + 1 + Math.floor(Math.random() * 2)) % 3;
            const next = [...s];
            const ia = s.indexOf(a), ic = s.indexOf(c);
            [next[ia], next[ic]] = [next[ic], next[ia]];
            return next;
          });
        }, 500 + i * SWAP_MS);
      }
      later(() => { setPhase('pick'); setMsg('¿Dónde está la snitch?'); }, 500 + swaps * SWAP_MS + 200);
    }, 1400);
  };

  useEffect(() => { begin(0); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pick = (cup: number) => {
    if (phase !== 'pick') return;
    setPhase('result');
    setLifted(ball);
    if (cup === ball) {
      play('success');
      if (round + 1 === ROUNDS) {
        setMsg('¡Atrapaste la snitch!');
        later(onWin, 1000);
      } else {
        setMsg('¡Correcto! Otra ronda…');
        later(() => { setRound(round + 1); begin(round + 1); }, 1200);
      }
    } else {
      play('error');
      setMsg('Ahí no estaba. Otra vez…');
      later(() => { setRound(0); begin(0); }, 1400);
    }
  };

  return (
    <GameShell file={file} title="¿Dónde está la snitch?" hint={`Ronda ${round + 1}/${ROUNDS}`} onClose={onClose}>
      <div className="shells">
        {[0, 1, 2].map((cup) => (
          <button
            key={cup}
            className={`shell ${lifted === cup ? 'is-lifted' : ''}`}
            style={{ left: `${slot[cup] * 33.333}%` }}
            onClick={() => pick(cup)}
            aria-label={`Copa ${cup + 1}`}
          >
            {cup === ball && <span className="shell__ball" />}
            <span className="shell__cap" />
          </button>
        ))}
      </div>
      <p className="game__moves" role="status">{msg}</p>
    </GameShell>
  );
}
