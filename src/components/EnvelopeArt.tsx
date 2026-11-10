import type { ReactNode } from 'react';

export type EnvelopeState = 'closed' | 'opening';

/** Sobre dorado en CSS puro. `opening` anima: sello roto → solapa → tarjeta. */
export function EnvelopeArt({ state, children }: { state: EnvelopeState; children?: ReactNode }) {
  return (
    <div className={`env-stage env-stage--${state}`}>
      <div className={`env env--${state}`}>
        <div className="env__glow" />
        <div className="env__back" />
        <div className="env__card">{children}</div>
        <div className="env__front" />
        <div className="env__flap" />
        <div className="env__seal" aria-hidden="true">
          <span className="seal__half seal__half--l"><i>G</i></span>
          <span className="seal__half seal__half--r"><i>G</i></span>
        </div>
      </div>
    </div>
  );
}
