console.log("script.js loaded");

const temp = document.getElementById("temp"),
  date = document.getElementById("date-time"),
  currentLocation = document.getElementById("location"),
  condition = document.getElementById("condition"),
  rain = document.getElementById("rain"),
  mainIcon = document.getElementById("icon"),
  uvIndex = document.querySelector(".uv-index"),
  uvText = document.querySelector(".uv-text"),
  windSpeed = document.querySelector(".wind-speed"),
  sunRise = document.querySelector(".sun-rise"),
  sunSet = document.querySelector(".sun-set"),
  humidity = document.querySelector(".humidity"),
  visibility = document.querySelector(".visibility"),
  humidityStatus = document.querySelector(".humidity-status"),
  airQuality = document.querySelector(".air-quality"),
  airQualityStatus = document.querySelector(".air-quality-status"),
  visibilityStatus = document.querySelector(".visibility-status"),
  weatherCards = document.querySelector("#weather-cards"),
  celciusBtn = document.querySelector(".celcius"),
  fahrenheitBtn = document.querySelector(".fahrenheit"),
  hourlyBtn = document.querySelector(".hourly"),
  weekBtn = document.querySelector(".week"),
  tempUnit = document.querySelectorAll(".temp-unit"),
  searchForm = document.querySelector("#search"),
  search = document.querySelector("#query");

let currentCity = "";
let currentUnit = "c";
let hourlyorWeek = "Week";


//Update Date Time

function getDateTime() {
    let now = new Date(),
      hour = now.getHours(),
      minute = now.getMinutes();
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    hour = hour % 12;
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
  
    let dayString = days[now.getDay()];
    return `${dayString}, ${hour}:${minute}`;
  }

  
  date.innerText = getDateTime();


  //update time every second
setInterval(() => {
    date.innerText = getDateTime();
  }, 1000);


  //function to get current geolocation with IP address
function getPublicIp() {
    fetch("https://geolocation-db.com/json/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        currentCity = data.city;
        getWeatherData(currentCity, currentUnit, hourlyorWeek);
      });
  }
  getPublicIp();



  //function to get weather data

function getWeatherData(city, unit, hourlyorWeek) {
    console.log(city);
    const apiKey = "DPAF5QR2GDCT64ZZ9SRG34N8F";
    fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        let today = data.currentConditions;
        if (unit === "c") {
          temp.innerText = today.temp;
        } else {
          temp.innerText = celciusToFahrenheit(today.temp);
        }
        currentLocation.innerText = data.resolvedAddress;
        condition.innerText = today.conditions;
      })
      .catch((err) => {
        console.log(err);
        alert("City not found in our database");
      });
  }


//convert celcius to fahrenheit
function celciusToFahrenheit(temp) {
    return ((temp * 9) / 5 + 32).toFixed(1);
  }
  