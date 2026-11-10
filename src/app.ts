import { renderGame } from './ui/render.js';
import { createGameState, initialGameState, type GameState } from './state/gameState.js';
import { filterInput } from './ui/input.js';
import { isValidGuess } from './logic/isValidGuess.js';
import { evaluateGuess } from './logic/evaluateGuess.js';
import { saveLeaderboardEntry, loadLeaderboard } from './storage/leaderboardStorage.js';
import { renderLeaderboard } from './ui/leaderboard.js';

renderGame();
renderLeaderboard(loadLeaderboard(10, 4));

let gameState: GameState = initialGameState;
const baseSelect = document.querySelector<HTMLSelectElement>('#base');
const lengthSelect = document.querySelector<HTMLSelectElement>('#length');

if (baseSelect && lengthSelect) {
  baseSelect.addEventListener('change', () => {
    const isBinary = Number(baseSelect.value) === 2;

    if (isBinary) {
      lengthSelect.value = '2';
      lengthSelect.disabled = true;
    } else {
      lengthSelect.disabled = false;
    }

    renderLeaderboard(loadLeaderboard(Number(baseSelect.value), Number(lengthSelect.value)));
  });
}

const startGameButton = document.querySelector<HTMLButtonElement>('.game__button--start');
const newGameButton = document.querySelector<HTMLButtonElement>('.game__button--new');
const submitGameButton = document.querySelector<HTMLButtonElement>('.game__button--submit');

const inputGuess = document.querySelector<HTMLInputElement>('#guess');
const historyList = document.querySelector<HTMLUListElement>('.game__history-list');
const gameMessage = document.querySelector<HTMLParagraphElement>('#game-message');
const gameInputSection = document.querySelector<HTMLElement>('.game__input--guess');
const gameHistory = document.querySelector<HTMLElement>('.game__history');

const clearGameUI = (): void => {
  if (inputGuess) {
    inputGuess.value = '';
  }

  if (historyList) {
    historyList.replaceChildren();
  }

  if (gameMessage) {
    gameMessage.textContent = '';
  }
};

const showGameMessage = (message: string): void => {
  if (gameMessage) {
    gameMessage.textContent = message;
    gameMessage.style.display = 'block';
  }
};

if (inputGuess) {
  inputGuess.addEventListener('input', () => {
    inputGuess.value = filterInput(inputGuess.value, gameState.base);
  });
}

if (submitGameButton) {
  submitGameButton.addEventListener('click', () => {
    if (!gameState.secret || gameState.isGameOver || !inputGuess) {
      return;
    }

    const guess = inputGuess.value;

    if (!isValidGuess(guess, gameState.length, gameState.base)) {
      showGameMessage('Enter a valid number with unique digits.');
      return;
    }

    const isDuplicate = gameState.attempts.some((attempt) => attempt.guess === guess);

    if (isDuplicate) {
      showGameMessage('You have already tried this number.');
      return;
    }

    const result = evaluateGuess(gameState.secret, guess);

    gameState.attempts.push({
      guess,
      bulls: result.bulls,
      cows: result.cows,
    });

    if (historyList) {
      const historyItem = document.createElement('li');

      historyItem.textContent = `${guess} — Bulls: ${result.bulls}, Cows: ${result.cows}`;

      historyList.append(historyItem);
    }

    inputGuess.value = '';

    if (result.bulls === gameState.length) {
      gameState.isGameOver = true;

      const elapsedSeconds = gameState.startTime !== null ? Math.floor((Date.now() - gameState.startTime) / 1000) : 0;

      saveLeaderboardEntry({
        attempts: gameState.attempts.length,
        time: elapsedSeconds,
        base: gameState.base,
        length: gameState.length,
      });

      renderLeaderboard(loadLeaderboard(gameState.base, gameState.length));

      showGameMessage(
        `Congratulations! You won in ${gameState.attempts.length} attempts and ${elapsedSeconds} seconds!`,
      );

      inputGuess.disabled = true;
      submitGameButton.disabled = true;
    }
  });
}

if (startGameButton) {
  startGameButton.addEventListener('click', () => {
    if (baseSelect && lengthSelect) {
      const base = Number(baseSelect.value);
      const length = Number(lengthSelect.value);

      gameState = createGameState(base, length);

      baseSelect.disabled = true;
      lengthSelect.disabled = true;
      startGameButton.disabled = true;

      clearGameUI();

      if (gameInputSection) {
        gameInputSection.style.display = 'flex';
      }

      if (inputGuess) {
        inputGuess.disabled = false;
      }

      if (submitGameButton) {
        submitGameButton.disabled = false;
      }

      if (newGameButton) {
        newGameButton.disabled = false;
      }

      if (gameHistory) {
        gameHistory.style.display = 'flex';
      }
    }
  });
}

if (newGameButton) {
  newGameButton.addEventListener('click', () => {
    if (baseSelect) {
      baseSelect.disabled = false;
    }

    if (lengthSelect && baseSelect) {
      const isBinary = Number(baseSelect.value) === 2;
      lengthSelect.disabled = isBinary;
    }

    gameState = initialGameState;

    if (startGameButton) {
      startGameButton.disabled = false;
    }

    clearGameUI();

    if (gameInputSection) {
      gameInputSection.style.display = 'none';
    }

    if (inputGuess) {
      inputGuess.disabled = true;
    }

    if (submitGameButton) {
      submitGameButton.disabled = true;
    }

    if (newGameButton) {
      newGameButton.disabled = true;
    }

    if (gameHistory) {
      gameHistory.style.display = 'none';
    }

    if (gameMessage) {
      gameMessage.style.display = 'none';
    }
  });
}
