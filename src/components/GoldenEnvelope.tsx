import { useEffect, useRef, useState } from 'react';
import { secretConfig } from '../config/secretConfig';
import type { PlaySound } from '../types/game';
import { EnvelopeArt } from './EnvelopeArt';
import { Sparkles } from './Sparkles';

export function GoldenEnvelope({ onContinue, play }: { onContinue: () => void; play: PlaySound }) {
  const { envelope } = secretConfig;
  const [stage, setStage] = useState<'closed' | 'opening' | 'opened'>('closed');
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const open = () => {
    if (stage !== 'closed') return;
    play('open');
    setStage('opening');
    timers.current.push(
      window.setTimeout(() => play('fanfare'), 1900),
      window.setTimeout(() => setStage('opened'), 4200),
    );
  };

  return (
    <section className={`screen envelope-screen is-${stage}`}>
      <p className="classified">CLASSIFIED · Nº 23</p>
      <div className="env-wrap">
        <EnvelopeArt state={stage === 'closed' ? 'closed' : 'opening'}>
          <div className="mini-card">
            <span>✦</span>
            <p>{secretConfig.recipient.toUpperCase()}</p>
            <small>Nº 23</small>
          </div>
        </EnvelopeArt>
        {stage !== 'closed' && <Sparkles count={44} delay={1.8} />}
      </div>

      {stage === 'closed' && (
        <>
          <p className="quote">{envelope.message}</p>
          <button className="btn" onClick={open}>{envelope.button}</button>
        </>
      )}
      {stage === 'opened' && (
        <button className="btn fade-up" onClick={onContinue}>LEER MI TARJETA</button>
      )}
    </section>
  );
}
