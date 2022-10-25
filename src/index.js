let h1 = document.querySelector("#date-time");
let current = new Date();
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

h1.innerHTML = `${day} ${date} ${hours}:${minutes}`;

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

let degreeUnit = document.querySelector("#degrees");

function changeDegreeUnitToCelsius() {
  let celsiusUnit = document.querySelector("#celsius");
  if (celsiusUnit) {
    degreeUnit.innerHTML = 15;
  }
}
let celsiusClick = document.querySelector("#celsius");
celsiusClick.addEventListener("click", changeDegreeUnitToCelsius);

function changeDegreeUnitToFahrenheit() {
  let city = document.querySelector("h2");
  let fahrenheitUnit = document.querySelector("#fahrenheit");
  if (fahrenheitUnit) {
    degreeUnit.innerHTML = response.data.temperature.humidity;
  }
}
let fahrenheitClick = document.querySelector("#fahrenheit");
fahrenheitClick.addEventListener("click", changeDegreeUnitToFahrenheit);

function getWeather(response) {
  console.log(response);
  let tempDegree = document.querySelector("#degrees");
  tempDegree.innerHTML = Math.round(response.data.temperature.current);
  let searchCity = document.querySelector("h2");
  searchCity.innerHTML = response.data.city;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
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

let form = document.querySelector("#form-submit");
form.addEventListener("submit", handleSubmit);

search("Ohrid");
