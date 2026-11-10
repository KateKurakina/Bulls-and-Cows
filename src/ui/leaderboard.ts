import type { LeaderboardEntry } from '../logic/leaderboard.js';

export const renderLeaderboard = (scores: LeaderboardEntry[]): void => {
  const leaderboardBody = document.getElementById('leaderboard-body');

  if (!leaderboardBody) {
    return;
  }

  leaderboardBody.replaceChildren();

  if (scores.length === 0) {
    const row = document.createElement('tr');
    const cell = document.createElement('td');

    cell.textContent = 'No records yet';
    cell.colSpan = 3;
    cell.className = 'game__leaderboard-empty';

    row.append(cell);
    leaderboardBody.append(row);

    return;
  }

  scores.forEach((score, index) => {
    const row = document.createElement('tr');

    const placeCell = document.createElement('td');
    placeCell.textContent = String(index + 1);

    const attemptsCell = document.createElement('td');
    attemptsCell.textContent = String(score.attempts);

    const timeCell = document.createElement('td');
    timeCell.textContent = `${score.time} sec`;

    row.append(placeCell, attemptsCell, timeCell);

    leaderboardBody.append(row);
  });
};
