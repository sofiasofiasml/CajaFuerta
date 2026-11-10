import { useEffect, useRef, useState } from 'react';
import type { GameProps } from '../types/game';
import { GameShell } from './GameShell';

const SYMBOLS = ['⚡', '🦉', '🪄', '🧹', '🏰', '🦌', '🐍', '🦁', '🦡', '🦅'];

interface Card { id: number; sym: string }

const deal = (n: number): Card[] =>
  SYMBOLS.slice(0, n)
    .flatMap((sym) => [sym, sym])
    .map((sym) => ({ sym, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(({ sym }, id) => ({ id, sym }));

const PAIRS = 6;

/** Juego de memoria: empareja todos los símbolos para abrir el archivo. */
export function MemoryGame({ file, onWin, onClose, play }: GameProps) {
  const [cards] = useState(() => deal(PAIRS));
  const [open, setOpen] = useState<number[]>([]); // volteadas sin emparejar
  const [done, setDone] = useState<Set<number>>(new Set());
  const [moves, setMoves] = useState(0);
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const flip = (id: number) => {
    if (open.length >= 2 || open.includes(id) || done.has(id)) return;
    play('click');
    const next = [...open, id];
    setOpen(next);
    if (next.length < 2) return;
    setMoves((m) => m + 1);
    const [a, b] = next.map((i) => cards[i]);
    timer.current = window.setTimeout(() => {
      if (a.sym === b.sym) {
        const d = new Set(done).add(a.id).add(b.id);
        setDone(d);
        play('success');
        if (d.size === cards.length) timer.current = window.setTimeout(onWin, 700);
      }
      setOpen([]);
    }, 750);
  };

  return (
    <GameShell
      file={file}
      title="Encuentra las parejas mágicas"
      hint={`Intentos: ${moves} · Parejas: ${done.size / 2}/${PAIRS}`}
      onClose={onClose}
    >
      <div className="game__grid">
        {cards.map((c) => {
          const shown = open.includes(c.id) || done.has(c.id);
          return (
            <button
              key={c.id}
              className={`mcard ${shown ? 'is-up' : ''} ${done.has(c.id) ? 'is-done' : ''}`}
              onClick={() => flip(c.id)}
              aria-label={shown ? c.sym : 'Carta oculta'}
            >
              <span className="mcard__in">
                <span className="mcard__face mcard__face--back">?</span>
                <span className="mcard__face mcard__face--front">{c.sym}</span>
              </span>
            </button>
          );
        })}
      </div>
    </GameShell>
  );
}
