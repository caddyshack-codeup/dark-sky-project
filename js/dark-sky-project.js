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

                var icon = data.currently.icon;
                html += dayOfWeek;
                html += "<img id='icon'>";
                html += "<p id='summary'>" + day[i].summary + '</p>';
                html += "<p id='humidity'>" + 'Humidity: ' + Math.round(day[i].humidity * 100) + '%' + '</p>';
                html += '</div>';
            }
            $('#box').html(html);

            //Weather icon population
            var conditions = $.get('conditions.json');

            conditions.done(function(weather){
                for (var i = 0; i < weather.length; i++){
                    if (icon === weather[i].condition) {
                        $('#icon').attr('src', weather[i].icon)

                    }
                }
            });

        });
    }

    getData();


    ///////////////////////////////
    /////// button logic ///////
    ///////////////////////////////


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
                var icon = data.currently.icon;
                html += dayOfWeek;
                html += "<img id='icon'>;";
                html += "<p id='summary'>" + day[i].summary + '</p>';
                html += "<p id='humidity'>" + 'Humidity: ' + Math.round(day[i].humidity * 100) + '%' + '</p>';
                html += '</div>';
            }


            $('#box').html(html);
            console.log(darkSkyUrl);


            //Weather icon population
            var conditions = $.get('conditions.json');

            conditions.done(function(weather){
                for (var i = 0; i < weather.length; i++){
                    if (icon === weather[i].condition) {
                        $('#icon').attr('src', weather[i].icon)

                    }
                }

            });

            })


        });

    }

    marker.on('dragend', onDragEnd);

    function inputLocation() {
        $('#button').click(function() {
            marker.remove();
            var input = $('#search-box').val();
            // console.log(input)

            locationName = {
                address: input
                // popupHTML: "<p>World Traveler</p>"
            }

            placeMarkerAndPopup(locationName, accessToken, map)
        });


        var accessToken = mapboxAccessToken;

<<<<<<< HEAD
=======
    }));



    function inputLocation() {
        $('#button').click(function() {
            marker.remove();
            var input = $('#search-box').val();
            // console.log(input)

            locationName = {
                address: input
                // popupHTML: "<p>World Traveler</p>"
            }

            placeMarkerAndPopup(locationName, accessToken, map)
        });


        var accessToken = mapboxAccessToken;

>>>>>>> b63b4617e561d7b11df4fd2fdc525f6b81289523
        mapboxgl.accessToken = accessToken;

        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            zoom: 4,
            center: [-98.4916, 29.4252]
        });

        var marker = new mapboxgl.Marker({

        })
            .setLngLat([-98.491142, 29.424349])
            .addTo(map);
<<<<<<< HEAD


        function placeMarkerAndPopup(info, token, map) {
            geocode(info.address, token).then(function(coordinates) {

                console.log(coordinates);
                // var popup = new mapboxgl.Popup()
                //     .setHTML(info.popupHTML);
                marker = new mapboxgl.Marker()
                    .setLngLat(coordinates)
                    .addTo(map)
                //     .setPopup(popup);
                // popup.addTo(map);
            });
        }

    }
=======


        function placeMarkerAndPopup(info, token, map) {
            geocode(info.address, token).then(function(coordinates) {

                console.log(coordinates);
                // var popup = new mapboxgl.Popup()
                //     .setHTML(info.popupHTML);
                marker = new mapboxgl.Marker()
                    .setLngLat(coordinates)
                    .addTo(map)
                //     .setPopup(popup);
                // popup.addTo(map);
            });
        }

    }









});
>>>>>>> b63b4617e561d7b11df4fd2fdc525f6b81289523


});

