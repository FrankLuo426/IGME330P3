const api = {
    key: "WEqRRNiZ_wRDx4_53JYqGcDa7XpU0c5Ayc40B4LonW4",
    base: "https://api.unsplash.com/search/photos/"
}

function searchPhotos(city) {
    let url = `${api.base}?query=${city}&client_id=${api.key}`;
    return url;
}

export {
    searchPhotos
};