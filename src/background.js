//const searchbox = document.querySelector('.search-box');
import * as weather from "./weather.js";
// searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        SearchPhotos();
    }
}


function SearchPhotos() {
    let clientId = "WEqRRNiZ_wRDx4_53JYqGcDa7XpU0c5Ayc40B4LonW4";
    let query = document.querySelector('.search-box').value;
    let url = "https://api.unsplash.com/search/photos/?client_id=WEqRRNiZ_wRDx4_53JYqGcDa7XpU0c5Ayc40B4LonW4&query=" + query;
    console.log(query);


    fetch(url)
        .then(function (data) {
                return data.json();
            }

        )
        .then(function (data) {
            console.log(data);
            let imageURL = data.results[0].urls.regular;
            document.querySelector("body").style.backgroundImage = "url("+imageURL+")";
        })
}

export{SearchPhotos};