import { FinalReveal } from './components/FinalReveal';
import { GoldenEnvelope } from './components/GoldenEnvelope';
import { SecretArchive } from './components/SecretArchive';
import { WelcomeScreen } from './components/WelcomeScreen';
import { useGameProgress } from './hooks/useGameProgress';
import { useSound } from './hooks/useSound';

export default function App() {
  const g = useGameProgress();
  const play = useSound(g.state.sound);
  const { phase, clues, sound } = g.state;

  const reset = () => {
    if (window.confirm('¿Reiniciar toda la misión desde cero?')) g.reset();
  };

  return (
    <div className="app">
      <div className="grain" aria-hidden="true" />
      <header className="topbar">
        <span className="topbar__brand">Nº 23</span>
        <button className="chip" onClick={g.toggleSound} aria-pressed={sound}>
          ♪ SONIDO {sound ? 'ON' : 'OFF'}
        </button>
      </header>

      <main>
        {phase === 'welcome' && <WelcomeScreen onStart={g.start} play={play} />}
        {phase === 'archive' && (
          <SecretArchive
            clues={clues}
            found={g.found}
            total={g.total}
            nextIndex={g.nextIndex}
            submitClue={g.submitClue}
            checkCode={g.checkCode}
            onUnlocked={g.goEnvelope}
            play={play}
          />
        )}
        {phase === 'envelope' && <GoldenEnvelope onContinue={g.goFinal} play={play} />}
        {phase === 'final' && <FinalReveal play={play} />}
      </main>

      <footer className="foot">
        <button className="link" onClick={reset}>reiniciar misión</button>
      </footer>
    </div>
  );
}
