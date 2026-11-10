import { useState } from 'react';
import { secretConfig } from '../config/secretConfig';
import type { PlaySound } from '../types/game';
import { ClueCard } from './ClueCard';
import { CodeLock } from './CodeLock';
import { MemoryGame } from './MemoryGame';
import { ShellGame } from './ShellGame';
import { SimonGame } from './SimonGame';
import { TimingGame } from './TimingGame';
import { ProgressBar } from './ProgressBar';

interface Props {
  clues: string[];
  found: number;
  total: number;
  nextIndex: number;
  submitClue: (i: number, v: string) => boolean;
  checkCode: (code: string[]) => boolean;
  onUnlocked: () => void;
  play: PlaySound;
}

/** Un juego distinto por archivo, en orden. */
const GAMES = [MemoryGame, SimonGame, TimingGame, ShellGame];

export function SecretArchive({ clues, found, total, nextIndex, submitClue, checkCode, onUnlocked, play }: Props) {
  const [playing, setPlaying] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const Game = playing === null ? null : GAMES[playing];

  return (
    <section className="screen archive">
      <p className="classified">EXPEDIENTE Nº 23 · SOLO PARA BRUJAS Y MAGOS</p>
      <h2 className="title title--sm">Las cuatro pruebas</h2>
      <p className="intro">{secretConfig.story.archiveIntro}</p>
      {note && <p className="story-note" key={note}>✦ {note}</p>}
      <ProgressBar found={found} total={total} />

      <div className="clues">
        {secretConfig.clues.map((c, i) => (
          <ClueCard
            key={c.day}
            index={i}
            day={c.day}
            value={clues[i]}
            active={i === nextIndex}
            onPlay={() => setPlaying(i)}
          />
        ))}
      </div>

      {Game && playing !== null && (
        <Game
          file={playing + 1}
          play={play}
          onClose={() => setPlaying(null)}
          onWin={() => {
            submitClue(playing, secretConfig.clues[playing].char);
            play('unlock');
            setNote(secretConfig.story.trials[playing].done);
            setPlaying(null);
          }}
        />
      )}

      <CodeLock total={total} enabled={found === total} check={checkCode} onUnlocked={onUnlocked} play={play} />
    </section>
  );
}
