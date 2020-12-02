import * as location from "./location.js";
const api = {
    key: "53fa88d825b3450a46c3ee29b1274af5",
    base: "https://api.openweathermap.org/data/2.5/"
}


const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResult(searchbox.value);
        console.log(searchbox.value);
    }
}

function getResult(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>℃</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}℃  / ${Math.round(weather.main.temp_max)}℃`

    let description = document.querySelector('.description');
    description.innerHTML = `${weather.weather[0].description}`;


    let detail = document.querySelector('.detail');
    let mainDetail = `
    <ul>Main</ul>
    <li>Temp: ${weather.main.temp}℃</li>
    <li>Feels like: ${weather.main.feels_like}℃</li>
    <li>Pressure:  ${weather.main.pressure}hPa</li>
    <li>Humidity: ${weather.main.humidity}%</li>`;
    let visibility = `Visibility: ${weather.visibility}`
    let windDetail = `
    <ul>Wind</ul>
    <li>Speed: ${weather.wind.speed} meter/sec</li>
    <li>Deg: ${weather.wind.deg} degrees</li>
    <li>Gust: ${weather.wind.gust}</li>`
    detail.innerHTML = mainDetail + visibility + windDetail;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

export {
    getResult,
    displayResults
};