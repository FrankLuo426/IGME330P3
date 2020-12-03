import * as yelp from "./yelp.js";
import * as ajax from "./ajax.js";
import * as unsplash from "./unsplash.js";
import * as weather from "./weather.js";
import * as mapbox from "./mapbox.js";
//import * as location from "./location.js";

function init() {

    //location.getlocation();
    //weather.getResultByCoord(location.lon, location.lat);
    weather.getRochesterResult();
    unsplash.SearchPhotosByLocation();

    setupUI();

    document.querySelector("#lazyBttn").onclick = function () {
        if(document.querySelector("#map").style.visibility == 'hidden')
        {
            document.querySelector("#map").style.visibility = 'visible';
            document.querySelector("#weather").style.visibility = 'hidden';
        }
        else{
            document.querySelector("#map").style.visibility = 'hidden';
            document.querySelector("#weather").style.visibility = 'visible';
        }
    };

    let url;

    document.querySelector("#findingBttn").onclick = function () {
        url = yelp.yelpBusinessSearch(document.querySelector("#foodText").value, document.querySelector("#cityText").value);
        ajax.downloadFile(url, businessLoaded);
    };

    const searchbox = document.querySelector('#cityText');

    searchbox.onchange = function (e) {
        unsplash.SearchPhotos();
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