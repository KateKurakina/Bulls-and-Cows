export const createDigitValidator = (base: number): ((digit: string) => boolean) => {
  const digits = Array.from({ length: base }, (_, index) => index);

  return (digit) => {
    const parsedDigit = parseInt(digit, base);
    return (
      digit.length === 1 &&
      Number.isInteger(parsedDigit) &&
      parsedDigit.toString(base).toUpperCase() === digit.toUpperCase() &&
      digits.includes(parsedDigit)
    );
  };
};
