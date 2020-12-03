import * as yelp from "./yelp.js";
import * as ajax from "./ajax.js";
import * as background from "./background.js";
import * as weather from "./weather.js";
import * as mapbox from "./mapbox.js";
//import * as location from "./location.js";

function init() {

    //location.getlocation();
    //weather.getResultByCoord(location.lon, location.lat);
    weather.getRochesterResult();
    background.SearchPhotosByLocation();

    setupUI();

    document.querySelector("#food").onclick = function () {
        document.querySelector("#map").style.visibility = 'visible';
        document.querySelector("#finder").style.visibility = 'visible';
    };

    let url;

    document.querySelector("#findingBttn").onclick = function () {
        url = yelp.yelpBusinessSearch(document.querySelector("#foodText").value, document.querySelector("#cityText").value);
        ajax.downloadFile(url, businessLoaded);
    };

    const searchbox = document.querySelector('.search-box');

    searchbox.onchange = function (e) {
        background.SearchPhotos();
        weather.displayResults();
    }
}

function setupUI() {
    mapbox.initMap();
}

function businessLoaded(jsonString) {
    let business = JSON.parse(jsonString);
    console.log(business);

    for (let b of business.businesses) {
        let latlong = [b.coordinates.longitude, b.coordinates.latitude];
        mapbox.addMarker(latlong, b.name, `rating: ${b.rating}`, "marker")
        console.log(latlong);
        mapbox.flyTo(latlong);
    }
}

export {
    init
};