// function to change the h2 to the inputted city
function changeCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#input-city");
  let h2 = document.querySelector("h2");
  if (searchCity.value) {
    h2.innerHTML = `${searchCity.value}`;
  }
}

let searchCity = document.querySelector("#form-submit");
searchCity.addEventListener("submit", changeCity);

// function to format the date

function formatDate(timestamp) {
  let current = new Date(timestamp);
  let date = current.getDate();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[current.getDay()];
  let hours = current.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = current.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let h1 = document.querySelector("#date-time");
  return (h1.innerHTML = `${day} ${date} ${hours}:${minutes}`);
}

// let realDate = new Date();
// formatDate(realDate);

// Function for real time data from API
function getWeather(response) {
  console.log(response);
  let tempDegree = document.querySelector("#degrees");
  let searchCity = document.querySelector("h2");
  let wind = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let description = document.querySelector("#description");
  let dateTime = document.querySelector("#date-time");
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  celsiusTemp = response.data.temperature.current;

  tempDegree.innerHTML = Math.round(celsiusTemp);

  searchCity.innerHTML = response.data.city;

  wind.innerHTML = Math.round(response.data.wind.speed);

  humidity.innerHTML = response.data.temperature.humidity;

  description.innerHTML = response.data.condition.description;

  dateTime.innerHTML = formatDate(response.data.time * 1000);
}

function search(city) {
  let apiKey = "be923c79304a1acdofa6t0cb040e4779";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=be923c79304a1acdofa6t0cb040e4779&units=metric`;

  axios.get(apiUrl).then(getWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputSearch = document.querySelector("#input-city");
  search(cityInputSearch.value);
}

let celsiusTemp = null;

let form = document.querySelector("#form-submit");
form.addEventListener("submit", handleSubmit);

// Function for user to select fahrenheit
function changeDegreeUnitToFahrenheit(event) {
  event.preventDefault();
  let degreeUnit = document.querySelector("#degrees");
  let fahrenheitDegree = (celsiusTemp * 9) / 5 + 32;
  degreeUnit.innerHTML = Math.round(fahrenheitDegree);
}
let fahrenheitClick = document.querySelector("#fahrenheit");
fahrenheitClick.addEventListener("click", changeDegreeUnitToFahrenheit);

function changeDegreeUnitToCelsius(event) {
  event.preventDefault();
  let degreeUnit = document.querySelector("#degrees");
  degreeUnit.innerHTML = Math.round(celsiusTemp);
}

let celsiusClick = document.querySelector("#celsius");
celsiusClick.addEventListener("click", changeDegreeUnitToCelsius);

search("Athens");
