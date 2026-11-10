import { useCallback, useRef } from 'react';
import type { PlaySound, SoundName } from '../types/game';

type Note = [freq: number, start: number, dur: number, type?: OscillatorType, vol?: number];

// Sonidos sintetizados con WebAudio: sin archivos externos.
const SOUNDS: Record<SoundName, Note[]> = {
  click: [[620, 0, 0.06, 'triangle', 0.08]],
  success: [[660, 0, 0.18, 'sine', 0.14], [880, 0.1, 0.18, 'sine', 0.14], [1320, 0.2, 0.4, 'sine', 0.12]],
  error: [[150, 0, 0.25, 'sawtooth', 0.09], [120, 0.12, 0.3, 'sawtooth', 0.09]],
  unlock: [
    [90, 0, 0.12, 'square', 0.1], [110, 0.35, 0.1, 'square', 0.1], [130, 0.7, 0.1, 'square', 0.1],
    [80, 1.4, 0.35, 'square', 0.16], [523, 1.8, 0.5, 'sine', 0.12], [784, 1.95, 0.7, 'sine', 0.12],
  ],
  open: [[300, 0, 0.5, 'sine', 0.06], [500, 0.3, 0.6, 'sine', 0.06], [900, 0.9, 0.8, 'sine', 0.07]],
  fanfare: [
    [523, 0, 0.25, 'triangle', 0.14], [659, 0.15, 0.25, 'triangle', 0.14], [784, 0.3, 0.25, 'triangle', 0.14],
    [1047, 0.45, 0.9, 'triangle', 0.16], [1319, 0.6, 1, 'sine', 0.1],
  ],
};

export function useSound(enabled: boolean): PlaySound {
  const ctxRef = useRef<AudioContext | null>(null);

  return useCallback(
    (name) => {
      if (!enabled) return;
      try {
        const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = (ctxRef.current ??= new AC());
        if (ctx.state === 'suspended') void ctx.resume();
        for (const [freq, start, dur, type = 'sine', vol = 0.1] of SOUNDS[name]) {
          const t = ctx.currentTime + start;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = type;
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.0001, t);
          gain.gain.exponentialRampToValueAtTime(vol, t + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
          osc.connect(gain).connect(ctx.destination);
          osc.start(t);
          osc.stop(t + dur + 0.05);
        }
      } catch {
        /* audio no disponible */
      }
    },
    [enabled],
  );
}
