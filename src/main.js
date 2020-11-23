import * as yelp from "./yelp.js";
import * as ajax from "./ajax.js";

let business;

function init() {
    let url = yelp.initYelp();

    function businessLoaded(jsonString) {
        business = JSON.parse(jsonString);
        console.log(business);
    }
    
    ajax.downloadFile(url,)
}

export {
    init
};