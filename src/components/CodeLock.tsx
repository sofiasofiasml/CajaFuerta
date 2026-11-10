import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import { secretConfig } from '../config/secretConfig';
import type { PlaySound } from '../types/game';

interface Props {
  total: number;
  enabled: boolean;
  check: (code: string[]) => boolean;
  onUnlocked: () => void;
  play: PlaySound;
}

type Status = 'idle' | 'wrong' | 'unlocking' | 'open';
const clean = (s: string) => s.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

const story = secretConfig.story;

export function CodeLock({ total, enabled, check, onUnlocked, play }: Props) {
  const [chars, setChars] = useState<string[]>(() => Array(total).fill(''));
  const [status, setStatus] = useState<Status>('idle');
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const busy = status === 'unlocking' || status === 'open';
  const full = chars.every(Boolean);

  const setAt = (i: number, v: string) => {
    setChars((c) => c.map((x, j) => (j === i ? v : x)));
    if (status === 'wrong') setStatus('idle');
  };

  const onChange = (i: number, raw: string) => {
    const v = clean(raw).slice(-1);
    setAt(i, v);
    if (v) {
      play('click');
      refs.current[i + 1]?.focus();
    }
  };

  const submit = () => {
    if (!enabled || busy || !full) return;
    if (!check(chars)) {
      play('error');
      setStatus('idle');
      requestAnimationFrame(() => setStatus('wrong')); // reinicia la sacudida
      return;
    }
    play('unlock');
    setStatus('unlocking');
    timers.current.push(
      window.setTimeout(() => setStatus('open'), 1700),
      window.setTimeout(onUnlocked, 3300),
    );
  };

  const onKeyDown = (i: number, e: KeyboardEvent) => {
    if (e.key === 'Backspace' && !chars[i]) refs.current[i - 1]?.focus();
    if (e.key === 'ArrowLeft') refs.current[i - 1]?.focus();
    if (e.key === 'ArrowRight') refs.current[i + 1]?.focus();
    if (e.key === 'Enter') submit();
  };

  const onPaste = (e: ClipboardEvent) => {
    const text = clean(e.clipboardData.getData('text')).slice(0, total);
    if (!text) return;
    e.preventDefault();
    setChars(Array.from({ length: total }, (_, i) => text[i] ?? ''));
    if (status === 'wrong') setStatus('idle');
  };

  return (
    <section className={`lock ${enabled ? '' : 'is-disabled'} lock--${status}`} aria-labelledby="lock-title">
      <h2 id="lock-title" className="lock__title">THE FINAL COMBINATION</h2>
      <p className="lock__hint">
        {enabled ? story.vaultHint : story.vaultLocked}
      </p>

      <div className="safe" aria-hidden="true">
        <div className="safe__inside"><span>✦</span></div>
        <div className="safe__door">
          <div className="safe__dial" />
          <div className="safe__handle" />
        </div>
      </div>

      <div className="wheels" onPaste={onPaste}>
        {chars.map((c, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            className="wheel"
            value={c}
            disabled={!enabled || busy}
            inputMode="text"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            aria-label={`Carácter ${i + 1} de ${total}`}
            onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>

      <p className="lock__msg" role="status">
        {status === 'wrong' && 'Mmm... esta combinación no parece correcta. Revisa tus archivos.'}
        {status === 'unlocking' && story.vaultUnlocking}
        {status === 'open' && story.vaultOpen}
      </p>

      <button className="btn" onClick={submit} disabled={!enabled || !full || busy}>
        UNLOCK THE SECRET
      </button>
    </section>
  );
}
