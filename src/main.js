import * as yelp from "./yelp.js";
import * as ajax from "./ajax.js";
import * as background from "./background.js";
// import * as weather from "./weather.js";

let business;

function init() {
    // const searchbox = document.querySelector('.search-box');

    let url = yelp.yelpBusinessSearch();

    function businessLoaded(jsonString) {
        business = JSON.parse(jsonString);
        console.log(business);
    }

    ajax.downloadFile(url, businessLoaded)
    // searchbox.onchange = function (e) {
    //     background.SearchPhotos();
    // }
}

export {
    init
};