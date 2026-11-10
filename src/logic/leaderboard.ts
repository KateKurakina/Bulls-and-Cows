export interface LeaderboardEntry {
  attempts: number;
  time: number;
  base: number;
  length: number;
}

export const getTopScores = (scores: LeaderboardEntry[]): LeaderboardEntry[] => {
  return [...scores]
    .sort((first, second) => {
      if (first.attempts !== second.attempts) {
        return first.attempts - second.attempts;
      }

      return first.time - second.time;
    })
    .slice(0, 10);
};
