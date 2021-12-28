import debounce from 'lodash.debounce';
import refs from './js/ref';
import fetchCountries from './js/fetchCountries';
import './sass/main.scss';

refs.form.addEventListener('input', debounce(inoutHandler, 500));

function inoutHandler(event) {
  const inputValue = event.target.value;

  refs.list.innerHTML = '';

  fetchCountries(inputValue);
}
