import { createElement } from './utils';

export function renderLeaderboard(dialog) {
  const data = localStorage.getItem('mrut_stats') || null;
  const content = dialog?.querySelector('.dialog__content');

  if (!content) return;

  const arr = data ? JSON.parse(data) : [];

  if (!arr.length) {
    content.textContent = 'Пока нет результатов';
    return;
  }

  content.replaceChildren();

  const table = createElement('table');
  content.appendChild(table);
  const thead = createElement('thead');
  table.appendChild(thead);
  const headerRow = createElement('tr');
  thead.appendChild(headerRow);
  ['Место', 'Ходы', 'Дата'].forEach((title) => {
    headerRow.appendChild(createElement('th', [], {}, title));
  });
  const tbody = createElement('tbody');
  table.appendChild(tbody);

  arr.forEach((el, ind) => {
    const date = new Date(el.date);
    const formattedDate = date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const row = createElement('tr');
    tbody.appendChild(row);
    row.appendChild(createElement('td', [], {}, String(ind + 1)));
    row.appendChild(createElement('td', [], {}, String(el.steps)));
    row.appendChild(createElement('td', [], {}, formattedDate));
  });
}
