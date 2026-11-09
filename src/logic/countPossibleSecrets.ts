export const countPossibleSecrets = (length: number, base: number): number => {
  const memo = new Map<string, number>();

  const count = (remainingLength: number, remainingBase: number): number => {
    if (remainingLength > remainingBase) return 0;
    if (remainingLength === 0) return 1;

    const key = `${remainingLength}-${remainingBase}`;

    if (memo.has(key)) {
      return memo.get(key)!;
    }

    const result = remainingBase * count(remainingLength - 1, remainingBase - 1);

    memo.set(key, result);

    return result;
  };

  return count(length, base);
};
