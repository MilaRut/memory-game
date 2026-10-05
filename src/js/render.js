import { createElement } from './utils';
import { startGame } from './game';
import { renderLeaderboard } from './leaderboard';
const body = document.body;
const BASE = import.meta.env.BASE_URL;

function renderGame() {
  const pageWrapper = createElement('div', ['wrapper']);
  body.append(pageWrapper);

  const header = createElement('header', ['header']);
  const main = createElement('main', ['main']);
  const footer = createElement('footer', ['footer']);
  pageWrapper.append(header, main, footer);

  const logoWrapper = createElement('div', ['logo__wrapper']);
  header.append(logoWrapper);

  const logo = createElement('img', ['logo'], { src: `${BASE}logo.png`, alt: 'Лого игры' });
  const title = createElement('p', ['header__title'], {}, 'Memory Game');
  logoWrapper.append(logo, title);

  const btnsWrapper = createElement('div', ['btns__wrapper']);
  header.append(btnsWrapper);

  const restartBtn = createElement('button', ['header__restart', 'restart-btn'], { type: 'button' }, 'Новая игра');
  const leaderboardBtn = createElement('button', ['header__leaderboard'], { type: 'button' }, 'Таблица лидеров');
  btnsWrapper.append(restartBtn, leaderboardBtn);

  const stats = createElement('div', ['stats']);
  main.append(stats);

  const steps = createElement('div', ['stats__steps']);
  const pairs = createElement('div', ['pairs__steps']);
  stats.append(steps, pairs);

  const stepsLabel = createElement('p', ['stats__steps-label'], {}, 'Ходы');
  const stepsNum = createElement('p', ['stats__steps-num'], {}, '0');
  steps.append(stepsLabel, stepsNum);


  const pairsLabel = createElement('p', ['pairs__steps-label'], {}, 'Найдено');
  const pairsNum = createElement('p', ['pairs__steps-num'], {}, '0 из 8');
  pairs.append(pairsLabel, pairsNum);

  const cards = createElement('div', ['cards']);
  main.append(cards);

  const dialog = createElement('dialog', ['dialog'], { id: 'dialog' });
  body.append(dialog);

  const dialogContent = createElement('div', ['dialog__content'], {}, '');
  const dialogRestartBtn = createElement('button', ['dialog__restart-btn', 'restart-btn'], { type: 'button' }, 'Новая игра');
  const dialogCloseBtn = createElement('button', ['dialog__close-btn'], { type: 'button' }, 'Закрыть');
  dialog.append(dialogContent, dialogRestartBtn, dialogCloseBtn);

  startGame();

  leaderboardBtn.addEventListener('click', () => {
    renderLeaderboard();
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.restart-btn')) {
      startGame();

      if (dialog.open) {
        dialog.close();
      }
    }
  });

  dialogCloseBtn.addEventListener('click', () => {
    dialog.close();
  });

  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!isInDialog) {
      dialog.close();
    }
  });

}

export { renderGame };
