export const generateSecret = (length: number, base: number, random: () => number = Math.random): string => {
  if (length > base) {
    throw new Error('Length cannot be greater than base');
  }

  let secret = '';
  let digits = Array.from({ length: base }, (_, index) => index);

  while (secret.length < length) {
    const randomInt = Math.floor(random() * digits.length);
    const selectedDigit = digits[randomInt];

    secret += selectedDigit.toString(base).toUpperCase();
    digits = digits.filter((digit) => digit !== selectedDigit);
  }

  return secret;
};
