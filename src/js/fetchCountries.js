export default class FetchRestCountries {
  constructor() {
    this.countryName = '';
  }
  fetchCountries() {
    const URL = `https://restcountries.com/v3.1/name/${this.countryName}?fields=name,capital,population,flags,languages`;

    return fetch(URL)
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            return [];
          }
          throw new Error(response.status);
        }
        return response.json();
      })
      .catch(error => {
        console.error(error);
      });
  }

  getCountry() {
    return this.countryName;
  }

  setCountry(newCountryName) {
    this.countryName = newCountryName;
  }
}
