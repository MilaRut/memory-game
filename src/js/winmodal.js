import { createElement } from './utils';

function declineEnding(count) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return 'ход';
  } else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
    return 'хода';
  } else {
    return 'ходов';
  }
}

export function renderWinmodal(totalSteps) {
  const dialog = document.querySelector('.dialog');
  const content = dialog?.querySelector('.dialog__content');

  if (!content) return;

  content.replaceChildren();

  dialog.setAttribute('data-dialog', 'win');
  dialog.showModal();
  document.body.classList.add('no-scroll');

  content.append(createElement('p', ['dialog__title'], {}, 'Победа!'));
  const statsContainer = createElement('div', ['dialog__stats']);
  const num = createElement('span', ['dialog__stats-num'], {}, totalSteps);
  statsContainer.append('Вы нашли все пары за ', num, declineEnding(totalSteps));
  content.appendChild(statsContainer);
}
