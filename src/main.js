// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

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

function getPhotos(q) {
  const BASE_URL = 'https://pixabay.com/api';
  const params = new URLSearchParams({
    key: '42088137-23c74c59277fc3ae3a179e24d',
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return fetch(`${BASE_URL}/?${params}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json('');
  });
}

function onSubmit(event) {
  event.preventDefault();
  loaderPlay();
  listEl.innerHTML = '';
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();

  getPhotos(searchQuery)
    .then(res => {
      console.log(res.hits);
      if (res.hits.length === 0) {
        return iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
        });
      }

      listEl.innerHTML = createMarkup(res.hits);
      lightbox.refresh();
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
      loaderStop();
    });
}

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

function loaderPlay() {
  loaderEl.classList.remove('is-hidden');
}
function loaderStop() {
  loaderEl.classList.add('is-hidden');
}
