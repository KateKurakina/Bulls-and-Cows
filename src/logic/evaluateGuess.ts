export const evaluateGuess = (secret: string, guess: string): { bulls: number; cows: number } => {
  const secretArray = Array.from(secret);
  const guessArray = Array.from(guess);

  const bulls = secretArray.reduce((count, secretDigit, index) => {
    return secretDigit === guessArray[index] ? count + 1 : count;
  }, 0);

  const cows = secretArray.filter((secretDigit, index) => {
    return guessArray.includes(secretDigit) && secretDigit !== guessArray[index];
  }).length;

  return { bulls, cows };
};
