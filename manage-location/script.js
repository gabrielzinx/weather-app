const inputCity = window.document.querySelector("#search-city");
const listCities = window.document.querySelector("#list-cities");
const itensCities = listCities.getElementsByTagName('li');

loadCities();
tradeProprietary();

inputCity.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita o comportamento padrão da tecla "Enter"
        const inputValue = event.target.value.toLocaleLowerCase();

        if (inputValue === "") return

        window.location.href = "/home/?city=" + inputValue; // Redirecionamento

    }
});

function tradeProprietary() {
    if (listCities.childElementCount >= 4) {
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

function fim(elemento) {
    console.log('Item ultrapassou 200px para a esquerda:', elemento.textContent);
}

for (let i = 0; i < itensCities.length; i++) {
    const item = itensCities[i];
    let startX = 0;
    let deltaX = 0;

    item.addEventListener('mousedown', function (event) {
        startX = event.clientX;
        item.style.transition = 'all 0s';
        item.style.cursor = "grabbing";
        window.document.addEventListener('mousemove', handleMouseMove);
    });

    item.addEventListener('touchstart', function (event) {
        startX = event.touches[0].clientX;
        item.style.transition = 'all 0s';
    });

    function handleMouseMove(event) {
        deltaX = event.clientX - startX;
        item.style.transform = `translateX(${deltaX > 200 ? 200 : deltaX < -200 ? -200 : deltaX}px)`;
    }

    function resetItem() {
        item.style.cursor = "grab";
        item.style.transform = 'none';
        item.style.transition = 'all 0.8s ease-in-out';
        item.style.transform = `translateX(${0}px)`;
        window.document.removeEventListener('mousemove', handleMouseMove);
    }

    item.addEventListener('touchmove', function (event) {
        const touch = event.touches[0];
        deltaX = touch.clientX - startX;
        item.style.transform = `translateX(${deltaX > 200 ? 200 : deltaX < -200 ? -200 : deltaX}px)`;
    });

    item.addEventListener('mouseup', resetItem);
    item.addEventListener('mouseleave', resetItem);
    item.addEventListener('touchend', resetItem);
    item.addEventListener('touchcancel', resetItem);
}
