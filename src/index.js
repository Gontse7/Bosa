function updateWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let weatherDescriptionElement = document.querySelector("#weather-description");
    let humidityElement = document.querySelector("#Humidity");
    let speedElement = document.querySelector("#speed");  
    let timeElement = document.querySelector("#time");
    let date =  new Date(response.data.time * 1000); 

    console.log(response.data);

cityElement.innerHTML = response.data.city;
timeElement.innerHTML = formatDate(date);
weatherDescriptionElement.innerHTML = `${response.data.condition.description}`
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
speedElement.innerHTML = `${response.data.wind.speed}km/h`;
temperatureElement.innerHTML = Math.round(temperature);
    
}

function formatDate(date) {

let minutes = date.getMinutes();
let hours = date.getHours();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];

if (minutes < 10) {
   minutes = `0${minutes}`; 
}
return `${day} ${hours}:${minutes}`;
}



function searchCity(city) {
    let apiKey = "0t043164f467od1445504fadcb9bc012";
    let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiURL).then(updateWeather);
}


function handleSearchSubmit(event) {
   event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
  
    
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Gaborone");