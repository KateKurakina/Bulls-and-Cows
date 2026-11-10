import { describe, it, expect } from 'vitest';
import { getTopScores } from '../src/logic/leaderboard.js';

describe('getTopScores', () => {
  it('should sort scores by attempts in ascending order', () => {
    const scores = [
      { attempts: 5, time: 30, base: 10, length: 4 },
      { attempts: 3, time: 60, base: 10, length: 4 },
      { attempts: 4, time: 20, base: 10, length: 4 },
    ];

    expect(getTopScores(scores)).toEqual([
      { attempts: 3, time: 60, base: 10, length: 4 },
      { attempts: 4, time: 20, base: 10, length: 4 },
      { attempts: 5, time: 30, base: 10, length: 4 },
    ]);
  });

  it('should sort by time when attempts are equal', () => {
    const scores = [
      { attempts: 3, time: 60, base: 10, length: 4 },
      { attempts: 3, time: 30, base: 10, length: 4 },
      { attempts: 3, time: 45, base: 10, length: 4 },
    ];

    expect(getTopScores(scores)).toEqual([
      { attempts: 3, time: 30, base: 10, length: 4 },
      { attempts: 3, time: 45, base: 10, length: 4 },
      { attempts: 3, time: 60, base: 10, length: 4 },
    ]);
  });

  it('should return only top 10 scores', () => {
    const scores = Array.from({ length: 15 }, (_, index) => ({
      attempts: index + 1,
      time: 30,
      base: 10,
      length: 4,
    }));

    expect(getTopScores(scores)).toHaveLength(10);
  });
});
