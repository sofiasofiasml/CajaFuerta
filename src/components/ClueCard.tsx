import { useEffect, useRef, useState } from 'react';
import { secretConfig } from '../config/secretConfig';
import { LockIcon } from './Icons';

interface Props {
  index: number;
  day: number;
  value: string; // '' = pendiente
  active: boolean; // es la siguiente pista a introducir
  onPlay: () => void;
}

export function ClueCard({ index, day, value, active, onPlay }: Props) {
  const [flash, setFlash] = useState(false);
  const recovered = value !== '';
  const prev = useRef(recovered);

  useEffect(() => {
    if (recovered && !prev.current) setFlash(true);
    prev.current = recovered;
  }, [recovered]);

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(false), 1400);
    return () => window.clearTimeout(t);
  }, [flash]);

  const state = recovered ? 'recovered' : active ? 'active' : 'locked';

  return (
    <article className={`clue clue--${state} ${flash ? 'is-flash' : ''}`}>
      <header className="clue__lid">
        <span className="clue__file">ARCHIVO {String(index + 1).padStart(2, '0')}</span>
        <LockIcon open={recovered} />
      </header>
      <div className="clue__body">
        <p className="clue__place">{secretConfig.story.trials[index]?.place}</p>
        <p className="clue__day">
          DÍA <b>{day}</b>
        </p>

        {recovered ? (
          <>
            <div className="clue__char" aria-label={`Carácter recuperado: ${value}`}>{value}</div>
            <p className="clue__status is-ok">✦ Pista recuperada</p>
          </>
        ) : active ? (
          <>
            <div className="clue__char clue__char--empty">?</div>
            <button className="btn btn--small" onClick={onPlay}>EMPEZAR</button>
            <p className="clue__status">Pendiente · supera la prueba</p>
          </>
        ) : (
          <>
            <div className="clue__char clue__char--empty">?</div>
            <p className="clue__status">Bloqueado · recupera el archivo anterior</p>
          </>
        )}
      </div>
    </article>
  );
}
