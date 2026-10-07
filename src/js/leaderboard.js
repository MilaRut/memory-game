import { createElement } from './utils';

export function renderLeaderboard() {
  const dialog = document.querySelector('.dialog');
  const content = dialog?.querySelector('.dialog__content');

  const data = localStorage.getItem('mrut_stats') || null;

  if (!content) return;

  content.replaceChildren();

  dialog.setAttribute('data-dialog', 'leaderboard');
  dialog.showModal();
  document.body.classList.add('no-scroll');

  const title = createElement('p', ['dialog__title'], {}, 'Таблица лидеров');
  content.append(title);

  const arr = data ? JSON.parse(data) : [];

  if (!arr.length) {
    const text = createElement('p', ['dialog__text'], {}, 'Пока нет результатов');
    content.append(text);
    return;
  }

  const table = createElement('table');
  content.append(table);
  const thead = createElement('thead');
  const headerRow = createElement('tr');
  thead.append(headerRow);
  ['Место', 'Ходы', 'Дата'].forEach((title) => {
    headerRow.append(createElement('th', [], {}, title));
  });
  const tbody = createElement('tbody');
  table.append(thead, tbody);

  arr.forEach((el, ind) => {
    const date = new Date(el.date);
    const formattedDate = date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const row = createElement('tr');
    tbody.append(row);
    row.append(createElement('td', [], {}, String(ind + 1)));
    row.append(createElement('td', [], {}, String(el.steps)));
    row.append(createElement('td', [], {}, formattedDate));
  });
}
