import { useState, type CSSProperties, type FormEvent } from 'react';
import { secretConfig } from '../config/secretConfig';
import { useSound } from '../hooks/useSound';
import { TrophyIcon } from './Icons';
import { Candles } from './Candles';
import { Confetti } from './Confetti';

const FLAG = `${secretConfig.storageKey}-day24`;
const norm = (s: string) => s.toUpperCase().replace(/[\s\-_.]/g, '');
/** **negrita** sencilla dentro de un párrafo. */
const rich = (t: string) => t.split(/\*\*(.+?)\*\*/g).map((x, i) => (i % 2 ? <strong key={i}>{x}</strong> : x));
/** Aparición escalonada: el orden `i` marca el retraso. */
const rv = (i: number) => ({ className: 'rv', style: { '--i': i } as CSSProperties });

/** Día 24 · página independiente (/dia24): contraseña del Día 23 → gran final. */
export function GrandFinale() {
  const d = secretConfig.day24;
  const play = useSound(true);
  const [open, setOpen] = useState(() => {
    try { return localStorage.getItem(FLAG) === '1'; } catch { return false; }
  });
  const [draft, setDraft] = useState('');
  const [bad, setBad] = useState(false);
  const [burst, setBurst] = useState(1);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (norm(draft) === norm(d.key)) {
      play('fanfare');
      try { localStorage.setItem(FLAG, '1'); } catch { /* sin persistencia */ }
      setOpen(true);
    } else {
      play('error');
      setBad(false);
      requestAnimationFrame(() => setBad(true));
    }
  };

  return (
    <div className="app finale">
      <div className="grain" aria-hidden="true" />
      <Candles />
      <main>
        {!open ? (
          <section className="screen gate">
            <p className="classified">{d.gateKicker}</p>
            <h1 className="title">{d.gateTitle}</h1>
            <p className="intro">{d.gateText}</p>
            <form className={`gate__form ${bad ? 'is-shake' : ''}`} onSubmit={submit}>
              <input
                className="gate__input"
                value={draft}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                placeholder="· · · · ·"
                aria-label="Contraseña del día 23"
                onChange={(e) => { setDraft(e.target.value.toUpperCase()); setBad(false); }}
              />
              <button className="btn" type="submit" disabled={!draft.trim()}>ABRIR EL GRAN FINAL</button>
            </form>
            <p className="lock__msg" role="status">{bad && d.gateError}</p>
          </section>
        ) : (
          <section className="screen winner">
            <Confetti burst={burst} />
            <div className="rays" aria-hidden="true" />
            <div className="owl-lane" aria-hidden="true"><span className="owl">🦉</span></div>

            <p {...rv(0)} className="rv classified">{d.winnerKicker}</p>
            <div {...rv(1)} className="rv trophy" aria-hidden="true"><TrophyIcon /></div>
            <h1 {...rv(2)} className="rv winner__name">{d.winnerTitle}</h1>
            <h2 {...rv(3)} className="rv title winner__sub">{d.winnerSubtitle}</h2>
            <div {...rv(3)} className="rv orn" aria-hidden="true"><i /><b>✦</b><i /></div>
            <p {...rv(4)} className="rv winner__points">{d.points}</p>
            <p {...rv(5)} className="rv birthday">{d.birthdayTitle}</p>

            <article {...rv(7)} className="rv letter">
              <span className="letter__seal" aria-hidden="true">H</span>
              <p className="letter__greeting">{d.letter.greeting}</p>
              {d.letter.body.split(/\n\s*\n/).map((p, i) => <p key={i}>{rich(p)}</p>)}
              <p className="letter__sign">{d.letter.signature}</p>
            </article>

            <div {...rv(9)} className="rv medals">
              {d.medals.map((m) => (
                <div key={m.title} className="medal">
                  <span className="medal__ribbon" aria-hidden="true" />
                  <span className="medal__disc"><span>{m.icon}</span></span>
                  <p className="medal__title">{m.title}</p>
                  <p className="medal__sub">{m.subtitle}</p>
                </div>
              ))}
            </div>

            {d.video && (
              <video {...rv(10)} className="rv winner__video" src={d.video} controls playsInline preload="auto" />
            )}

            <p {...rv(11)} className="rv birthday birthday--end">{d.closing}</p>
            <button {...rv(12)} className="rv btn" onClick={() => setBurst((b) => b + 1)}>¡MÁS CONFETI!</button>
          </section>
        )}
      </main>
    </div>
  );
}
