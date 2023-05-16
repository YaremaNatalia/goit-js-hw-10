import Notiflix from 'notiflix';
import refs from './references';

function onInfo() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
  onClearCountryList();
  onClearCountryInfo();
}

function onError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
  onClearCountryList();
  onClearCountryInfo();
}

function onClearCountryList() {
  if (refs.countryList) {
    refs.countryList.innerHTML = '';
  }
}
function onClearCountryInfo() {
  if (refs.countryInfo) {
    refs.countryInfo.innerHTML = '';
  }
}

function renderCountryList(countries) {
  const countryListMarkup = countries.reduce(
    (markup, { flags, name }) =>
      markup +
      `<li class="country-list-item">
        <img
          class="country-list-flag"
          src="${flags.svg}"
          alt="${name.official} flag" width="100" 
        />
        <p class="country-list-name">${name.official}</p>
      </li>`,
    ''
  );
  refs.countryList.innerHTML = countryListMarkup;
}
//проходимось по масиву обєктів (країн) створюючи верстку і додаючи на сторінку. Використоуємо деструктиризацію для використання необхідних параметрів
function renderCountryInfo(countries) {
  const countryInfoMarkup = countries.reduce(
    (markup, { flags, name, capital, population, languages }) => {
      const languagesList = Object.values(languages).join(', '); // преобразования объекта языков languages в массив значений с помощью метода Object.values() (возвращает только значения, без ключей), а затем объединяет элементы этого массива в одну строку с помощью метода join(','), где запятая указывает разделитель между языками. В итоге получается строка, содержащая перечисление всех языков страны, разделенных запятой.
      return (
        markup +
        `
      <div class="country-info-head">
        <img class ="country-info-flag" src="${flags.svg}" alt="${name.official} flag" width="100">
        <h2 class="country-info-name">${name.official}</h2>
      </div>
      <div class="country-info-details">
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Languages:</strong> ${languagesList}</p>
      </div>
    `
      );
    },
    ''
  );

  refs.countryInfo.innerHTML = countryInfoMarkup;
}
//! фнткція прописана через map join
// function renderCountryInfo(countries) {
//   const countryInfoMarkup = countries
//     .map(({ flags, name, capital, population, languages }) => {
//       const languagesList = Object.values(languages).join(', ');
//      return  `
//     <div class="country-info-head">
//       <img class ="country-info-flag" src="${flags.svg}" alt="${name.official} flag" width="100">
//       <h2 class="country-info-name">${name.official}</h2>
//     </div>
//     <div class="country-info-details">
//       <p><strong>Capital:</strong> ${capital}</p>
//       <p><strong>Population:</strong> ${population}</p>
//       <p><strong>Languages:</strong> ${languagesList}</p>
//     </div>
//   `;
//     })
//     .join('');

//     refs.countryInfo.innerHTML = countryInfoMarkup;
// }

export {
  onInfo,
  onError,
  onClearCountryList,
  onClearCountryInfo,
  renderCountryList,
  renderCountryInfo,
};
