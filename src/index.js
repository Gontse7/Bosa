function updateWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let weatherDescriptionElement = document.querySelector("#weather-description");
    let humidityElement = document.querySelector("#Humidity");
    let speedElement = document.querySelector("#speed");  
    let timeElement = document.querySelector("#time");
    let date =  new Date(response.data.time * 1000); 
    let weatherIconElement = document.querySelector("#weather-icon");

    console.log(response.data);

cityElement.innerHTML = response.data.city;
weatherIconElement.innerHTML = 
  `<img
    src="${response.data.condition.icon_url}"
    class="weather-app-icon"
  />`;
timeElement.innerHTML = formatDate(date);
weatherDescriptionElement.innerHTML = `${response.data.condition.description}`
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
speedElement.innerHTML = `${response.data.wind.speed}km/h`;
temperatureElement.innerHTML = Math.round(temperature);

displayforecast(response.data.city);
    
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu","Fri", "Sat"];

  return days[date.getDay()];
}

function displayforecast(city) {
 let apiKey = "0t043164f467od1445504fadcb9bc012";
 let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
 axios(apiURL).then(displayForecast);
}

function displayForecast(response) {
 console.log(response.data);

let forecastHtml = "";
response.data.daily.forEach(function (day, index) {
  if (index < 5) {
 forecastHtml =
   forecastHtml +
   `<div class="waether-forecast-day">
  <div class="weather-forecast-date">${formatDay(day.time)}</div>
  <div class="weather-forecast-icon"><img src ="${day.condition.icon_url}" class="weather-forecast-icon"/></div>
  <div class="weather-forecast-temps">
    <div class="weather-forecast-temp"><strong>${Math.round(
      day.temperature.maximum
    )}°C</strong>
    </div>
    <div class="weather-forecast-temp">${Math.round(
      day.temperature.minimum
    )}°C</div>
  </div>
</div>
`; 
  }
});
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Gaborone");

    