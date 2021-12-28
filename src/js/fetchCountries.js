import refs from './ref';
import { updateListMarkup, updateCardMarkup } from './markup';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

function fetchCountries(searchQuery) {
  const url = `https://restcountries.com/v2/name/${searchQuery}`;
  return fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res.length > 10) {
        console.log(res.length);
        error({
          text: 'Too many matches found. Please enter specific query',
        });
      }

      if (res.length < 10 && res.length > 1) {
        updateListMarkup(res);
        refs.list.addEventListener('click', handlerListCountries);
      }

      if (res.length === 1) {
        updateCardMarkup(res);
      }
    });
}

export default fetchCountries;

function handlerListCountries(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'A') {
    return;
  }

  fetch(`https://restcountries.com/v2/name/${event.target.textContent}`)
    .then(res => res.json())
    .then(res => {
      refs.list.innerHTML = '';
      updateCardMarkup(res);
    });
}
