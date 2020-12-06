import * as mapbox from "./mapbox.js";

class restaurant {
    constructor(id, name, long, lat, rating, phone) {
        this.id = id;
        this.name = name;
        this.long = long;
        this.lat = lat;
        this.rating = rating;
        this.phone = phone;
    }
}

let restaurantListDiv = document.querySelector("#restaurantList");
let restaurantList = new Array();

function yelpBusinessSearch(foodText, cityText) {
    let URL = "https://people.rit.edu/jz2728/330/project/RestaurantFinder/php/yelp-proxy.php";
    URL += `?term=${foodText}&location=${cityText}`;
    return URL;
}

function addToRestaurantList(id, name, long, lat, rating, phone) {
    restaurantList.push(new restaurant(id, name, long, lat, rating, phone));
}

function createHtmlLiForRestaurant() {
    for (let i = 0; i < restaurantList.length && i < 10; i++) {
        let el = document.createElement("LI");
        el.setAttribute("id", `ID${restaurantList[i].id}`);
        el.setAttribute("data-long", `${restaurantList[i].long}`);
        el.setAttribute("data-lat", `${restaurantList[i].lat}`);
        restaurantListDiv.appendChild(el);
        let textNode = document.createTextNode(`${restaurantList[i].name}`);
        el.appendChild(textNode);

        document.querySelector(`#ID${restaurantList[i].id}`).addEventListener("click", flyToRestaurant);
    }
}

function flyToRestaurant(e) {
    let longlat = [e.target.getAttribute("data-long"), e.target.getAttribute("data-lat")];
    mapbox.flyTo(longlat);
}

function clearRestaurantList() {
    while (restaurantList[0]) {
        restaurantList.pop();
    }
    
    while (restaurantListDiv.firstChild) {
        restaurantListDiv.removeChild(restaurantListDiv.lastChild);
    }
}

export {
    yelpBusinessSearch,
    addToRestaurantList,
    createHtmlLiForRestaurant,
    clearRestaurantList
};