import { useEffect, useRef, useState } from 'react';
import type { GameProps } from '../types/game';
import { GameShell } from './GameShell';

const PADS = ['🦁', '🐍', '🦡', '🦅'];
const LEN = 5;

/** Memoriza y repite la secuencia de luces. */
export function SimonGame({ file, onWin, onClose, play }: GameProps) {
  const [seq, setSeq] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [lit, setLit] = useState(-1);
  const [phase, setPhase] = useState<'idle' | 'show' | 'input' | 'fail' | 'won'>('idle');
  const timers = useRef<number[]>([]);
  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const start = () => {
    const s = Array.from({ length: LEN }, () => Math.floor(Math.random() * PADS.length));
    setSeq(s);
    setStep(0);
    setPhase('show');
    s.forEach((p, i) => {
      later(() => { setLit(p); play('click'); }, 700 + i * 800);
      later(() => setLit(-1), 700 + i * 800 + 500);
    });
    later(() => setPhase('input'), 700 + LEN * 800);
  };

  const press = (p: number) => {
    if (phase !== 'input') return;
    setLit(p);
    play('click');
    later(() => setLit(-1), 250);
    if (p !== seq[step]) {
      play('error');
      setPhase('fail');
      return;
    }
    if (step + 1 === LEN) {
      setPhase('won');
      play('success');
      later(onWin, 800);
    } else setStep(step + 1);
  };

  const msg = {
    idle: 'Pulsa EMPEZAR y memoriza el hechizo.',
    show: 'Observa…',
    input: `Tu turno: ${step}/${LEN}`,
    fail: 'El hechizo falló. Inténtalo de nuevo.',
    won: '¡Hechizo perfecto!',
  }[phase];

  return (
    <GameShell file={file} title="Repite el hechizo" hint={msg} onClose={onClose}>
      <div className="simon">
        {PADS.map((sym, i) => (
          <button key={i} className={`simon__pad simon__pad--${i} ${lit === i ? 'is-lit' : ''}`} onClick={() => press(i)} aria-label={`Panel ${i + 1}`}>
            {sym}
          </button>
        ))}
      </div>
      {(phase === 'idle' || phase === 'fail') && <button className="btn" onClick={start}>EMPEZAR</button>}
    </GameShell>
  );
}
