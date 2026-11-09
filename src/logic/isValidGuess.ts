export const isValidGuess = (guess: string, length: number, base: number): boolean => {
  const digits = Array.from({ length: base }, (_, index) => index);
  const guessArray = Array.from(guess);

  const includeDigit = guessArray.every((guessDigit) => digits.includes(+guessDigit));

  if (!includeDigit) return false;

  if (new Set(guess).size !== length || guessArray.length !== length) return false;

  return true;
};
