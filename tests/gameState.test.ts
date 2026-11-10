import { describe, it, expect } from 'vitest';
import { createGameState } from '../src/state/gameState';

describe('createGameState', () => {
  it('should generate a secret with the requested length', () => {
    const state = createGameState(8, 4);

    expect(state.secret).not.toBeNull();
    expect(state.secret).toHaveLength(4);
  });

  it('should return the passed length', () => {
    expect(createGameState(8, 4).length).toBe(4);
  });

  it('should return the passed base', () => {
    expect(createGameState(8, 4).base).toBe(8);
  });

  it('should return empty history of attempts', () => {
    expect(createGameState(8, 4).attempts).toEqual([]);
  });

  it('should return that the game is not over', () => {
    expect(createGameState(8, 4).isGameOver).toBe(false);
  });

  it('should return that the game start time has been set', () => {
    const beforeCreation = Date.now();
    const state = createGameState(8, 4);
    const afterCreation = Date.now();

    expect(state.startTime).toBeGreaterThanOrEqual(beforeCreation);
    expect(state.startTime).toBeLessThanOrEqual(afterCreation);
  });

  it('should create a new state with independent attempts', () => {
    const firstGame = createGameState(8, 4);
    const secondGame = createGameState(8, 4);

    expect(firstGame.attempts).not.toBe(secondGame.attempts);
  });
});
