$(document).ready(function() {
    "use strict";

    var token = 'pk.eyJ1IjoiamVybG9nYW4iLCJhIjoiY2pza21mcmc0MTc0azN5b2xrY2FwZXNjZCJ9.lnqar9HCQtXcaZphXqsnMw';

    mapboxgl.accessToken = token;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-79.4512, 43.6568],
        zoom: 13
    });

    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    });

    document.getElementById('geocoder').appendChild(geocoder.onAdd(map));


    function geocode(search, token) {
        var baseUrl = 'https://api.mapbox.com';
        var endPoint = '/geocoding/v5/mapbox.places/';
        return fetch(baseUrl + endPoint + encodeURIComponent(search) + '.json' + "?" + 'access_token=' + token)
            .then(function(res) {
                return res.json();
                // to get all the data from the request, comment out the following three lines...
            }).then(function(data) {
                return data.features[0].center;
                console.log(data.features[0].center);
            });
    }

    //Get the actual value of which city is being selected

    var input = $('#geocoder').val();
    console.log(input);



    geocode(input, token).then(function(results) {
        console.log(results);
    });







    var marker = new mapboxgl.Marker()
        .setLngLat([-98.4916, 29.4260])
        .addTo(map);

    var lngLat = marker.getLngLat();




    console.log(lngLat);

    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    }));
});
