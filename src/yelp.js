function initYelp() {
    yelpBusinessSearch();
}

function yelpBusinessSearch(foodText, cityText) {
    let URL = "https://people.rit.edu/jz2728/330/project/RestaurantFinder/php/yelp-proxy.php";

    URL += `?term=${foodText}&location=${cityText}`;
    console.log(URL);
    return URL;
}

export {
    initYelp,
    yelpBusinessSearch
};