import { createDigitValidator } from '../logic/createDigitValidator.js';

export const filterInput = (value: string, base: number): string => {
  const valueArray = Array.from(value);
  const isValidDigit = createDigitValidator(base);

  return valueArray.filter(isValidDigit).join('').toUpperCase();
};
