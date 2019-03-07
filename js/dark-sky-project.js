$(document).ready(function() {
    "use strict";

    var darkSkyUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/29.4241,-98.4936";



        $.get(darkSkyUrl).done(function (data) {
            var temperature = data.currently.temperature;
            var feelsLike = data.currently.apparentTemperature;
            var icon = data.currently.icon;
            var summary = data.currently.summary;
            var humidity = data.currently.humidity;
            var string = '';
            string += "<p id='temperature'>" +  '<h2>' + Math.round(temperature) + '&#176' + '</h2>';
            string += "<div id='icon'>" + '</div>';
            string += "<p id='summary'>" + summary + '</p>';
            string += "<p id='humidity'>" + 'Humidity: ' + (humidity * 100) + '%' + '</p>';

            $('.left-box').html(string);

            //     <h2>53</h2>
            //     <p>feels like</p>
            // <img src="Icon/Cloud-Drizzle-Moon-Alt.svg">
            //     <p>summary</p>
            //     <p>humidity</p>

        });





    function mapBox() {
        mapboxgl.accessToken = mapboxAccessToken;
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9'
        });
    }

   mapBox();




});