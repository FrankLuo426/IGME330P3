let city = document.querySelector('#city');
let temp = document.querySelector('#temp');
let weatherText = document.querySelector('#weather');
let description = document.querySelector('#description');
let hilow = document.querySelector('#hilow');

const api = {
    key: "53fa88d825b3450a46c3ee29b1274af5",
    base: "https://api.openweathermap.org/data/2.5/",
    unit: ["metric", "imperial"]
}

function getWeather(city) {
    return `${api.base}weather?q=${city}&units=${api.unit[0]}&appid=${api.key}`;
}

function displayResults(weatherString) {
    console.log(weatherString);

    city.innerHTML = `${weatherString.name}`;
    temp.innerHTML = weatherString.main.temp;
    weatherText.innerHTML = weatherString.weather[0].main;
    description.innerHTML = weatherString.weather[0].description;;
    hilow.innerHTML = `${weatherString.main.temp_min} and ${weatherString.main.temp_max}`;
}

export {
    displayResults,
    getWeather
};