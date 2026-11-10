export const renderGame = (): void => {
  const game = document.createElement('main');
  game.className = 'game';

  const title = document.createElement('h1');
  title.className = 'game__title';
  title.textContent = 'Bulls and Cows';

  game.append(title);

  const gameSettings = document.createElement('section');
  gameSettings.className = 'game__settings';

  const labelBase = document.createElement('label');
  labelBase.className = 'game__label';
  labelBase.htmlFor = 'base';
  labelBase.textContent = 'Number system: ';

  const selectBase = document.createElement('select');
  selectBase.className = 'game__select';
  selectBase.id = 'base';
  const selectBaseOptions = [
    { value: '2', text: 'Binary' },
    { value: '8', text: 'Octal' },
    { value: '10', text: 'Decimal', selected: true },
    { value: '16', text: 'Hexadecimal' },
  ];

  selectBaseOptions.forEach((data) => {
    const option = document.createElement('option');
    option.value = data.value;
    option.textContent = data.text;

    if (data.selected) {
      option.selected = true;
    }

    selectBase.appendChild(option);
  });

  game.append(gameSettings);
  gameSettings.append(labelBase, selectBase);

  const labelLength = document.createElement('label');
  labelLength.className = 'game__label';
  labelLength.htmlFor = 'length';
  labelLength.textContent = 'Secret length: ';

  const selectLength = document.createElement('select');
  selectLength.className = 'game__select';
  selectLength.id = 'length';
  const selectLengthOptions = [
    { value: '2', text: '2' },
    { value: '3', text: '3' },
    { value: '4', text: '4', selected: true },
    { value: '5', text: '5' },
    { value: '6', text: '6' },
  ];

  selectLengthOptions.forEach((data) => {
    const option = document.createElement('option');
    option.value = data.value;
    option.textContent = data.text;

    if (data.selected) {
      option.selected = true;
    }

    selectLength.appendChild(option);
  });

  gameSettings.append(labelLength, selectLength);

  const gameButton = document.createElement('button');
  gameButton.className = 'game__button game__button--new';
  gameButton.id = 'new-game';
  gameButton.type = 'button';
  gameButton.textContent = 'New game';

  gameSettings.append(gameButton);

  const gameInput = document.createElement('section');
  gameInput.className = 'game__input';

  const inputGuessLabel = document.createElement('label');
  inputGuessLabel.className = 'game__label';
  inputGuessLabel.htmlFor = 'guess';
  inputGuessLabel.textContent = 'Your guess: ';

  const inputGuessInput = document.createElement('input');
  inputGuessInput.className = 'game__field';
  inputGuessInput.id = 'guess';
  inputGuessInput.type = 'text';
  inputGuessInput.autocomplete = 'off';
  inputGuessInput.disabled = true;

  const inputGuessButton = document.createElement('button');
  inputGuessButton.className = 'game__button game__button--submit';
  inputGuessButton.id = 'submit-guess';
  inputGuessButton.type = 'button';
  inputGuessButton.textContent = 'Submit';
  inputGuessButton.disabled = true;

  game.append(gameInput);
  gameInput.append(inputGuessLabel, inputGuessInput, inputGuessButton);

  const gameHistory = document.createElement('section');
  gameHistory.className = 'game__history';

  const historyHeader = document.createElement('h2');
  historyHeader.className = 'game__subtitle';
  historyHeader.textContent = 'Attempts history';

  const historyList = document.createElement('ul');
  historyList.className = 'game__history-list';
  historyList.id = 'history';

  game.append(gameHistory);
  gameHistory.append(historyHeader, historyList);

  const gameMessage = document.createElement('p');
  gameMessage.className = 'game__message';
  gameMessage.id = 'game-message';
  gameMessage.ariaLive = 'polite';

  game.append(gameMessage);

  document.body.append(game);
};
