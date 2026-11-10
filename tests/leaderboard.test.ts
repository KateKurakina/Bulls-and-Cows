import { describe, it, expect } from 'vitest';
import { getTopScores } from '../src/logic/leaderboard.js';

describe('getTopScores', () => {
  it('should sort scores by attempts in ascending order', () => {
    const scores = [
      { attempts: 5, time: 30 },
      { attempts: 3, time: 60 },
      { attempts: 4, time: 20 },
    ];

    expect(getTopScores(scores)).toEqual([
      { attempts: 3, time: 60 },
      { attempts: 4, time: 20 },
      { attempts: 5, time: 30 },
    ]);
  });

  it('should sort by time when attempts are equal', () => {
    const scores = [
      { attempts: 3, time: 60 },
      { attempts: 3, time: 30 },
      { attempts: 3, time: 45 },
    ];

    expect(getTopScores(scores)).toEqual([
      { attempts: 3, time: 30 },
      { attempts: 3, time: 45 },
      { attempts: 3, time: 60 },
    ]);
  });

  it('should return only top 10 scores', () => {
    const scores = Array.from({ length: 15 }, (_, index) => ({
      attempts: index + 1,
      time: 30,
    }));

    expect(getTopScores(scores)).toHaveLength(10);
  });
});
