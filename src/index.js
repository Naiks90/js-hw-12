import debounce from 'lodash.debounce';
import './sass/main.scss';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import listTpl from './templates/gallery-items.hbs';
import countryCard from './templates/country-card.hbs';
// import '@pnotify/confirm/dist/PNotifyConfirm.css';

const formRef = document.querySelector('.js-search-form');
const listRef = document.querySelector('.js-list');

formRef.addEventListener('input', debounce(inoutHandler, 500));

function inoutHandler(event) {
  const inputValue = event.target.value;

  listRef.innerHTML = '';

  fetch(`https://restcountries.com/v2/name/${inputValue}`)
    .then(res => res.json())
    .then(res => {
      if (res.length > 10) {
        console.log(res.length);
        error({
          text: 'Too many matches found. Please enter specific query',
        });
      }
      if (res.length < 10 && res.length > 1) {
        const markup = listTpl(res);
        listRef.insertAdjacentHTML('beforeend', markup);
        listRef.addEventListener('click', event => {
          event.preventDefault();
          if (event.target.nodeName !== 'A') {
            return;
          }

          fetch(`https://restcountries.com/v2/name/${event.target.textContent}`)
            .then(res => res.json())
            .then(res => {
              listRef.innerHTML = '';
              const markup = countryCard(res);
              listRef.insertAdjacentHTML('beforeend', markup);
            });
        });
      }
      if (res.length === 1) {
        const markup = countryCard(res);
        listRef.insertAdjacentHTML('beforeend', markup);
      }
    });
}
