// Імпортуємо бібліотеку axios
import axios from 'axios';

// Встановлюємо заголовок x-api-key з ключем API для всіх запитів, що виконуються за допомогою axios
axios.defaults.headers.common['x-api-key'] =
  'live_M75VJkSwcJFOMR1Ku7cnyP95QfLu2Nu1t4LmlgAIPY3fm3qYTlBxeVwjVSEnKE9w';

// Експортуємо функцію fetchBreeds, яка повертає проміс з результатом запиту до ендпоінта /v1/breeds API thecatapi.com
export function fetchBreeds() {
  return (
    axios
      .get('https://api.thecatapi.com/v1/breeds')
      // Обробляємо успішний результат запиту
      .then(response => response.data)
      // Обробляємо помилковий результат запиту
      .catch(error => {
        console.error(error);
        throw error;
      })
  );
}

// Експортуємо функцію fetchCatByBreed, яка приймає параметр breedId і повертає проміс з результатом запиту до ендпоінта /v1/images/search?breed_ids=${breedId} API thecatapi.com
export function fetchCatByBreed(breedId) {
  return (
    axios
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      // Обробляємо успішний результат запиту
      .then(response => response.data)
      // Обробляємо помилковий результат запиту
      .catch(error => {
        console.error(error);
        throw error;
      })
  );
}
