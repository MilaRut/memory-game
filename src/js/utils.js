export function createElement(tag, classes = [], attributes = {}, text = '') {
  const element = document.createElement(tag);
  if (classes.length > 0) {
    element.classList.add(...classes);
  }

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}

export function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function clearClasses(arr, className) {
  arr.forEach((el) => {
    el.classList.remove(className);
  });
}
