import type { ReactNode } from 'react';
import { secretConfig } from '../config/secretConfig';

/** Marco común (modal) de los minijuegos. */
export function GameShell({ file, title, hint, onClose, children }: {
  file: number;
  title: string;
  hint: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const trial = secretConfig.story.trials[file - 1];
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={`Prueba del archivo ${file}`}>
      <div className="game">
        <p className="classified">ARCHIVO {String(file).padStart(2, '0')} · {trial?.place.toUpperCase()}</p>
        <h3 className="game__title">{title}</h3>
        {trial && <p className="game__story">{trial.intro}</p>}
        <p className="game__moves">{hint}</p>
        {children}
        <button className="link" onClick={onClose}>volver al expediente</button>
      </div>
    </div>
  );
}
