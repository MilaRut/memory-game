import { createElement, shuffleArray, clearClasses } from '../js/utils';
import { renderWinmodal } from './winmodal';

const THEMES = ['winter', 'spring', 'summer', 'fall'];
const THEME_KEY = 'mrut_theme';
const STARTARR = ['1', '2', '3', '4', '5', '6', '7', '8'];
const MAX = 8;
const BASE = import.meta.env.BASE_URL;

let count = 0;
let totalSteps = 0;
let pairs = 0;
let firstCard = null;
let secondCard = null;
let timeoutId = null;
let foundTimeoutId = null;

let theme = (() => {
  const saved = localStorage.getItem(THEME_KEY);
  return THEMES.includes(saved) ? saved : 'fall';
})();

export function getTheme() {
  return theme;
}

export function setTheme(newTheme) {
  if (!THEMES.includes(newTheme) || newTheme === theme) return;
  theme = newTheme;
  localStorage.setItem(THEME_KEY, theme);

  const wrapper = document.querySelector('.wrapper');
  if (wrapper) {
    THEMES.forEach((t) => wrapper.classList.remove(t));
    wrapper.classList.add(theme);
  }

  startGame();
}

function playSound(id) {
  const audio = document.getElementById(id);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}

function createCardsArray() {
  const fullArr = STARTARR.concat(STARTARR);
  return shuffleArray(fullArr);
}

function createCardLayout(parentEl, el) {
  const card = createElement('div', ['card']);
  card.setAttribute('data-id', el);
  const cardContent = createElement('div', ['card__content']);
  const front = createElement('div', ['card__front']);
  const back = createElement('div', ['card__back']);
  const img = createElement('img', [], { src: `${BASE}${theme}-${el}.png`, alt: '', width: '245', height: '245', draggable: 'false' });
  back.append(img);
  cardContent.append(front, back);
  card.append(cardContent);
  parentEl.append(card);
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
  renderWinmodal(totalSteps);
  updateLocalStorage();
  playSound('win-sound');
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
  playSound('open-sound');

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
      playSound('remove-sound');
      const f = firstCard;
      const s = secondCard;
      count = 0;
      pairs++;
      document.querySelector('.stats__pairs-num').textContent = `${pairs} из ${MAX}`;
      firstCard = null;
      secondCard = null;

      foundTimeoutId = setTimeout(() => {
        f.classList.add('is-found');
        s.classList.add('is-found');
        clearClasses(document.querySelectorAll('.card'), 'is-active');
        foundTimeoutId = null;

        cards.style.pointerEvents = '';
        if (pairs === MAX) {
          endGame();
        }
      }, 300);
    } else {
      count = 0;
      timeoutId = setTimeout(() => {
        clearClasses(document.querySelectorAll('.card'), 'is-active');
        firstCard = null;
        secondCard = null;
        cards.style.pointerEvents = '';
        timeoutId = null;
        playSound('flip-sound');
      }, 1000);
    }
  }
}

export function startGame() {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  if (foundTimeoutId !== null) {
    clearTimeout(foundTimeoutId);
    foundTimeoutId = null;
  }

  const cards = document.querySelector('.cards');
  cards.style.pointerEvents = '';
  count = 0;
  totalSteps = 0;
  pairs = 0;
  firstCard = null;
  secondCard = null;
  document.querySelector('.stats__pairs-num').textContent = `${pairs} из ${MAX}`;
  document.querySelector('.stats__steps-num').textContent = totalSteps;

  renderCards();

  document.removeEventListener('click', handleCardClick);
  document.addEventListener('click', handleCardClick);
};

