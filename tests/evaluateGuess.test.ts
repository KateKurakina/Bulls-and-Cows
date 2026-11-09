import { describe, it, expect } from 'vitest';
import { evaluateGuess } from '../src/logic/evaluateGuess';

describe('evaluateGuess', () => {
  it('should return 0 bulls and 0 cows for completely incorrect guess', () => {
    const secret = '1234';
    const guess = '5678';
    const result = evaluateGuess(secret, guess);
    expect(result).toEqual({ bulls: 0, cows: 0 });
  });

  it('should return correct bulls and cows for partially correct guess', () => {
    const secret = '1234';
    const guess = '1243';
    const result = evaluateGuess(secret, guess);
    expect(result).toEqual({ bulls: 2, cows: 2 });
  });

  it('should return correct bulls and cows for all correct guess', () => {
    const secret = '1234';
    const guess = '1234';
    const result = evaluateGuess(secret, guess);
    expect(result).toEqual({ bulls: 4, cows: 0 });
  });

  it('should return 0 bulls and 4 cows when all digits are in wrong positions', () => {
    const secret = '1234';
    const guess = '4321';
    const result = evaluateGuess(secret, guess);
    expect(result).toEqual({ bulls: 0, cows: 4 });
  });

  it('should return 1 bull and 0 cows for one correct digit', () => {
    const secret = '1234';
    const guess = '1567';
    const result = evaluateGuess(secret, guess);
    expect(result).toEqual({ bulls: 1, cows: 0 });
  });
});
