import { getTopScores, type LeaderboardEntry } from '../logic/leaderboard.js';

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

const getStorageKey = (base: number, length: number): string => {
  return `bulls-and-cows-leaderboard-${base}-${length}`;
};

export const loadLeaderboard = (
  base: number,
  length: number,
  storage: StorageLike = localStorage,
): LeaderboardEntry[] => {
  const savedScores = storage.getItem(getStorageKey(base, length));

  if (savedScores === null) {
    return [];
  }

  try {
    const scores: unknown = JSON.parse(savedScores);

    return Array.isArray(scores) ? (scores as LeaderboardEntry[]) : [];
  } catch {
    return [];
  }
};

export const saveLeaderboardEntry = (entry: LeaderboardEntry, storage: StorageLike = localStorage): void => {
  const scores = loadLeaderboard(entry.base, entry.length, storage);
  const updatedScores = [...scores, entry];
  const topScores = getTopScores(updatedScores);

  storage.setItem(getStorageKey(entry.base, entry.length), JSON.stringify(topScores));
};
