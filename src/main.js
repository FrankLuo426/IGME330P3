import * as yelp from "./yelp.js";
import * as ajax from "./ajax.js";
import * as unsplash from "./unsplash.js";
import * as openweather from "./openweather.js";
import * as mapbox from "./mapbox.js";

let findBttn = document.querySelector("#findingBttn");
let randomBttn = document.querySelector("#randomBttn");
let mapSection = document.querySelector("#map");
let weatherSection = document.querySelector("#weatherSection");
let finderSection = document.querySelector("#finder");
let citySearchBox = document.querySelector('#citySearchBox');
let foodSearchBox = document.querySelector("#foodSearchBox");
let resetBttn = document.querySelector("#resetBttn");
let randomFoodText = document.querySelector("#randomFood");
let rollAgainBttn = document.querySelector("#rollAgainBttn");
let loveItBttn = document.querySelector("#loveItBttn");

let weather;
let food;

function init() {
    setupUI();

    //event
    randomBttn.onclick = function () {
        if (citySearchBox.value) {
            localStorage.setItem("lastCity", citySearchBox.value);
            weatherSearch();

            mapSection.style.visibility = 'hidden';
            finderSection.style.visibility = 'hidden';
            weatherSection.style.visibility = 'visible';
        } else {
            citySearchBox.style.backgroundColor = "#ef475d";
            alert("Please enter your city!");
        }
    };

    findBttn.onclick = function () {
        localStorage.setItem("lastFood", foodSearchBox.value);
        localStorage.setItem("lastCity", citySearchBox.value);

        let url = yelp.yelpBusinessSearch(foodSearchBox.value, citySearchBox.value);
        ajax.downloadFile(url, businessLoad);
    };

    resetBttn.onclick = function () {
        foodSearchBox.value = "";
        citySearchBox.value = "";
        localStorage.removeItem("lastFood");
        localStorage.removeItem("lastCity");
        yelp.clearRestaurantList();
        mapbox.clearAllMarker();
    }

    rollAgainBttn.onclick = function () {
        food = randomFoodGenerator(weather);
        randomFoodText.innerHTML = food;
    }

    loveItBttn.onclick = function () {
        foodSearchBox.value = food;
        localStorage.setItem("lastFood", foodSearchBox.value);
        localStorage.setItem("lastCity", citySearchBox.value);

        yelp.clearRestaurantList();
        mapbox.clearAllMarker();
        let url = yelp.yelpBusinessSearch(food, citySearchBox.value);
        ajax.downloadFile(url, businessLoad);

        mapSection.style.visibility = 'visible';
        finderSection.style.visibility = 'visible';
        weatherSection.style.visibility = 'hidden';
    }

    citySearchBox.onfocus = function () {
        citySearchBox.style.backgroundColor = "white";
    }
}

function setupUI() {
    foodSearchBox.value = localStorage.getItem("lastFood");
    citySearchBox.value = localStorage.getItem("lastCity");
    mapbox.initMap();
    openweather.getWeather();
}

function businessLoad(jsonString) {
    let businessString = JSON.parse(jsonString);

    let longlat = [businessString.businesses[0].coordinates.longitude, businessString.businesses[0].coordinates.latitude];
    mapbox.flyTo(longlat);

    yelp.clearRestaurantList();
    mapbox.clearAllMarker();

    for (let b of businessString.businesses) {
        let longlat = [b.coordinates.longitude, b.coordinates.latitude];
        yelp.addToRestaurantList(b.id, b.name, longlat[0], longlat[1], b.rating, b.phone, b.price);
        mapbox.addMarker(longlat, b.name, `<b>Rating</b>: ${b.rating}<br><b>Phone</b>: ${b.phone}`, "marker")
    }

    yelp.createHtmlLiForRestaurant();
}

function weatherSearch() {
    let url = openweather.getWeather(citySearchBox.value);
    console.log(url);
    ajax.downloadFile(url, weatherLoad);

    url = unsplash.searchPhotos(citySearchBox.value);
    ajax.downloadFile(url, photoLoad)
}

function weatherLoad(jsonString) {
    let weatherString = JSON.parse(jsonString);
    if (weatherString.cod == "200") {
        openweather.displayResults(weatherString);
        weather = weatherString.weather[0].main;
        food = randomFoodGenerator(weatherString.weather[0].main);
        randomFoodText.innerHTML = food;
    }
}

function photoLoad(jsonString) {
    let photoString = JSON.parse(jsonString);
    if (photoString.results[0] != undefined) {
        let bgImageURL = `url(${photoString.results[0].urls.regular})`;
        weatherSection.style.background = bgImageURL;
        weatherSection.style.backgroundSize = `100vw 100vh`;
        weatherSection.style.backgroundRepeat = `no-repeat`;
        weatherSection.style.backgroundPosition = `top right`;
    }
}

function randomFoodGenerator(weather) {
    let foodListThunderstorm = ["pho", "pork chops", "Spaghetti", "Chicken Soup", "Baked Risotto"];
    let foodListDrizzle = ["Tomato Soup", "Cinnamon Roll", "Vegan Chili", "Sausage", "Mushroom"];
    let foodListRain = ["Bacon", "Popcorn", "Roast Chicken", "Sandwiches", "Dumplings"];
    let foodListSnow = ["Beef Stew", "Pizza", "Onion Soup", "Turkey", "Cheese"];
    let foodListClouds = ["Noodle Soup", "Noodle", "Manicotti", "Lasagna", "Garlic Bread"];
    let foodListElse = ["Hot Pot", "Pasta", "Fried Rice", "Chicken Parm Soup", "Chicken Stew"];

    if (weather == "Thunderstorm") {
        return foodListThunderstorm[getRndInteger(0, 5)];
    } else if (weather == "Drizzle") {
        return foodListDrizzle[getRndInteger(0, 5)];
    } else if (weather == "Rain") {
        return foodListRain[getRndInteger(0, 5)];
    } else if (weather == "Snow") {
        return foodListSnow[getRndInteger(0, 5)];
    } else if (weather == "Clouds") {
        return foodListClouds[getRndInteger(0, 5)];
    } else {
        return foodListElse[getRndInteger(0, 5)];
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export {
    init
};