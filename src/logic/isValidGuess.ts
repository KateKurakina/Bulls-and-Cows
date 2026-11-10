import { createDigitValidator } from '../logic/createDigitValidator.js';

export const isValidGuess = (guess: string, length: number, base: number): boolean => {
  const guessArray = Array.from(guess);

  const isValidDigit = createDigitValidator(base);
  const includeDigit = guessArray.every(isValidDigit);

  if (!includeDigit) return false;

  if (new Set(guess).size !== length || guessArray.length !== length) return false;

  return true;
};
