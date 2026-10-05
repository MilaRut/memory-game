import { createElement } from './utils';
import { startGame, getTheme, setTheme } from './game';
import { renderLeaderboard } from './leaderboard';
const body = document.body;
const BASE = import.meta.env.BASE_URL;

const THEMES = [
  { value: 'winter', label: 'Зима' },
  { value: 'spring', label: 'Весна' },
  { value: 'summer', label: 'Лето' },
  { value: 'fall', label: 'Осень' },
];

function closeDialog(dialog) {
  dialog.close();
  document.body.classList.remove('no-scroll');
}

function renderGame() {
  const pageWrapper = createElement('div', ['wrapper', getTheme()]);
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

  const restartBtn = createElement('button', ['header__restart', 'restart-btn', 'btn--primary'], { type: 'button' });
  restartBtn.append(
    createElement('span', ['btn__text'], {}, 'Новая игра'),
    createElement('img', ['btn__icon'], { src: `${BASE}restart.svg`, alt: '', 'aria-hidden': 'true' })
  );
  const leaderboardBtn = createElement('button', ['header__leaderboard', 'btn--secondary'], { type: 'button' });
  leaderboardBtn.append(
    createElement('span', ['btn__text'], {}, 'Таблица лидеров'),
    createElement('img', ['btn__icon'], { src: `${BASE}leaderboard.svg`, alt: '', 'aria-hidden': 'true' })
  );
  btnsWrapper.append(restartBtn, leaderboardBtn);

  const topContainer = createElement('div', ['top-container']);
  main.append(topContainer);

  const stats = createElement('div', ['stats']);
  topContainer.append(stats);

  const steps = createElement('div', ['stats__steps']);
  const pairs = createElement('div', ['stats__pairs']);
  stats.append(steps, pairs);

  const stepsLabel = createElement('p', ['stats__steps-label'], {}, 'Ходы');
  const stepsNum = createElement('p', ['stats__steps-num'], {}, '0');
  steps.append(stepsLabel, stepsNum);

  const pairsLabel = createElement('p', ['stats__pairs-label'], {}, 'Найдено');
  const pairsNum = createElement('p', ['stats__pairs-num'], {}, '0 из 8');
  pairs.append(pairsLabel, pairsNum);

  const themesContainer = createElement('div', ['themes-container']);
  topContainer.append(themesContainer);

  const legend = createElement('p', ['legend'], {}, 'Выбери тему');
  themesContainer.append(legend);

  THEMES.forEach(({ value, label }) => {
    const labelEl = createElement('label', ['theme-option'], {}, label);
    const input = createElement('input', ['theme-option__input'], {
      type: 'radio',
      name: 'theme',
      value
    });

    labelEl.append(input);
    themesContainer.append(labelEl);
  });

  const cards = createElement('div', ['cards']);
  main.append(cards);

  const footerText = createElement('p', [], {}, '© 2026');
  const footerLinks = createElement('div', ['footer__links']);


  const rsLink = createElement('a', ['footer__rsschool'], {
    href: 'https://rs.school/courses/javascript',
    target: '_blank',
    rel: 'nofollow noopener',
  });
  const rsLogo = createElement('img', [], {
    src: `${BASE}rs_school_js.svg`,
    width: '60',
    height: '22',
    alt: 'Логотип RS School.',
    loading: 'lazy',
  });
  rsLink.append(rsLogo);

  const ghLink = createElement('a', ['footer__github'], {
    href: 'https://github.com/MilaRut',
    target: '_blank',
    rel: 'nofollow noopener',
  });

  const ghText = createElement('span', [], {}, 'GitHub');
  ghLink.append(ghText);

  footerLinks.append(rsLink, ghLink);
  footer.append(footerText, footerLinks);


  const dialog = createElement('dialog', ['dialog'], { id: 'dialog' });
  body.append(dialog);

  const dialogContent = createElement('div', ['dialog__content'], {}, '');
  const dialogRestartBtn = createElement('button', ['dialog__restart-btn', 'restart-btn', 'btn--primary'], { type: 'button' }, 'Новая игра');
  const dialogCloseBtn = createElement('button', ['dialog__close-btn', 'btn--secondary'], { type: 'button' }, 'Закрыть');
  dialog.append(dialogContent, dialogRestartBtn, dialogCloseBtn);

  startGame();

  const current = getTheme();
  const currentInput = themesContainer.querySelector(`input[value="${current}"]`);
  if (currentInput) {
    currentInput.checked = true;
  }

  themesContainer.addEventListener('change', (e) => {
    if (e.target.name !== 'theme') return;
    setTheme(e.target.value);
  });

  leaderboardBtn.addEventListener('click', () => {
    renderLeaderboard();
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.restart-btn')) {
      startGame();
      closeDialog(dialog);
    }
  });

  dialogCloseBtn.addEventListener('click', () => {
    closeDialog(dialog);
  });

  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!isInDialog) {
      closeDialog(dialog);
    }
  });

}

export { renderGame };
