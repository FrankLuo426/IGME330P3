function initYelp() {
    yelpBusinessSearch();
}

function yelpBusinessSearch(){
    const URL = "https://people.rit.edu/jz2728/330/project/RestaurantFinder/php/yelp-proxy.php?term=pizaa&location=rochester";
    return URL;
}

export {
    initYelp,yelpBusinessSearch
};