function handleSearchsubmit(event){
    event.preventDefault();
    let searchformInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    cityElement.textContent = searchformInput.value;
}

let searchformElement = document.querySelector("#search-form");
searchformElement.addEventListener("submit", handleSearchsubmit);