import type { LeaderboardEntry } from '../logic/leaderboard.js';

interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const loadLeaderboard = (
  base: number,
  length: number,
  storage: StorageLike = localStorage,
): LeaderboardEntry[] => {
  void base;
  void length;
  void storage;

  return [];
};

export const saveLeaderboardEntry = (entry: LeaderboardEntry, storage: StorageLike = localStorage): void => {
  void entry;
  void storage;
};
