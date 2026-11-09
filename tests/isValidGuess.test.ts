import { describe, it, expect } from 'vitest';
import { isValidGuess } from '../src/logic/isValidGuess';

describe('isValidGuess', () => {
  it('should return true when length and base are correct', () => {
    const secret = isValidGuess('4567', 4, 8);
    expect(secret).toBe(true);
  });

  it('should return false when length is incorrect', () => {
    const secret = isValidGuess('456', 4, 8);
    expect(secret).toBe(false);
  });

  it('should return false when a digit is not allowed in the base', () => {
    const secret = isValidGuess('1892', 4, 8);
    expect(secret).toBe(false);
  });

  it('should return false when length and base are incorrect', () => {
    const secret = isValidGuess('189', 4, 8);
    expect(secret).toBe(false);
  });

  it('should return false when guess contains duplicate digits', () => {
    expect(isValidGuess('4566', 4, 8)).toBe(false);
  });

  it('should return true when guess starts with zero', () => {
    expect(isValidGuess('0456', 4, 8)).toBe(true);
  });
});
