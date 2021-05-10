/**
 * @author Thalis Goldschmidt
 * @author Fabian Schumacher
 * This file was created to the manage the process of getting information about the weather at the current location of the device in use.
 * It implements the functionality of the "Get weather at my position"-button.
 */

"use strict"

// Variables

let buttonGetPosition = document.getElementById("buttonGetPosition"); //button to get the weather at the position
let currentPositionDiv = document.getElementById("currentPositionDiv"); //container to display the current position
let currentWeatherDiv = document.getElementById("currentWeatherDiv"); //container to display the weather at the position

// Functions

/**
 * If the user allows us to get his current position, we use the incoming data in two further functions 
 * to get information about the weather and to find out in which city he actually is.
 * @param {GeolocationPosition} pos 
 */
function success(pos) {
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;

    loadWeatherAtPosition(latitude, longitude);
    getCity(latitude,longitude);

    document.getElementById("accuracy").innerHTML = "Accuracy: " + pos.coords.accuracy + "m";
}

/**
 * If the user doesn't allow us to get his current position the function throws an error.
 * @param {error} error 
 */
function error(error) {
    alert("Error: User denied access to position");
}

/**
 * When the user presses the button, the function asks the user whether he can query his location.
 */
buttonGetPosition.addEventListener('click', function(){
    navigator.geolocation.getCurrentPosition(success, error);
})

/**
 * 
 * @param {*} latitude 
 * @param {*} longitude 
 */
function getCity(latitude, longitude){
    let apiKey = mapboxApiKey;
    var xhttp1 = new XMLHttpRequest();
    xhttp1.open("GET", `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${apiKey}`, true)
    xhttp1.send();
    xhttp1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            let positionData = JSON.parse(this.responseText);
            var positionDescription = positionData.features[2].place_name;
            document.getElementById("positionDescription").innerHTML = "You are currently in: " +  positionDescription;
        } 
    }
}

/**
 * 
 * @param {*} latitude 
 * @param {*} longitude 
 */
function loadWeatherAtPosition(latitude, longitude){
    let apiKey = openweatherApiKey;
    var xhttp2 = new XMLHttpRequest();
    //xhttp.onload = loadcallback;
    //xhttp.onerror = errorcallback;
    xhttp2.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            let weatherData = JSON.parse(this.responseText);
            showWeatherAtPosition(weatherData);
        } 
    }
    xhttp2.open("GET", `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`, true);
    xhttp2.send();

}

/**
 * 
 * @param {*} weatherData 
 */
function showWeatherAtPosition(weatherData){
    currentPositionDiv.style.display = "block";
    currentWeatherDiv.style.display = "block";
    //displaying the date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let currentDt = new Date(weatherData.current.dt * 1000).toLocaleDateString("EN-EN", options);
    document.getElementById("currentDate").innerHTML = "Date: " + currentDt;

    //displaying the current temperature
    document.getElementById("currentTemp").innerHTML = "Current temperature: " + Math.round(weatherData.current.temp) + "°C";

    //displaying "feels-like" temperature
    document.getElementById("currentTempFeelsLike").innerHTML = "Feels-like temperature: " + Math.round(weatherData.current.feels_like) + "°C";

    //displaying the current wind
    document.getElementById("currentWind").innerHTML = "Wind speed and direction: " + weatherData.current.wind_speed + " m/s, " + weatherData.current.wind_deg + "°";

    //displaying the current humidity 
    document.getElementById("currentHumidity").innerHTML = "Humidity: " + weatherData.current.humidity + "%";

    //displaying the current clouds
    document.getElementById("currentClouds").innerHTML = "Cloudiness: " + weatherData.current.clouds + "%";

    //displaying current rain
    //document.getElementById("currentRain").innerHTML = "Rainfall in the last 60 minutes: " + weatherData.current.rain.1h + "[mm]";

    //displaying current weather symbol
    let src = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
    let img = document.createElement('img');
    document.getElementById("myImg").src = src;
}