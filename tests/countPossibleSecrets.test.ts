import { describe, it, expect } from 'vitest';
import { countPossibleSecrets } from '../src/logic/countPossibleSecrets';

describe('countPossibleSecrets', () => {
  it('should count possible secrets for base 8 and length 4', () => {
    expect(countPossibleSecrets(4, 8)).toBe(1680);
  });

  it('should count possible secrets for base 10 and length 4', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
  });

  it('should return base when length is 1', () => {
    expect(countPossibleSecrets(1, 8)).toBe(8);
  });

  it('should return 1 when length equals base', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });

  it('should return 0 when length is greater than base', () => {
    expect(countPossibleSecrets(3, 2)).toBe(0);
  });
});
