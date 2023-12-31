import {
    renderCountriesList,
} from "./dom-utils.js";

export const renderDashboard = () => {
    const API_URL_ALL = "https://restcountries.com/v3.1/all";

    let countries;
    let query = "";
    let region = "";

    fetch(API_URL_ALL)
        .then(response => response.json())
        .then((countriesRaw) => {
            console.log(countriesRaw);
            countries = countriesRaw.map((country) => {
                return {
                    capital: country.capital && country.capital[0],
                    population: country.population.toLocaleString(),
                    name: country.name.common,
                    code: country.ccn3,
                    region: country.region,
                    flagUrl: country.flags.png,
                };
            });
            renderCountriesList(countries);
        });

    const filterDataAndRednerCountriesList = () => {
        const filteredCountries = countries.filter(country => {
            return (
                country.name.toLowerCase().includes(query) &&
                (!region || country.region === region)
            );
        });

        renderCountriesList(filteredCountries);
    }

    document.querySelector("#query").addEventListener("input", (e) => {
        query = e.target.value.toLowerCase().trim();
        filterDataAndRednerCountriesList();
    });

    document.querySelector("#region").addEventListener("change", (e) => {
        region = e.target.value;
        filterDataAndRednerCountriesList();
    });
}