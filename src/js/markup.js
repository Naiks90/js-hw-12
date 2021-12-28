import listTpl from '../templates/gallery-items.hbs';
import countryCard from '../templates/country-card.hbs';
import refs from '../js/ref';

function updateListMarkup(countries) {
  const markup = listTpl(countries);
  refs.list.insertAdjacentHTML('beforeend', markup);
}
function updateCardMarkup(country) {
  const markup = countryCard(country);
  refs.list.insertAdjacentHTML('beforeend', markup);
}

export { updateListMarkup, updateCardMarkup };
