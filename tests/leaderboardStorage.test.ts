import { describe, it, expect } from 'vitest';
import { loadLeaderboard, saveLeaderboardEntry } from '../src/storage/leaderboardStorage.js';

const createStorage = () => {
  const data = new Map<string, string>();

  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
  };
};

describe('leaderboard storage', () => {
  it('should return an empty array when there are no saved scores', () => {
    const storage = createStorage();

    expect(loadLeaderboard(10, 4, storage)).toEqual([]);
  });

  it('should save and load a score', () => {
    const storage = createStorage();
    const entry = {
      attempts: 3,
      time: 45,
      base: 10,
      length: 4,
    };

    saveLeaderboardEntry(entry, storage);

    expect(loadLeaderboard(10, 4, storage)).toEqual([entry]);
  });

  it('should store scores separately for different settings', () => {
    const storage = createStorage();

    const decimalEntry = {
      attempts: 3,
      time: 45,
      base: 10,
      length: 4,
    };

    const hexadecimalEntry = {
      attempts: 2,
      time: 30,
      base: 16,
      length: 4,
    };

    saveLeaderboardEntry(decimalEntry, storage);
    saveLeaderboardEntry(hexadecimalEntry, storage);

    expect(loadLeaderboard(10, 4, storage)).toEqual([decimalEntry]);
    expect(loadLeaderboard(16, 4, storage)).toEqual([hexadecimalEntry]);
  });

  it('should keep only the top 10 scores', () => {
    const storage = createStorage();

    for (let attempts = 15; attempts >= 1; attempts--) {
      saveLeaderboardEntry({ attempts, time: 30, base: 10, length: 4 }, storage);
    }

    expect(loadLeaderboard(10, 4, storage)).toHaveLength(10);
    expect(loadLeaderboard(10, 4, storage)[0].attempts).toBe(1);
  });

  it('should return an empty array when saved data is invalid JSON', () => {
    const storage = createStorage();
    storage.setItem('bulls-and-cows-leaderboard-10-4', '{invalid');

    expect(loadLeaderboard(10, 4, storage)).toEqual([]);
  });

  it('should return an empty array when saved data is not an array', () => {
    const storage = createStorage();
    storage.setItem('bulls-and-cows-leaderboard-10-4', '{"attempts": 3}');

    expect(loadLeaderboard(10, 4, storage)).toEqual([]);
  });
});
