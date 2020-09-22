import { API_KEY } from './api.js';
const apiUrlToday = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`;
const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${API_KEY}`;
//const header = document.getElementById('header');
const mainContainer = document.getElementById('mainContainer');
let forecastContainer = document.getElementById('forecastContainer');

fetch(apiUrlToday)
  .then((response) => {
    return response.json();
  })
  .then((weatherArray) => {
    generateHTMLForWeather(weatherArray);
  });

fetch(apiUrlForecast)
  .then((response) => {
    return response.json();
  })
  .then((forecastArray) => {
    forecastArray = filterForecast(forecastArray);
    forecastArray.forEach((forecast) => {
      forecastContainer.innerHTML += generateHTMLForForecast(forecast);
    });
  });

const generateHTMLForWeather = (weatherArray) => {
  console.log(weatherArray);
  let weatherTodayHTML = '';
  weatherTodayHTML += `<section class="today-wrapper">`;
  weatherTodayHTML += `<div class="today-info-wrapper">`;
  weatherTodayHTML += `<h1 class="today-header">${temperatureInteger(
    weatherArray.main.temp
  )}&#176</h1>`;
  weatherTodayHTML += `<h2>${weatherArray.name}</h2>`;
  weatherTodayHTML += `<h3>${weatherArray.weather[0].main}</h3>`;
  weatherTodayHTML += `</div>`;
  weatherTodayHTML += `<div class="today-icon-container">`;
  weatherTodayHTML += `<img src=http://openweathermap.org/img/wn/${weatherArray.weather[0].icon}@2x.png>`;
  weatherTodayHTML += `</div>`;
  weatherTodayHTML += `</section>`;
  weatherTodayHTML += `<section class="sun-wrapper">`;

  weatherTodayHTML += `<h3>Sunrise ${setSunTime(
    weatherArray.sys.sunrise
  )}</h3>`;
  weatherTodayHTML += `<h3>Sunset ${setSunTime(weatherArray.sys.sunset)}</h3>`;
  weatherTodayHTML += `</section>`;
  console.log(weatherTodayHTML);
  mainContainer.innerHTML = weatherTodayHTML;
  return weatherTodayHTML;
};

const generateHTMLForForecast = (forecast) => {
  let forecastHTML = '';
  forecastHTML += `<section class="weather-forecast">`;
  forecastHTML += `<div class="day-wrapper">`;
  forecastHTML += `<p> ${setDayDate(forecast.dt).forecastDayString}</p>`;
  forecastHTML += `<p> ${setDayDate(forecast.dt).forecastDateString}</p>`;
  forecastHTML += `</div>`;
  forecastHTML += ` <img class="icon"src=http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png>`;
  forecastHTML += ` <p>${temperatureRounded(
    forecast.main.temp
  )}&#176 / ${temperatureRounded(forecast.main.feels_like)}&#176</p>`;
  forecastHTML += `</section>`;
  return forecastHTML;
};

const temperatureRounded = (temperature) => {
  return Math.round(temperature * 10) / 10;
};

const temperatureInteger = (temperature) => {
  return Math.round(temperature);
};

const setSunTime = (time) => {
  const sunTime = new Date(time * 1000);
  console.log(sunTime);
  const sunTimeString = sunTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return sunTimeString;
};

const setDayDate = (date) => {
  const forecastDate = new Date(date * 1000);
  console.log(forecastDate);
  const forecastDayString = forecastDate.toLocaleDateString('en-US', {
    weekday: 'short',
  });
  const forecastDateString = forecastDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  return {
    forecastDayString,
    forecastDateString,
  };
};

// const formateDateAndTime = (date) => {
//   const dateObject = new Date(date * 1000);
//   const formatDate = dateObject.toLocaleString([], {
//     month: 'short',
//     day: 'numeric',
//   });
//   const formatDay = dateObject.toLocaleString('en-US', {
//     weekday: 'short',
//   });
//   const formatTime = dateObject.toLocaleString('en-US', {
//     hour: '2-digit',
//     minute: '2-digit',
//   });
//   console.log(formatDate, formatDay, formatTime);
//   return {
//     formatDate,
//     formatDay,
//     formatTime,
//   };
// };

const filterForecast = (forecastArray) => {
  const filteredForecast = forecastArray.list.filter((item) =>
    item.dt_txt.includes('12:00')
  );
  console.log(filteredForecast[0].main.temp);
  console.log(filteredForecast);
  return filteredForecast;
};
