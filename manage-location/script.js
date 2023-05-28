const inputCity = window.document.querySelector("#search-city");
const listCities = window.document.querySelector("#list-cities");

tradeProprietary();
loadCities();

inputCity.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita o comportamento padrão da tecla "Enter"
        const inputValue = event.target.value.toLocaleLowerCase();

        if (inputValue === "") return

        window.location.href = "/home/?city=" + inputValue; // Redirecionamento

    }
});

function tradeProprietary() {
    if (listCities.childElementCount >= 5) {
        listCities.style.height = "100%";
    }
}

function createElementWeatherCity(dataCity) {
    const li = window.document.createElement("li");
    const div1 = window.document.createElement("div");
    const div2 = window.document.createElement("div");
    const h2 = window.document.createElement("h2");
    const p1 = window.document.createElement("p");
    const p2 = window.document.createElement("p");
    const i = window.document.createElement("i");

    h2.innerText = dataCity.city_name;
    p1.innerText = `${dataCity.forecast[1].min}°/${dataCity.forecast[1].max}°`;
    p2.innerText = dataCity.forecast[1].description;
    i.classList.add("icon-cloud");

    div1.appendChild(h2);
    div1.appendChild(p1);
    div2.appendChild(i);
    div2.appendChild(p2);
    li.appendChild(div1);
    li.appendChild(div2);

    return li;
}

function loadCities() {
    const localCities = JSON.parse(localStorage.getItem("cities")) || [];

    localCities.forEach(city => {
        const li = createElementWeatherCity(city);
        listCities.appendChild(li);
    });
}