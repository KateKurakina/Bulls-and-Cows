export interface LeaderboardEntry {
  attempts: number;
  time: number;
}

export const getTopScores = (scores: LeaderboardEntry[]): LeaderboardEntry[] => {
  void scores;
  return [];
};
