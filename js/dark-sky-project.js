$(document).ready(function() {
    "use strict";

    var darkSkyUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/29.4241,-98.4936";

    $.get(darkSkyUrl).done(function(data) {
        console.log(data);
    });


    mapboxgl.accessToken = mapboxAccessToken;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9'
    });



});