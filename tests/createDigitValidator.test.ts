import { describe, it, expect } from 'vitest';
import { createDigitValidator } from '../src/logic/createDigitValidator';

describe('createDigitValidator', () => {
  it('should accept binary digits', () => {
    const isValidDigit = createDigitValidator(2);

    expect(isValidDigit('0')).toBe(true);
    expect(isValidDigit('1')).toBe(true);
  });

  it('should reject digits outside the binary base', () => {
    const isValidDigit = createDigitValidator(2);

    expect(isValidDigit('2')).toBe(false);
  });

  it('should accept octal digits', () => {
    const isValidDigit = createDigitValidator(8);

    expect(isValidDigit('7')).toBe(true);
  });

  it('should reject digits outside the octal base', () => {
    const isValidDigit = createDigitValidator(8);

    expect(isValidDigit('8')).toBe(false);
  });

  it('should accept hexadecimal letters', () => {
    const isValidDigit = createDigitValidator(16);

    expect(isValidDigit('A')).toBe(true);
    expect(isValidDigit('f')).toBe(true);
  });

  it('should reject invalid hexadecimal characters', () => {
    const isValidDigit = createDigitValidator(16);

    expect(isValidDigit('G')).toBe(false);
  });

  it('should reject an empty string', () => {
    expect(createDigitValidator(10)('')).toBe(false);
  });

  it('should reject a string with multiple characters', () => {
    expect(createDigitValidator(10)('12')).toBe(false);
  });

  it('should accept lowercase hexadecimal digits', () => {
    expect(createDigitValidator(16)('a')).toBe(true);
  });
});
