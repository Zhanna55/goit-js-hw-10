import './css/styles.css';
import FetchRestCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

refs = {
  searchInput: document.querySelector('#search-box'),
  countrylist: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const fetchRestCountries = new FetchRestCountries();
refs.searchInput.addEventListener(
  'input',
  debounce(getCountries, DEBOUNCE_DELAY)
);

function getCountries(e) {
  e.preventDefault();
  clearHTML();
  fetchRestCountries.countryName = e.target.value.trim();
  if (fetchRestCountries.countryName !== '') {
    fetchRestCountries.fetchCountries().then(dataCountries => {
      if (dataCountries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (dataCountries.length >= 2 && dataCountries.length <= 10) {
        fetchRestCountries.fetchCountries().then(renderCountryList);
      } else if (dataCountries.length === 1) {
        fetchRestCountries.fetchCountries().then(renderOneCountry);
      } else if (dataCountries.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
  }
}

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width = "30" height = "20">
         <p>${country.name.official}</p>
                </li>`;
    })
    .join('');
  refs.countrylist.insertAdjacentHTML('beforeend', markup);
}
function renderOneCountry(countries) {
  const markup = countries
    .map(country => {
      return `<p>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" height="20">
         <span>${country.name.official}</span></p>
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Languages: ${Object.values(country.languages).join(', ')} </p>
            `;
    })
    .join('');
  refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}
function clearHTML() {
  refs.countrylist.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
