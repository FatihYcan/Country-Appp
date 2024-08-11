const searchInput = document.querySelector("#search");
const searchDiv = document.querySelector("#searchDiv");
const countries = document.querySelector(".countries");

let newData = [];

const getCountry = async (name = "") => {
  const BASE_URL = name
    ? `https://restcountries.com/v3.1/name/${name}`
    : "https://restcountries.com/v3.1/all";
  try {
    const res = await fetch(`${BASE_URL}`);
    if (!res.ok) {
      throw new Error(`Something went wrong:${res.status}`);
    }
    const data = await res.json();
    newData = data;
    if (name) {
      renderCountry(data);
    } else {
      const turkey = data.find(
        (country) => Object.values(country.name)[0] === "Turkey"
      );
      if (turkey) {
        renderCountry([turkey]);
      }
    }
  } catch (error) {
    countries.innerHTML = `<img src="./img/404.png" alt="" />`;
  }
};

window.addEventListener("load", () => {
  getCountry();
});

const renderCountry = (data) => {
  data.forEach((i) => {
    const {
      flags,
      name,
      region,
      capital,
      languages,
      currencies,
      population,
      borders,
      maps,
    } = i;

    const newFlags = Object.values(flags)[0];

    document.querySelector(".shadow").src = `${newFlags}`;

    const newName = Object.values(name)[0];

    document.querySelector(".text-center").textContent = `${newName}`;

    document.querySelector(
      ".fa-earth-oceania"
    ).parentElement.lastChild.textContent = ` ${region}`;

    if (capital) {
      if (capital.length > 1) {
        const newCapital = capital.join(", ");
        document.querySelector(
          ".fa-landmark"
        ).parentElement.lastChild.textContent = ` ${newCapital} `;
      } else if (capital.length === 1) {
        document.querySelector(
          ".fa-landmark"
        ).parentElement.lastChild.textContent = ` ${capital} `;
      }
    } else {
      document.querySelector(
        ".fa-landmark"
      ).parentElement.lastChild.textContent = ` None`;
    }

    if (languages) {
      const newLanguages = Object.values(languages);
      if (newLanguages.length > 1) {
        const latestLanguages = newLanguages.join(", ");
        document.querySelector(
          ".fa-comments"
        ).parentElement.lastChild.textContent = ` ${latestLanguages} `;
      } else if (newLanguages.length === 1) {
        document.querySelector(
          ".fa-comments"
        ).parentElement.lastChild.textContent = ` ${newLanguages} `;
      }
    } else {
      document.querySelector(
        ".fa-comments"
      ).parentElement.lastChild.textContent = ` None`;
    }

    if (currencies) {
      const newCurrencies = Object.values(Object.values(currencies)[0]).join(
        ", "
      );
      document.querySelector(
        ".fa-money-bill-wave"
      ).parentElement.lastChild.textContent = ` ${newCurrencies}`;
    } else {
      document.querySelector(
        ".fa-money-bill-wave"
      ).parentElement.lastChild.textContent = ` None`;
    }

    const newPopulation = population.toLocaleString();

    document.querySelector(
      ".fa-people-group"
    ).parentElement.lastChild.textContent = ` ${newPopulation}`;

    if (borders) {
      if (borders.length > 1) {
        const newBorders = borders.join(", ");
        document.querySelector(
          ".fa-road-barrier"
        ).parentElement.lastChild.textContent = ` ${newBorders} `;
      } else if (borders.length === 1) {
        document.querySelector(
          ".fa-road-barrier"
        ).parentElement.lastChild.textContent = ` ${borders} `;
      }
    } else {
      document.querySelector(
        ".fa-road-barrier"
      ).parentElement.lastChild.textContent = ` None`;
    }

    const newMaps = Object.values(maps)[0];

    document.querySelector(
      ".fa-map-location-dot"
    ).parentElement.lastElementChild.href = ` ${newMaps}`;
  });
};

searchInput.addEventListener("input", (e) => {
  searchDiv.innerHTML = "";
  newData
    .filter((i) =>
      Object.values(i.name)[0]
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    )
    .forEach((i) => {
      if (e.target.value) {
        searchDiv.innerHTML += `<span class="list m-1 p-1 bg-white border rounded">${
          Object.values(i.name)[0]
        }</span>`;
      } else {
        searchDiv.innerHTML = "";
      }
    });
});

searchDiv.addEventListener("click", async (e) => {
  const countryName = e.target.textContent;
  if (countryName) {
    await getCountry();
    const filteredCountry = newData.find(
      (i) =>
        Object.values(i.name)[0].toLowerCase() === countryName.toLowerCase()
    );
    if (filteredCountry) {
      renderCountry([filteredCountry]);
    }
  }
  searchInput.value = countryName;
  searchDiv.innerHTML = "";
});
