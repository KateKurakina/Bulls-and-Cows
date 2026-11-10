import { describe, it, expect } from 'vitest';
import { generateSecret } from '../src/logic/generateSecret';

describe('generateSecret', () => {
  it('should generate a secret with the requested length', () => {
    const secret = generateSecret(4, 10, () => 0);
    expect(secret).toHaveLength(4);
  });

  it('should generate a secret with unique digits', () => {
    const secret = generateSecret(4, 10, () => 0);
    expect(new Set(secret).size).toBe(4);
  });

  it('should generate only binary digits in base 2', () => {
    const secret = generateSecret(2, 2, () => 0);

    expect(secret).toMatch(/^[01]+$/);
    expect(new Set(secret).size).toBe(2);
  });

  it('should allow zero as the first digit', () => {
    const secret = generateSecret(4, 10, () => 0);
    expect(secret[0]).toBe('0');
  });

  it('should return the same result for the same random source', () => {
    const random = () => 0.5;
    const firstSecret = generateSecret(4, 10, random);
    const secondSecret = generateSecret(4, 10, random);
    expect(firstSecret).toBe(secondSecret);
  });

  it('should generate a secret with the requested base', () => {
    const secret = generateSecret(4, 16, () => 0);
    expect(secret).toMatch(/^[0-9A-F]+$/);
  });

  it('should throw an error if length is greater than base', () => {
    expect(() => generateSecret(3, 2, () => 0)).toThrowError('Length cannot be greater than base');
  });
});
