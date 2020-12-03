let city = document.querySelector('#city');
let temp = document.querySelector('#temp');
let weatherText = document.querySelector('#weather');
let description = document.querySelector('#description');
let hilow = document.querySelector('#hilow');

const api = {
    key: "53fa88d825b3450a46c3ee29b1274af5",
    base: "https://api.openweathermap.org/data/2.5/",
    default: "https://api.openweathermap.org/data/2.5/weather?q=rochester&units=metric&appid=53fa88d825b3450a46c3ee29b1274af5",
    unit: ["metric", "imperial"]
}

function getWeather(city) {
    if (city != undefined) {
        console.log(`${api.base}weather?q=${city}&units=${api.unit[0]}&appid${api.key}`);
        return `${api.base}weather?q=${city}&units=${api.unit[0]}&appid=${api.key}`;
    } else {
        api.default;
    }
}

function displayResults(weatherString) {
    console.log(weatherString);

    city.innerHTML = `${weatherString.name}`;
    temp.innerHTML = weatherString.main.temp;
    weatherText.innerHTML = weatherString.weather[0].main;
    description.innerHTML = weatherString.weather[0].description;;
    hilow.innerHTML = `${weatherString.main.temp_min} and ${weatherString.main.temp_max}`;



    // let detail = document.querySelector('.detail');
    // detail.transition = 0.5;
    // let mainDetail = `
    // <ul>Main</ul>
    // <li>Temp: ${weather.main.temp}℃</li>
    // <li>Feels like: ${weather.main.feels_like}℃</li>
    // <li>Pressure:  ${weather.main.pressure}hPa</li>
    // <li>Humidity: ${weather.main.humidity}%</li>`;
    // let visibility = `Visibility: ${weather.visibility}`
    // let windDetail = `
    // <ul>Wind</ul>
    // <li>Speed: ${weather.wind.speed} meter/sec</li>
    // <li>Deg: ${weather.wind.deg} degrees</li>
    // <li>Gust: ${weather.wind.gust}</li>`;


    // document.querySelector("#main").onclick = function (e) {
    //     detail.innerHTML = mainDetail;
    //     console.log("main");
    // };
    // document.querySelector("#visibility").onclick = function (e) {
    //     detail.innerHTML = visibility;
    //     console.log("visibility");
    // };
    // document.querySelector("#wind").onclick = function (e) {
    //     detail.innerHTML = windDetail;
    //     console.log("wind");
    // };
}

export {
    displayResults,
    getWeather
};