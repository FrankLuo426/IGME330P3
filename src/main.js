import * as yelp from "./yelp.js";
import * as ajax from "./ajax.js";
import * as unsplash from "./unsplash.js";
import * as openweather from "./openweather.js";
import * as mapbox from "./mapbox.js";

let findBttn = document.querySelector("#findingBttn");
let randomBttn = document.querySelector("#randomBttn");
let mapSection = document.querySelector("#map");
let weatherSection = document.querySelector("#weather");
let citySearchBox = document.querySelector('#cityText');
let foodSearchBox = document.querySelector("#foodText");

function init() {
    setupUI();

    openweather.getRochesterResult();
    unsplash.SearchPhotosByLocation();

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
        ajax.downloadFile(url, businessLoaded);
    };

    const searchbox = citySearchBox;

    searchbox.onchange = function (e) {
        unsplash.SearchPhotos();
        openweather.displayResults();
    }

}

function setupUI() {
    mapbox.initMap();
}

function businessLoaded(jsonString) {
    let business = JSON.parse(jsonString);
    console.log(business);

    for (let b of business.businesses) {
        let longlat = [b.coordinates.longitude, b.coordinates.latitude];
        mapbox.addMarker(longlat, b.name, `rating: ${b.rating}`, "marker")
        console.log(longlat);
        mapbox.flyTo(longlat);
    }
}

export {
    init
};