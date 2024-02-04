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

// loader.style.display = 'none';
let currentPage = 1;

let searchQuery = '';
// Функция для выполнения GET-запроса к API Pixabay
async function getPhotos(q, page = 1) {
  axios.defaults.baseURL = 'https://pixabay.com/api/';

  // Задаем параметры для запроса, включая ключ API, поисковый запрос, тип изображения и другие параметры
  const params = {
    params: {
      key: '42088137-23c74c59277fc3ae3a179e24d',
      q,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15, // Установить количество изображений на странице
      page, // Использовать текущую страницу
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
  event.preventDefault(); // Перешкоджаємо стандартному поведінці форми
  loaderPlay(); // Показуємо завантажувач
  listEl.innerHTML = ''; // Очищаємо вміст елемента з класом .gallery
  currentPage = 1;
  searchQuery = event.currentTarget.elements.searchQuery.value.trim(); // Отримуємо пошуковий запит з форми
  if (!searchQuery) {
    iziToast.error({
      message: 'Please enter a valid search query',
    });
    return;
  }
  try {
    // Отримуємо зображення за допомогою функції getPhotos
    const {
      data: { hits, totalHits },
    } = await getPhotos(searchQuery);
    // Якщо зображення не знайдено, виводимо повідомлення про помилку
    if (hits.length === 0) {
      return iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    }
    // Створюємо HTML-розмітку на основі отриманих даних і відображаємо її
    listEl.innerHTML = createMarkup(hits);

    lightbox.refresh(); // Оновлюємо галерею зображень

    document.querySelector('.load-more').classList.remove('is-hidden');
    if (hits.length < totalHits) {
      // Показати кнопку "Завантажити ще"
      loadMoreEl.classList.remove('is-hidden');
    } else {
      // Приховати кнопку "Завантажити ще"
      loadMoreEl.classList.add('is-hidden');
      endOfSearchResults(totalHits);
    }
  } catch (error) {
    console.log(error); // У випадку помилки виводимо її в консоль
  } finally {
    loaderStop(); // Зупиняємо відображення завантажувача
  }
}
// Функция для создания HTML-разметки на основе массива данных
function createMarkup(arr) {
  if (arr.length === 0) {
    return 'No images found';
  }
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

function displayError(message) {
  iziToast.error({
    message: message,
  });
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
loadMoreEl.classList.add('load-more', 'is-hidden'); // Добавьте класс 'is-hidden' для скрытия кнопки
loadMoreEl.innerHTML = 'Load more';

loadMoreEl.addEventListener('click', async () => {
  currentPage++; // Збільшити поточну сторінку
  loaderPlay();
  try {
    const {
      data: { hits, totalHits },
    } = await getPhotos(searchQuery, currentPage);
    if (hits.length > 0) {
      listEl.insertAdjacentHTML('beforeend', createMarkup(hits));
      // Оновлюємо галерею зображень
      lightbox.refresh();
    }
    if (hits.length < totalHits) {
      loaderStop();
    } else {
      loaderStop();
      loadMoreEl.style.display = 'none';
      endOfSearchResults(totalHits);
    }
  } catch (error) {
    console.log(error);
    loaderStop();
  }
});
document.body.appendChild(loadMoreEl);

// Викликати цю функцію, коли користувач дійшов до кінця колекції
function endOfSearchResults(totalHits) {
  if (totalHits === 0) {
    iziToast.error({
      message: "We're sorry, but there are no search results.",
    });
  } else {
    iziToast.error({
      message: "We're sorry, but you've reached the end of search results.",
    });
    // Приховати кнопку "Load more"
    loadMoreEl.style.display = 'none';
    // document.getElementById('loadMoreEl').style.display = 'none';
  }
}
