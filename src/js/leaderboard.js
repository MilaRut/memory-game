import { createElement } from './utils';

export function renderLeaderboard(dialog) {
  const data = localStorage.getItem('mrut_stats') || null;
  const content = dialog?.querySelector('.dialog__content');

  if (!data) {
    content.textContent = 'Пока нет результатов';
  } else {
    content.replaceChildren();
    const table = createElement('table');
    content.appendChild(table);
    const thead = createElement('thead');
    table.appendChild(thead);
    const headerRow = createElement('tr');
    thead.appendChild(headerRow);
    const thNumber = createElement('th', [], {}, 'Место');
    headerRow.appendChild(thNumber);
    const thPlace = createElement('th', [], {}, 'Ходы');
    headerRow.appendChild(thPlace);
    const thDate = createElement('th', [], {}, 'Дата');
    headerRow.appendChild(thDate);
    const tbody = createElement('tbody');
    table.appendChild(tbody);

    const arr = JSON.parse(data);

    arr.forEach((el, ind) => {
      const date = new Date(el.date);
      const formattedDate = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });

      const place = String(ind + 1);

      const row = createElement('tr');
      tbody.appendChild(row);
      const tdNumber = createElement('td', [], {}, place);
      row.appendChild(tdNumber);
      const tdPlace = createElement('td', [], {}, el.steps);
      row.appendChild(tdPlace);
      const tdDate = createElement('td', [], {}, formattedDate);
      row.appendChild(tdDate);
    });
  }
}
