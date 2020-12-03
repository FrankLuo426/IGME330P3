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
let body = document.querySelector("body");

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
        let url = yelp.yelpBusinessSearch(foodSearchBox.value, citySearchBox.value);
        ajax.downloadFile(url, businessLoad);
    };

    citySearchBox.addEventListener("focusout", weatherSearch);
}

function setupUI() {
    mapbox.initMap();
    openweather.getWeather();
}

function businessLoad(jsonString) {
    let businessString = JSON.parse(jsonString);
    console.log(businessString);

    for (let b of businessString.businesses) {
        let longlat = [b.coordinates.longitude, b.coordinates.latitude];
        mapbox.addMarker(longlat, b.name, `rating: ${b.rating}`, "marker")
        console.log(longlat);
        mapbox.flyTo(longlat);
    }
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
    body.style.background = bgImageURL;
    body.style.backgroundSize = `80vw 100vh`;
    body.style.backgroundRepeat = `no-repeat`;
    body.style.backgroundPosition = `top right`;
}

export {
    init
};