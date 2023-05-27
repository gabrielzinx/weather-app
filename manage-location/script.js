const inputCity = window.document.querySelector("#search_city");

inputCity.addEventListener("keydown", (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Evita o comportamento padrão da tecla "Enter"
        const inputValue = event.target.value;

        window.location.href = "/home/?city=" + inputValue; // Redirecionamento

    }
});
