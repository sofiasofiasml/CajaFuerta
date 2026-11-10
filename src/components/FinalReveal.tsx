import { useState } from 'react';
import { secretConfig } from '../config/secretConfig';
import type { PlaySound } from '../types/game';
import { Sparkles } from './Sparkles';

/** Tarjeta final del Día 23: el regalo ES la contraseña del Día 24. */
export function FinalReveal({ play }: { play: PlaySound }) {
  const f = secretConfig.final;
  const { keyReveal, day24 } = secretConfig;
  const [shown, setShown] = useState(false);

  const reveal = () => {
    play('fanfare');
    setShown(true);
  };

  return (
    <section className="screen final">
      <article className="card">
        <div className="card__crest" aria-hidden="true">✦</div>
        <h2 className="card__heading">{f.heading}</h2>
        <div className="card__text">
          {f.message.split(/\n\s*\n/).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <hr className="card__rule" />

        <div className="gift">
          {!shown ? (
            <>
              <div className="gift__box" aria-hidden="true">?</div>
              <button className="btn" onClick={reveal}>{keyReveal.button}</button>
            </>
          ) : (
            <div className="gift__content fade-up">
              <Sparkles count={40} />
              <p className="gift__label">{keyReveal.label}</p>
              <p className="keybox__key">{day24.key}</p>
              <p className="gift__desc">{keyReveal.text}</p>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
