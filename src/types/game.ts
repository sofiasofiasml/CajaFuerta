export type Phase = 'welcome' | 'archive' | 'envelope' | 'final';

export interface ClueConfig {
  /** Día del calendario donde está escondido el carácter. */
  day: number;
  /** Carácter (número o letra) escondido en el regalo de ese día. */
  char: string;
}

export interface SecretConfig {
  storageKey: string;
  recipient: string;
  /** Orden fijo: el jugador debe introducirlos en este orden. */
  clues: ClueConfig[];
  welcome: {
    classified: string;
    title: string;
    subtitle: string;
    quote: string;
    intro: string;
    button: string;
  };
  envelope: { message: string; button: string };
  /** Texto que acompaña a la clave del Día 24 al final del Día 23. */
  keyReveal: { button: string; label: string; text: string };
  /** Narrativa del Día 23: cuatro pruebas + cámara de Gringotts. */
  story: {
    archiveIntro: string;
    vaultHint: string;
    vaultLocked: string;
    vaultUnlocking: string;
    vaultOpen: string;
    /** Una por pista, en orden. */
    trials: { place: string; intro: string; done: string }[];
  };
  day24: Day24Config;
  final: {
    heading: string;
    message: string;
  };
}

export interface Day24Config {
  /** ⚠️ Clave que Irina descubre al final del Día 23 y teclea en el último QR (Día 24). */
  key: string;
  gateTitle: string;
  gateKicker: string;
  gateText: string;
  gateError: string;
  winnerKicker: string;
  points: string;
  birthdayTitle: string;
  /** Carta de la lechuza (estilo Hogwarts). Párrafos separados por línea en blanco. */
  letter: { greeting: string; body: string; signature: string };
  /** Medallas que se muestran en la pantalla final. */
  medals: { icon: string; title: string; subtitle: string }[];
  winnerTitle: string;
  winnerSubtitle: string;
  message: string;
  /** Opcional: vídeo (p. ej. '/ganadora.mp4' en /public). Vacío = animación de trofeo. */
  video: string;
  /** Frase de cierre grande al final de la página. */
  closing: string;
}

export interface GameState {
  phase: Phase;
  /** Carácter recuperado por pista ('' = pendiente). */
  clues: string[];
  sound: boolean;
}

export type SoundName = 'click' | 'success' | 'error' | 'unlock' | 'open' | 'fanfare';
export type PlaySound = (name: SoundName) => void;

/** Props comunes de los minijuegos que entregan una pista. */
export interface GameProps {
  file: number;
  onWin: () => void;
  onClose: () => void;
  play: PlaySound;
}
