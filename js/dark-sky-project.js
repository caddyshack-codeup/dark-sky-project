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


    function getData() {
        $.get(darkSkyUrl).done(function (data) {



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

                html += dayOfWeek;
                html += "<div id='icon'>" + '</div>';
                html += "<p id='summary'>" + day[i].summary + '</p>';
                html += "<p id='humidity'>" + 'Humidity: ' + Math.round(day[i].humidity * 100) + '%' + '</p>';
                html += '</div>';
            }
            $('#box').html(html);


        });
    }

    getData();


    ///////////////////////////////
    /////// button logic ///////
    ///////////////////////////////


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



    hoverOverButtons();
    clickTodayButton();
    click7DayButton();
    click3DayButton();


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
                        html += "<p id='temperature'>" + '<h2>' + Math.round(todayTemperature) + '&#176' + '</h2>';
                        break;
                    case 0:
                        dayOfWeek = 'Sunday';
                        html += "<p id='temperature'>" + '<h2>' + Math.round(day[i].temperatureHigh) + '&#176' + '/' + Math.round(day[i].temperatureLow) + '&#176' + '</h2>';
                        break;
                    case 1:
                        dayOfWeek = 'Monday';
                        html += "<p id='temperature'>" + '<h2>' + Math.round(day[i].temperatureHigh) + '&#176' + '/' + Math.round(day[i].temperatureLow) + '&#176' + '</h2>';
                        break;
                    case 2:
                        dayOfWeek = 'Tuesday';
                        html += "<p id='temperature'>" + '<h2>' + Math.round(day[i].temperatureHigh) + '&#176' + '/' + Math.round(day[i].temperatureLow) + '&#176' + '</h2>';
                        break;
                    case 3:
                        dayOfWeek = 'Wednesday';
                        html += "<p id='temperature'>" + '<h2>' + Math.round(day[i].temperatureHigh) + '&#176' + '/' + Math.round(day[i].temperatureLow) + '&#176' + '</h2>';
                        break;
                    case 4:
                        dayOfWeek = 'Thursday';
                        html += "<p id='temperature'>" + '<h2>' + Math.round(day[i].temperatureHigh) + '&#176' + '/' + Math.round(day[i].temperatureLow) + '&#176' + '</h2>';
                        break;
                    case 5:
                        dayOfWeek = 'Friday';
                        html += "<p id='temperature'>" + '<h2>' + Math.round(day[i].temperatureHigh) + '&#176' + '/' + Math.round(day[i].temperatureLow) + '&#176' + '</h2>';
                        break;
                    case 6:
                        dayOfWeek = 'Saturday';
                        html += "<p id='temperature'>" + '<h2>' + Math.round(day[i].temperatureHigh) + '&#176' + '/' + Math.round(day[i].temperatureLow) + '&#176' + '</h2>';
                }

                html += dayOfWeek;
                html += "<div id='icon'>" + '</div>';
                html += "<p id='summary'>" + day[i].summary + '</p>';
                html += "<p id='humidity'>" + 'Humidity: ' + Math.round(day[i].humidity * 100) + '%' + '</p>';
                html += '</div>';
            }

            $('#box').html(html);
            console.log(darkSkyUrl);

        });

    }

    marker.on('dragend', onDragEnd);










});