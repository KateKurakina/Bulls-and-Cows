import { describe, it, expect } from 'vitest';
import { filterInput } from '../src/ui/input';

describe('filterInput', () => {
  it('should remove digits that are not allowed in the base', () => {
    expect(filterInput('1289', 8)).toBe('12');
  });

  it('should remove whitespaces', () => {
    expect(filterInput(' ', 8)).toBe('');
    expect(filterInput('1 2 3', 8)).toBe('123');
  });

  it('should correct handling of hexadecimal digits A–F', () => {
    expect(filterInput('Af94', 16)).toBe('AF94');
  });

  it('should preserve valid digits', () => {
    expect(filterInput('1234', 8)).toBe('1234');
  });

  it('should return an empty string for empty input', () => {
    expect(filterInput('', 10)).toBe('');
  });
});
