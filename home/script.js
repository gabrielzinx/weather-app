const cityTitle = window.document.querySelector("h1.city-title");
const dataText = window.document.querySelector(".data");
const termTitle = window.document.querySelector(".term");
const previousText = window.document.querySelector(".previous");
const windText = window.document.querySelector(".wind-text");
const prevText = window.document.querySelector(".prev-text");
const pressureText = window.document.querySelector(".pressure-text");
const humidityText = window.document.querySelector(".humidity-text");

const URL_API = "https://weather-app-gab-and-gui.vercel.app/api/";

const date = new Date();

const dateWeekday = date.toLocaleDateString(undefined, { weekday: 'long' });
const dateMonth = date.toLocaleDateString(undefined, { month: 'long' });
const dateDay = date.toLocaleDateString(undefined, { day: 'numeric' });

async function main() {
    const data = await getDataFromCity();

    cityTitle.innerText = data.city_name;
    dataText.innerText = `${dateWeekday} | ${dateMonth} ${dateDay}`;
    termTitle.innerText = `${data.temp}°`;
    previousText.innerText = `${data.description}`;
    windText.innerText = `${data.wind_speedy}`;
    prevText.innerText = `${data.forecast[1].rain_probability}%`;
    pressureText.innerText = `${data.forecast[1].max}°`;
    humidityText.innerText = `${data.humidity}%`;
}

function getCityFromURL() {

    const urlParams = new URLSearchParams(window.location.search);
    const city = urlParams.get('city');

    return city;
}

async function getDataFromCity() {

    const city = getCityFromURL();
    const response = await fetch(URL_API + "?city=" + city);
    const data = await response.json();

    return data.results;
}

main();