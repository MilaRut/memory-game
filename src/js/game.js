import { createElement, shuffleArray, clearClasses } from '../js/utils';
const STARTARR = ['01', '02', '03', '04', '05', '06', '07', '08'];
const MAX = 8;
const BASE = import.meta.env.BASE_URL;

let count = 0;
let totalSteps = 0;
let pairs = 0;
let firstCard = null;
let secondCard = null;
let timeoutId = null;

function createCardsArray() {
  const fullArr = STARTARR.concat(STARTARR);
  return shuffleArray(fullArr);
}

function createCardLayout(parentEl, el) {
  const card = createElement('div', ['card']);
  card.setAttribute('data-id', el);
  const front = createElement('div', ['card__front']);
  const back = createElement('div', ['card__back']);
  const img = createElement('img', [], { src: `${BASE}${el}.png`, alt: '', width: '245', height: '245',  draggable: 'false'});
  back.appendChild(img);
  card.appendChild(front);
  card.appendChild(back);
  parentEl.appendChild(card);
}

function renderCards() {
  const cardsList = document.querySelector('.cards');
  cardsList.replaceChildren();
  const cards = createCardsArray();
  cards.forEach((card) => {
    createCardLayout(cardsList, card);
  });
}

function endGame() {
  window.win.showModal();
  document.querySelector('#win-steps').textContent = `${totalSteps} ходов`;
  updateLocalStorage();
}

function updateLocalStorage() {
  const data = localStorage.getItem('mrut_stats') || null;
  let arr = [];
  const newEntry = {
    steps: totalSteps,
    date: new Date()
  };
  if (!data) {
    arr.push(newEntry);
    localStorage.setItem('mrut_stats', JSON.stringify(arr));
  } else {
    arr = JSON.parse(data);
    arr.push(newEntry);
    const sorted = arr.sort((a, b) => a.steps - b.steps).slice(0, 10);
    localStorage.setItem('mrut_stats', JSON.stringify(sorted));
  }
}

function handleCardClick(e) {
  const card = e.target.closest('.card');
  if (!card) return;

  if (card.classList.contains('is-active') || card.classList.contains('is-found')) return;

  card.classList.add('is-active');
  count++;

  if (count == 1) {
    firstCard = card;
    return;
  }

  if (count == 2) {
    const cards = document.querySelector('.cards');
    cards.style.pointerEvents = 'none';
    secondCard = card;
    totalSteps++;
    document.querySelector('.stats__steps-num').textContent = totalSteps;

    if (firstCard.dataset.id === secondCard.dataset.id) {
      firstCard.classList.add('is-found');
      secondCard.classList.add('is-found');
      clearClasses(document.querySelectorAll('.card'), 'is-active');
      count = 0;
      pairs++;
      document.querySelector('.pairs__steps-num').textContent = `${pairs} из ${MAX}`;
      firstCard = null;
      secondCard = null;
      cards.style.pointerEvents = '';
      if (pairs === MAX) {
        endGame();
      }
    } else {
      count = 0;
      timeoutId = setTimeout(() => {
        clearClasses(document.querySelectorAll('.card'), 'is-active');
        firstCard = null;
        secondCard = null;
        cards.style.pointerEvents = '';
        timeoutId = null;
      }, 1000);
    }
  }
}

export function startGame() {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  const cards = document.querySelector('.cards');
  cards.style.pointerEvents = '';
  count = 0;
  totalSteps = 0;
  pairs = 0;
  firstCard = null;
  secondCard = null;
  document.querySelector('.pairs__steps-num').textContent = `${pairs} из ${MAX}`;
  document.querySelector('.stats__steps-num').textContent = totalSteps;

  renderCards();

  document.removeEventListener('click', handleCardClick);
  document.addEventListener('click', handleCardClick);
};

