import { useCallback, useEffect, useState } from 'react';
import { secretConfig as cfg } from '../config/secretConfig';
import type { GameState } from '../types/game';

const norm = (s: string) => s.trim().toUpperCase();
const TOTAL = cfg.clues.length;

const initial = (): GameState => ({ phase: 'welcome', clues: Array(TOTAL).fill(''), sound: true });

function load(): GameState {
  try {
    const raw = JSON.parse(localStorage.getItem(cfg.storageKey) ?? 'null');
    if (!raw || !Array.isArray(raw.clues)) return initial();
    // Descarta pistas que ya no coinciden con la config (p. ej. si cambiaste el código).
    const clues = cfg.clues.map((c, i) => (norm(String(raw.clues[i] ?? '')) === norm(c.char) ? norm(c.char) : ''));
    const complete = clues.every(Boolean);
    let phase = raw.phase;
    if (!['welcome', 'archive', 'envelope', 'final'].includes(phase)) phase = 'welcome';
    if ((phase === 'envelope' || phase === 'final') && !complete) phase = 'archive';
    return { phase, clues, sound: raw.sound !== false };
  } catch {
    return initial();
  }
}

export function useGameProgress() {
  const [state, setState] = useState<GameState>(load);

  useEffect(() => {
    try {
      localStorage.setItem(cfg.storageKey, JSON.stringify(state));
    } catch {
      /* localStorage no disponible: el juego sigue sin persistencia */
    }
  }, [state]);

  const found = state.clues.filter(Boolean).length;
  const nextIndex = state.clues.findIndex((c) => !c); // -1 = todas recuperadas

  const start = useCallback(() => setState((s) => ({ ...s, phase: 'archive' })), []);

  /** Valida la pista `i`: solo la siguiente pendiente (orden 5→13→16→21). */
  const submitClue = (i: number, value: string): boolean => {
    if (i !== nextIndex || norm(value) !== norm(cfg.clues[i].char)) return false;
    setState((s) => ({ ...s, clues: s.clues.map((c, j) => (j === i ? norm(value) : c)) }));
    return true;
  };

  /** Comprueba la combinación final. Solo posible con las 4 pistas recuperadas. */
  const checkCode = (code: string[]): boolean =>
    found === TOTAL && code.length === TOTAL && code.every((c, i) => norm(c) === norm(cfg.clues[i].char));

  const goEnvelope = useCallback(
    () => setState((s) => (s.clues.every(Boolean) ? { ...s, phase: 'envelope' } : s)),
    [],
  );
  const goFinal = useCallback(() => setState((s) => (s.phase === 'envelope' ? { ...s, phase: 'final' } : s)), []);
  const toggleSound = useCallback(() => setState((s) => ({ ...s, sound: !s.sound })), []);
  const reset = useCallback(() => setState((s) => ({ ...initial(), sound: s.sound })), []);

  return { state, found, total: TOTAL, nextIndex, start, submitClue, checkCode, goEnvelope, goFinal, toggleSound, reset };
}
