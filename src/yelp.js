import * as mapbox from "./mapbox.js";

class restaurant {
    constructor(id, name, long, lat, rating) {
        this.id = id;
        this.name = name;
        this.long = long;
        this.lat = lat;
        this.rating = rating;
    }
}

let restaurantListDiv = document.querySelector("#restaurantList");
let restaurantList = new Array();

function yelpBusinessSearch(foodText, cityText) {
    let URL = "https://people.rit.edu/jz2728/330/project/RestaurantFinder/php/yelp-proxy.php";
    URL += `?term=${foodText}&location=${cityText}`;
    console.log(URL);
    return URL;
}

function addToRestaurantList(id, name, long, lat, rating) {
    restaurantList.push(new restaurant(id, name, long, lat, rating));
}

function createHtmlLiForRestaurant() {
    for (let r of restaurantList) {
        let el = document.createElement("LI");
        el.setAttribute("id", `ID${r.id}`);
        el.setAttribute("data-long", `${r.long}`);
        el.setAttribute("data-lat", `${r.lat}`);
        restaurantListDiv.appendChild(el);
        let textNode = document.createTextNode(`${r.name}${r.rating}`);
        el.appendChild(textNode);

        document.querySelector(`#ID${r.id}`).addEventListener("click", flyToRestaurant);
    }
}

function flyToRestaurant(e) {
    let longlat = [e.target.getAttribute("data-long"), e.target.getAttribute("data-lat")];
    mapbox.flyTo(longlat);
}

export {
    yelpBusinessSearch,
    addToRestaurantList,
    createHtmlLiForRestaurant
};