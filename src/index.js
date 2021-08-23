function formatDate() {
  let now = new Date();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#city-date");
dateElement.innerHTML = formatDate();

//
function displayCurrentCity(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#city-temp").innerHTML = `${Math.round(
    response.data.main.temp
  )} °C`;

  document.querySelector(
    "#city-humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector("#city-wind").innerHTML = `Windspeed: ${Math.round(
    response.data.wind.speed
  )}`;
  document.querySelector(
    "#city-description"
  ).innerHTML = `Condition: ${response.data.weather[0].description}`;
}

function searchCity(city) {
  let apikey = "5efeb759a9a2d75776085db8550371e8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentCity);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5efeb759a9a2d75776085db8550371e8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentCity);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let button = document.querySelector("#search-city-button");
button.addEventListener("click", showCity);

let currentLocationButton = document.querySelector("#current-city-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Dublin");
