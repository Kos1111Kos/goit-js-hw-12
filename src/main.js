// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const listEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader-wrapper');
const formEl = document.querySelector('#search-form');
formEl.addEventListener('submit', onSubmit);

// Функция для выполнения GET-запроса к API Pixabay
async function getPhotos(q) {
  axios.defaults.baseURL = 'https://pixabay.com/api/';

  // Задаем параметры для запроса, включая ключ API, поисковый запрос, тип изображения и другие параметры
  const params = {
    params: {
      key: '42088137-23c74c59277fc3ae3a179e24d',
      q,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };
  // Выполняем запрос с использованием библиотеки Axios и возвращаем результат
  try {
    return await axios.get('', params);
  } catch (error) {
    console.log(error); // В случае ошибки выводим её в консоль
  }
}

// Функция для обработки отправки формы
async function onSubmit(event) {
  event.preventDefault(); // Предотвращаем стандартное поведение формы
  loaderPlay(); // Показываем загрузчик
  listEl.innerHTML = ''; // Очищаем содержимое элемента с классом .gallery
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim(); // Получаем поисковой запрос из формы

  try {
    // Получаем изображения с помощью функции getPhotos
    const {
      data: { hits },
    } = await getPhotos(searchQuery);
    // Если изображения не найдены, выводим сообщение об ошибке
    if (hits.length === 0) {
      return iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
    // Создаем HTML-разметку на основе полученных данных и отображаем её
    listEl.innerHTML = createMarkup(hits);
    lightbox.refresh(); // Обновляем галерею изображений
    document.querySelector('.load-more').classList.remove('is-hidden');
  } catch (error) {
    console.log(error); // В случае ошибки выводим её в консоль
  } finally {
    loaderStop(); // Останавливаем отображение загрузчика
  }
}
// Функция для создания HTML-разметки на основе массива данных
function createMarkup(arr) {
  return arr
    .map(
      el => `
   <li class='photo-card'>
    <a href='${el.largeImageURL}'>
      <img src='${el.webformatURL}' alt='${el.tags}' loading='lazy' />
    </a>
    <div class='info'>
      <p class='info-item'>
        <b>Likes ${el.likes}</b>
      </p>
      <p class='info-item'>
        <b>Views ${el.views}</b>
      </p>
      <p class='info-item'>
        <b>Comments ${el.comments}</b>
      </p>
      <p class='info-item'>
        <b>Downloads ${el.downloads}</b>
      </p>
    </div>
  </li>
  `
    )
    .join('');
}
// Функция для отображения загрузчика
function loaderPlay() {
  loaderEl.classList.remove('is-hidden');
}

// Функция для остановки отображения загрузчика
function loaderStop() {
  loaderEl.classList.add('is-hidden');
}
const loadMoreEl = document.createElement('button');
loadMoreEl.classList.add('load-more');
loadMoreEl.innerHTML = 'Load more';
loadMoreEl.addEventListener('click', () => {
  // Add logic for loading more images
});
document.body.appendChild(loadMoreEl);
