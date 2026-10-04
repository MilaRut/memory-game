import { createElement } from './utils';
import { startGame } from './game';
import { renderLeaderboard } from './leaderboard';
const body = document.body;
const BASE = import.meta.env.BASE_URL;

function renderGame() {
  const pageWrapper = createElement('div', ['wrapper']);
  body.appendChild(pageWrapper);

  const header = createElement('header', ['header']);
  pageWrapper.appendChild(header);

  const main = createElement('main', ['main']);
  pageWrapper.appendChild(main);

  const footer = createElement('footer', ['footer']);
  pageWrapper.appendChild(footer);

  const logoWrapper = createElement('div', ['logo__wrapper']);
  header.appendChild(logoWrapper);

  const logo = createElement('img', ['logo'], { src: '${BASE}logo.png' });
  logoWrapper.appendChild(logo);

  const title = createElement('p', ['header__title'], {}, 'Memory Game');
  logoWrapper.appendChild(title);

  const btnsWrapper = createElement('div', ['btns__wrapper']);
  header.appendChild(btnsWrapper);

  const restartBtn = createElement('button', ['header__restart'], { type: 'button' }, 'Новая игра');
  btnsWrapper.appendChild(restartBtn);

  const leaderboardBtn = createElement('button', ['header__leaderboard'], { type: 'button' }, 'Таблица лидеров');
  btnsWrapper.appendChild(leaderboardBtn);

  const stats = createElement('div', ['stats']);
  main.appendChild(stats);

  const steps = createElement('div', ['stats__steps']);
  stats.appendChild(steps);

  const stepsLabel = createElement('p', ['stats__steps-label'], {}, 'Ходы');
  steps.appendChild(stepsLabel);

  const stepsNum = createElement('p', ['stats__steps-num'], {}, '0');
  steps.appendChild(stepsNum);

  const pairs = createElement('div', ['pairs__steps']);
  stats.appendChild(pairs);

  const pairsLabel = createElement('p', ['pairs__steps-label'], {}, 'Найдено');
  pairs.appendChild(pairsLabel);

  const pairsNum = createElement('p', ['pairs__steps-num'], {}, '0 из 8');
  pairs.appendChild(pairsNum);

  const cards = createElement('div', ['cards']);
  main.appendChild(cards);

  const leaderboardDialog = createElement('dialog', ['dialog'], { id: 'leaderboard' });
  body.appendChild(leaderboardDialog);

  const leaderboardTitle = createElement('p', ['dialog__title'], {}, 'Таблица лидеров');
  leaderboardDialog.appendChild(leaderboardTitle);

  const leaderboardContent = createElement('p', ['dialog__content'], {}, '');
  leaderboardDialog.appendChild(leaderboardContent);

  const leaderboardCloseBtn = createElement('button', ['dialog__close-btn'], { type: 'button' }, 'Закрыть');
  leaderboardDialog.appendChild(leaderboardCloseBtn);

  const winDialog = createElement('dialog', ['dialog'], { id: 'win' });
  body.appendChild(winDialog);

  const winTitle = createElement('p', ['dialog__title'], {}, 'Победа!');
  winDialog.appendChild(winTitle);

  const winStatsContainer = createElement('div', ['dialog__stats']);
  winDialog.appendChild(winStatsContainer);

  const winSubtitle = createElement('span', ['dialog__subtitle'], {}, 'Вы нашли все пары за ');
  winStatsContainer.appendChild(winSubtitle);

  const winStatsStepsNum = createElement('span', ['dialog__stats-num'], { id: 'win-steps' }, '');
  winStatsContainer.appendChild(winStatsStepsNum);

  const winRestartBtn = createElement('button', ['dialog__restart-btn'], { type: 'button' }, 'Новая игра');
  winDialog.appendChild(winRestartBtn);

  const winCloseBtn = createElement('button', ['dialog__close-btn'], { type: 'button' }, 'Закрыть');
  winDialog.appendChild(winCloseBtn);


  startGame();
  renderLeaderboard(leaderboardDialog);

  restartBtn.addEventListener('click', () => {
    startGame();
  });

  leaderboardBtn.addEventListener('click', () => {
    window.leaderboard.showModal();
    renderLeaderboard(leaderboardDialog);
  });

  winRestartBtn.addEventListener('click', () => {
    startGame();
    window.win.close();
  });

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('dialog__close-btn')) {
      target.closest('.dialog').close();
    }
  });

  [leaderboardDialog, winDialog].forEach((dialog) => {
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
  });
}

export { renderGame };
