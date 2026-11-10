import { generateSecret } from '../logic/generateSecret.js';

export interface GameAttempt {
  guess: string;
  bulls: number;
  cows: number;
}

export interface GameState {
  secret: string | null;
  base: number;
  length: number;
  attempts: GameAttempt[];
  isGameOver: boolean;
  startTime: number | null;
}

export const initialGameState: GameState = {
  secret: null,
  base: 10,
  length: 4,
  attempts: [],
  isGameOver: false,
  startTime: null,
};

export const createGameState = (base: number, length: number): GameState => {
  return {
    secret: generateSecret(length, base),
    base,
    length,
    attempts: [],
    isGameOver: false,
    startTime: Date.now(),
  };
};
