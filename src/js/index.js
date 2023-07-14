// Імпортуємо залежності
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// Об'єкт з вибраними селекторами елементів DOM
const selectors = {
  breedSelect: document.querySelector('.breed-select'), // Селектор для випадаючого списку порід
  loader: document.querySelector('.loader'), // Селектор для індикатора завантаження
  error: document.querySelector('.error'), // Селектор для повідомлення про помилку
  catInfo: document.querySelector('.cat-info'), // Селектор для інформації про кота
};

// Функція для показу індикатора завантаження
function showLoader() {
  selectors.loader.style.display = 'block';
}

// Функція для приховування індикатора завантаження
function hideLoader() {
  selectors.loader.style.display = 'none';
}

// Функція для показу повідомлення про помилку
function showError() {
  Notiflix.Notify.warning(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

// Функція для приховування повідомлення про помилку
function hideError() {
  selectors.error.style.display = 'none';
}

// Функція для показу інформації про кота
function showCatInfo(cat) {
  selectors.catInfo.innerHTML = createMarkup(cat);
  selectors.catInfo.style.display = 'block';
}

// Функція для створення розмітки
function createMarkup(arr) {
  return arr
    .map(
      ({ url, breeds: [{ name, description, temperament }] }) => `
        <img class="cat-image" src="${url}" alt="${name}" />
        <h2 class="cat-name">${name}</h2>
        <p class="cat-description">${description}</p>
        <p class="cat-temperament">${temperament}</p>
      `
    )
    .join('');
}

// Функція для приховування інформації про кота
function hideCatInfo() {
  selectors.catInfo.innerHTML = '';
  selectors.catInfo.style.display = 'none';
}

// Функція для заповнення випадаючого списку порід котів
function populateBreedsSelect(breeds) {
  new SlimSelect({
    select: selectors.breedSelect,
    data: breeds.map(({ id, name }) => ({ value: id, text: name })),
  });
}

// Обробник події зміни вибраної породи в випадаючому списку
function handleBreedSelectChange() {
  const breedId = selectors.breedSelect.value;

  if (breedId) {
    hideCatInfo();
    showLoader();

    fetchCatByBreed(breedId)
      .then(cat => {
        hideLoader();
        showCatInfo(cat);
      })
      .catch(error => {
        hideLoader();
        showError();
      });
  } else {
    hideCatInfo();
  }
}

// Обробник події завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
  showLoader(); // Додаємо відображення спінера при завантаженні сторінки
  hideError();

  fetchBreeds()
    .then(breeds => {
      hideLoader(); // Приховуємо спінер після отримання списку порід котів
      populateBreedsSelect(breeds);
      selectors.breedSelect.addEventListener('change', handleBreedSelectChange);
    })
    .catch(error => {
      hideLoader();
      hideError();
      showError();
    });
});
