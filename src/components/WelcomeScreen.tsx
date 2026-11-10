import { useEffect, useRef, useState } from 'react';
import { secretConfig } from '../config/secretConfig';
import type { PlaySound } from '../types/game';
import { EnvelopeArt } from './EnvelopeArt';

export function WelcomeScreen({ onStart, play }: { onStart: () => void; play: PlaySound }) {
  const w = secretConfig.welcome;
  const [leaving, setLeaving] = useState(false);
  const timer = useRef<number>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const begin = () => {
    if (leaving) return;
    play('open');
    setLeaving(true);
    timer.current = window.setTimeout(onStart, 1200);
  };

  return (
    <section className={`screen welcome ${leaving ? 'is-leaving' : ''}`}>
      <p className="classified">{w.classified}</p>
      <h1 className="title">{w.title}</h1>
      <p className="subtitle">{w.subtitle}</p>
      <EnvelopeArt state="closed" />
      <blockquote className="quote">“{w.quote}”</blockquote>
      <p className="intro">{w.intro}</p>
      <button className="btn" onClick={begin} disabled={leaving}>
        {w.button}
      </button>
    </section>
  );
}
