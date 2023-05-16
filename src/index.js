import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import refs from './references';

import API from './api';
import {
  onInfo,
  onError,
  onClearCountryList,
  onClearCountryInfo,
  renderCountryList,
  renderCountryInfo,
} from './functions';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onTextAreaInput, DEBOUNCE_DELAY));

function onTextAreaInput(event) {
  const inputValue = event.target.value.trim(); // введення змінної для відображення значення інпуту, і використання методу трім для очещення зайвих пробілів
  if (inputValue === '') {
    onClearCountryList();
    onClearCountryInfo();
    return;
  }
  API.fetchCountries(inputValue)
    .then(countries => {
      if (countries.length > 10) {
        onInfo();
      }
      return countries;
    })
    .then(countries => {
      if (countries.length < 10 && countries.length > 1) {
        onClearCountryInfo();
        onClearCountryList();
        renderCountryList(countries);
      }
      return countries;
    })
    .then(countries => {
      if (countries.length === 1) {
        onClearCountryList();
        renderCountryInfo(countries);
      }
      return countries;
    })
    .then(countries => {
      if (countries.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      return countries;
    })
    .catch(onError);
}
