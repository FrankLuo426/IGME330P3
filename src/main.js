import * as yelp from "./yelp.js";
import * as ajax from "./ajax.js";
import * as unsplash from "./unsplash.js";
import * as openweather from "./openweather.js";
import * as mapbox from "./mapbox.js";

let findBttn = document.querySelector("#findingBttn");
let randomBttn = document.querySelector("#randomBttn");
let mapSection = document.querySelector("#map");
let weatherSection = document.querySelector("#weatherSection");
let citySearchBox = document.querySelector('#citySearchBox');
let foodSearchBox = document.querySelector("#foodSearchBox");
let resetBttn = document.querySelector("#resetBttn");

function init() {
    setupUI();

    //event
    randomBttn.onclick = function () {
        if (mapSection.style.visibility == 'hidden') {
            mapSection.style.visibility = 'visible';
            weatherSection.style.visibility = 'hidden';
        } else {
            mapSection.style.visibility = 'hidden';
            weatherSection.style.visibility = 'visible';
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

    citySearchBox.addEventListener("focusout", weatherSearch);
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

    for (let b of businessString.businesses) {
        let longlat = [b.coordinates.longitude, b.coordinates.latitude];
        yelp.addToRestaurantList(b.id, b.name, longlat[0], longlat[1], b.rating, b.phone, b.price);
        mapbox.addMarker(longlat, b.name, `<b>Rating</b>: ${b.rating}<br><b>Phone</b>: ${b.phone}`, "marker")
    }

    yelp.createHtmlLiForRestaurant();
}

function weatherSearch() {
    let url = openweather.getWeather(citySearchBox.value);
    ajax.downloadFile(url, weatherLoad);

    url = unsplash.searchPhotos(citySearchBox.value);
    ajax.downloadFile(url, photoLoad)
}

function weatherLoad(jsonString) {
    let weatherString = JSON.parse(jsonString);
    openweather.displayResults(weatherString);
}

function photoLoad(jsonString) {
    let photoString = JSON.parse(jsonString);

    let bgImageURL = `url(${photoString.results[0].urls.regular})`;
    weatherSection.style.background = bgImageURL;
    weatherSection.style.backgroundSize = `100vw 100vh`;
    weatherSection.style.backgroundRepeat = `no-repeat`;
    weatherSection.style.backgroundPosition = `top right`;
}

export {
    init
};