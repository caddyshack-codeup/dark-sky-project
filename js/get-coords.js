$(document).ready(function() {
    "use strict";

    //set up the map

    mapboxgl.accessToken = mapboxAccessToken; //mapbox access token is in hidden keys.js folder
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        zoom: 5,
        center: [-98.4916, 29.4252]
    });

//    geocode function

    //The geocoder is the search bar that returns a marker on that location

    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: {
            color: 'orange'
        },
        mapboxgl: mapboxgl
    });

    document.getElementById('geocoder').appendChild(geocoder.onAdd(map)); //separates search bar from map

    //This function updates the coordinates in the console and on the page
    //To see wider scope of JSON object, console log result and open options from there in the console

    geocoder.on('result', function(result) {
        let coordinates = result.result.geometry.coordinates;
        console.log(coordinates);
        document.querySelector('.live-coords').innerHTML = coordinates;

        //convert coordinates to string and have them switch places because dark sky reads them differently than mapbox
        var coordinatesToString = "" + coordinates[1] + "," + coordinates[0];

        //call the function created below
        getWeather(coordinatesToString);
    });


    ///////////////////////////////////////////////////
    /////////DARK SKY IMPLEMENTATION///////////////////
    ///////////////////////////////////////////////////

    function getWeather(coordinates) {
        let darkSkyUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/" + coordinates;

        $.get(darkSkyUrl).done(function (data) {
            console.log(data);
            var day = data.daily.data;
            var todayTemperature = data.currently.temperature;
            var html = '';
            var today = new Date().getDay();

            for (var i = 0; i < day.length - 1; i++) {

                var dayOfWeek = (new Date((day[i].time) * 1000)).getDay();

                html += '<div class="eachDay">';


                //checks which day of the week and changes number to actual string day...
                //also checks to see if day is today and if it is name it 'today' and give it current temp.

                switch (dayOfWeek) {
                    case today:
                        dayOfWeek = 'Currently';
                        html += "<span id='temperature'>" + '<h2>' + Math.round(todayTemperature) + '&#176' + '</h2>';
                        break;
                    case 0:
                        dayOfWeek = 'Sunday';
                        html += "<span id='temperature'>" + '<h2>' + Math.round(day[i].temperatureHigh) + '&#176' + '/' + Math.round(day[i].temperatureLow) + '&#176' + '</h2>';
                        break;
                    case 1:
                        dayOfWeek = 'Monday';
                        html += "<span id='temperature'>" + '<h2>' + Math.round(day[i].temperatureHigh) + '&#176' + '/' + Math.round(day[i].temperatureLow) + '&#176' + '</h2>';
                        break;
                    case 2:
                        dayOfWeek = 'Tuesday';
                        html += "<span id='temperature'>" + '<h2>' + Math.round(day[i].temperatureHigh) + '&#176' + '/' + Math.round(day[i].temperatureLow) + '&#176' + '</h2>';
                        break;
                    case 3:
                        dayOfWeek = 'Wednesday';
                        html += "<span id='temperature'>" + '<h2>' + Math.round(day[i].temperatureHigh) + '&#176' + '/' + Math.round(day[i].temperatureLow) + '&#176' + '</h2>';
                        break;
                    case 4:
                        dayOfWeek = 'Thursday';
                        html += "<span id='temperature'>" + '<h2>' + Math.round(day[i].temperatureHigh) + '&#176' + '/' + Math.round(day[i].temperatureLow) + '&#176' + '</h2>';
                        break;
                    case 5:
                        dayOfWeek = 'Friday';
                        html += "<span id='temperature'>" + '<h2>' + Math.round(day[i].temperatureHigh) + '&#176' + '/' + Math.round(day[i].temperatureLow) + '&#176' + '</h2>';
                        break;
                    case 6:
                        dayOfWeek = 'Saturday';
                        html += "<span id='temperature'>" + '<h2>' + Math.round(day[i].temperatureHigh) + '&#176' + '/' + Math.round(day[i].temperatureLow) + '&#176' + '</h2>';
                }

                var icon = data.currently.icon;
                html += dayOfWeek;
                html += "<p id='summary'>" + day[i].summary + '</p>';
                html += "<p id='humidity'>" + 'Humidity: ' + Math.round(day[i].humidity * 100) + '%' + '</p>';
                html += '</div>';
            }
            $('#box').html(html);
        });
    }

    ///////////////////////////////
    /////// button logic ///////
    ///////////////////////////////


    $.get(darkSkyUrl).done(function (data) {
        var temperature = data.currently.temperature;
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
        });

        marker.on('dragend', onDragEnd);

    });


    function clickTodayButton() {
        $('#today').click(function (e) {
            e.preventDefault();
            $('.boxes').children().hide();
            $('.boxes').children().first().show().removeClass('eachDay').removeClass('three-day-button-results').addClass('today-button-results');
        });
    }

    function click3DayButton() {
        $('#3-day').click(function (e) {
            e.preventDefault();
            $('.boxes').children().hide();
            $('.boxes').children().slice(0, 3).show().addClass('three-day-button-results').removeClass('today-button-results').removeClass('eachDay');
        });
    }

    function click7DayButton() {
        $('#7-day').click(function (e) {
            e.preventDefault();
            getData();
        });
    }

    clickTodayButton();
    click7DayButton();
    click3DayButton();

});
