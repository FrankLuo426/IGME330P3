
let lon;
let lat;

const successCallback = (position) => {
    lon = position.longitude;
    lat = position.latitude;
    console.log(position);
}
const errorCallback = (position) => {
    console.log("error");
}

function getlocation(){
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

export{lon, lat, getlocation};