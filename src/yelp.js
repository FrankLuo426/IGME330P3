class restaurant {
    constructor(name, longlat, rating) {
        this.name = name;
        this.longlat = longlat;
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

function addToRestaurantList(name, longlat, rating) {
    restaurantList.push(new restaurant(name, longlat, rating));

    for (let r of restaurantList) {
        restaurantListDiv.innerHTML += `<li>${r.name}${r.rating}</li>`
    }
}

export {
    yelpBusinessSearch,
    addToRestaurantList
};