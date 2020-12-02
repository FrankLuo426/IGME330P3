let map;

function initMap() {
    mapboxgl.accessToken =
        'pk.eyJ1IjoicXdlcXdlMzY0IiwiYSI6ImNraGY3c3V4NTAzODcycnVzYzMxYjRhanEifQ.a8LkpUC_AJL-Sd-GGdJRUg';

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [-77.67454147338866, 43.08484339838443],
        zoom: 15.5
    });

    map.on('load', function () {
        // Insert the layer beneath any symbol layer.
        var layers = map.getStyle().layers;

        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
                labelLayerId = layers[i].id;
                break;
            }
        }

        map.addLayer({
                'id': '3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',

                    // use an 'interpolate' expression to add a smooth transition effect to the
                    // buildings as the user zooms in
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'height']
                    ],
                    'fill-extrusion-base': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'min_height']
                    ],
                    'fill-extrusion-opacity': 0.6
                }
            },
            labelLayerId
        );
    });
};

function flyTo(center = [0, 0]) {
    map.flyTo({
        center: center
    });
}

function setZoomLevel(value = 0) {
    map.setZoom(value);
}

function setPitchAndBearing(pitch = 0, bearing = 0) {
    map.setPitch(pitch);
    map.setBearing(bearing);
}

function addMarker(coordinates, title, description, className) {
    let el = document.createElement('div');
    el.className = className;

    new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({
                offset: 25
            })
            .setHTML('<h3>' + title + '</h3><p>' + description + '</p>'))
        .addTo(map);
}

export {
    initMap,
    flyTo,
    setZoomLevel,
    setPitchAndBearing,
    addMarker
};