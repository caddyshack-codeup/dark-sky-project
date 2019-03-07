$(document).ready(function() {
    "use strict";
    ///////////////////////////////////////////
    /////////////// Mapbox Map ////////////////
    ///////////////////////////////////////////
    mapboxgl.accessToken = mapboxAccessToken;
    var coordinates = document.getElementById('coordinates');
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [-98.491142, 29.424349],
        zoom: 4
    });

    var marker = new mapboxgl.Marker({
        draggable: true
    })
        .setLngLat([-98.491142, 29.424349])
        .addTo(map);


    ////////////////////////////////
    /////// Default marker html ///////
    ////////////////////////////////

    var darkSkyUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/29.424349, -98.491142";


    $.get(darkSkyUrl).done(function (data) {
        var temperature = data.currently.temperature;
        var feelsLike = data.currently.apparentTemperature;
        var icon = data.currently.icon;
        var summary = data.currently.summary;
        var humidity = data.currently.humidity;
        var string = '';
        string += "<p id='temperature'>" +  '<h2>' + Math.round(temperature) + '&#176' + '</h2>';
        string += "<img id='icon'>";
        string += "<p id='summary'>" + summary + '</p>';
        string += "<p id='humidity'>" + 'Humidity: ' + Math.round(humidity * 100) + '%' + '</p>';

        $('.left-box').html(string);
        console.log(icon);

        //Weather icon population
        var conditions = $.get('conditions.json');

        conditions.done(function(weather){
            for (var i = 0; i < weather.length; i++){
                if (icon === weather[i].condition) {
                    $('#icon').attr('src', weather[i].icon)

                }
            }
        })


    });



    function onDragEnd() {
        ////////////////////////////////
        /////// Long/Lat Display ///////
        ////////////////////////////////
        var lngLat = marker.getLngLat();
        coordinates.style.display = 'block';
        coordinates.innerHTML = 'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;


        ///////////////////////////////
        /////// Weather Updates ///////
        ///////////////////////////////
        var darkSkyUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/" + lngLat.lat + "," + lngLat.lng;


        $.get(darkSkyUrl).done(function (data) {
            var temperature = data.currently.temperature;
            var feelsLike = data.currently.apparentTemperature;
            var icon = data.currently.icon;
            var summary = data.currently.summary;
            var humidity = data.currently.humidity;
            var string = '';
            string += "<p id='temperature'>" +  '<h2>' + Math.round(temperature) + '&#176' + '</h2>';
            string += "<img id='icon'>";
            string += "<p id='summary'>" + summary + '</p>';
            string += "<p id='humidity'>" + 'Humidity: ' + Math.round(humidity * 100) + '%' + '</p>';

            $('.left-box').html(string);

            //Weather icon population
            var conditions = $.get('conditions.json');

            conditions.done(function(weather){
                for (var i = 0; i < weather.length; i++){
                    if (icon === weather[i].condition) {
                        $('#icon').attr('src', weather[i].icon)

                    }
                }
            })

        });

    }

    marker.on('dragend', onDragEnd);







});



