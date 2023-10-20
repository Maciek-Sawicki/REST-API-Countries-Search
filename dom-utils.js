const createInfoElement = (labelName, value) => {
    const infoElement = document.createElement("div");
    const labelElement = document.createElement("strong");
    labelElement.innerText = `${labelName}: `;
    const valueElement = document.createElement("span");
    valueElement.innerText = value;

    infoElement.appendChild(labelElement);
    infoElement.appendChild(valueElement);
    return infoElement
}

const createFlagImgElement = (country) => {
    const imgContainerElement = document.createElement("div");
    const imgElement = document.createElement("img");
    imgElement.src = country.flagUrl;
    imgElement.alt = `${country.name} flag`;

    imgContainerElement.appendChild(imgElement);

    return imgContainerElement;
}


const createCountryItemElement = (country) => {
    const countryElement = document.createElement("li");

    const anchorElement = document.createElement("a");
    anchorElement.href = `?country=${country.code}`

    countryElement.appendChild(createFlagImgElement(country))

    const infoContainerElement = document.createElement("div");
    infoContainerElement.classList.add("info-container");
    const countryNameElement = document.createElement("strong");
    countryNameElement.innerText = country.name;
    countryNameElement.classList.add("country-name");

    infoContainerElement.appendChild(countryNameElement)
    infoContainerElement.appendChild(createInfoElement("Population", country.population));
    infoContainerElement.appendChild(createInfoElement("Region", country.region));
    infoContainerElement.appendChild(createInfoElement("Capital", country.capital));

    anchorElement.appendChild(infoContainerElement);
    countryElement.appendChild(anchorElement);


    return countryElement;
}


const createListElement = (countries) => {
    const listElement = document.createElement("ul");
    countries.forEach(country => {
        listElement.appendChild(createCountryItemElement(country))
    });

    return listElement;
}

const createDetailElement = (country) => {
    const detailContainerElement = document.createElement("div");

    const flagImgElement = createFlagImgElement(country);
    const detailContentElement = document.createElement("div");
    detailContainerElement.classList.add("detail-container");
    const detailNameElement = document.createElement('strong');
    detailNameElement.innerText = country.name;
    detailNameElement.classList.add("detail-name");

    detailContainerElement.appendChild(flagImgElement);
    detailContentElement.appendChild(detailNameElement);
    detailContentElement.classList.add("content-element");

    detailContentElement.appendChild(
        createInfoElement("Native name", country.nativeName)
    );

    detailContentElement.appendChild(
        createInfoElement("Population", country.population)
    );

    detailContentElement.appendChild(
        createInfoElement("Region", country.region)
    );

    detailContentElement.appendChild(
        createInfoElement("Sub region", country.subregion)
    );

    detailContentElement.appendChild(
        createInfoElement("Capital", country.capital)
    );

    detailContentElement.appendChild(
        createInfoElement("Top level Domain", country.tld)
    );

    detailContentElement.appendChild(
        createInfoElement("Currencies", country.currencies)
    );

    detailContentElement.appendChild(
        createInfoElement("Languages", country.languages)
    );

    if (country.borders && country.borders.length > 0) {
        detailContentElement.appendChild(createBorderCountriesContainer(country));
    }
    detailContainerElement.appendChild(detailContentElement);


    return detailContainerElement;

};

const createDetailButton = (text, link) => {
    const anchorElement = document.createElement("a");
    anchorElement.innerText = text;
    anchorElement.classList.add("detail-button");
    anchorElement.href = link;

    return anchorElement;
}

const createBorderCountriesContainer = (country) => {
    console.log(country);
    const borderCountriesContainerElement = document.createElement("div");
    borderCountriesContainerElement.classList.add("border-container");
    const borderCountriesContainer = document.createElement("div");

    const labelElement = document.createElement("strong");
    labelElement.innerText = "Border Countries:";

    borderCountriesContainerElement.appendChild(labelElement);
    borderCountriesContainerElement.appendChild(borderCountriesContainer);

    country.borders.forEach((border) => {
        borderCountriesContainer.appendChild(
            createDetailButton(border, `/?country=${border}`)
        );
    });

    return borderCountriesContainerElement;
};

export const renderCountriesList = (countries) => {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = "";
    rootElement.appendChild(createListElement(countries));
}

export const renderCountriesDetails = (country) => {
    const rootElement = document.querySelector("#root");
    rootElement.innerHTML = "";
    rootElement.appendChild(createDetailButton("Go Back", "/"));
    rootElement.appendChild(createDetailElement(country));

};