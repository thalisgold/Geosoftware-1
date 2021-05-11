/**
 * @author Thalis Goldschmidt
 * @author Fabian Schumacher
 * This file was created to manage the process of getting information about the weather at the current position of the device in use.
 * It implements the functionality of the "Get weather at my position"-button.
 */

"use strict"

// Variables

let buttonGetPosition = document.getElementById("buttonGetPosition"); //button to get the weather at the position
let currentPositionDiv = document.getElementById("currentPositionDiv"); //container to display the current position
let currentWeatherDiv = document.getElementById("currentWeatherDiv"); //container to display the weather at the position

// Functions

/**
 * When the user presses the button, the function asks the user whether he can query his location.
 */
 buttonGetPosition.addEventListener('click', function(){
    navigator.geolocation.getCurrentPosition(success, error);
})

/**
 * If the user allows us to get his current position, we use the incoming data in two further functions 
 * to get the information about the weather and to find out in which city he actually is (by doing reverse geocoding).
 * @param {GeolocationPosition} pos 
 */
function success(pos) {
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;

    loadWeatherAtPosition(latitude, longitude);
    getReadebleLocation(latitude,longitude);

    document.getElementById("accuracy").innerHTML = "Accuracy: " + pos.coords.accuracy + "m"; //displays the accuracy of the position
}

/**
 * If the user doesn't allow us to get his current position the function throws an error.
 * @param {error} error 
 */
function error(error) {
    alert("Error: User denied access to position");
}

/**
 * This function uses the mapbox api to do reverse geocoding.
 * We get readeble information about the location depending on the coordinates of his current position.
 * @param {float} latitude latitude coordinate of the position
 * @param {float} longitude longitude coordinate of the position
 */
function getReadebleLocation(latitude, longitude){
    let apiKey = mapboxApiKey;
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${apiKey}`, true)
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            let positionData = JSON.parse(this.responseText);
            var positionDescription = positionData.features[2].place_name;
            document.getElementById("positionDescription").innerHTML = positionDescription;
        } 
    }
}

/**
 * This function uses the openweather api to retrieve information about the weather at the users current position. 
 * @param {float} latitude latitude coordinate of the position
 * @param {float} longitude longitude coordinate of the position
 */
function loadWeatherAtPosition(latitude, longitude){
    let apiKey = openweatherApiKey;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            let weatherData = JSON.parse(this.responseText);
            showWeatherAtPosition(weatherData); //calls function to display the data
        } 
    }
    xhttp.open("GET", `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`, true);
    xhttp.send();

}

/**
 * This functions fills the html document with the weather data retrieved in the loadWeatherAtPosition function.
 * @param {JSON} weatherData 
 */
function showWeatherAtPosition(weatherData){
    currentPositionDiv.style.display = "block"; //changes visibility of the container to show the results
    currentWeatherDiv.style.display = "block"; //changes visibility of the container to show the results

    //displaying the date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let currentDt = new Date(weatherData.current.dt * 1000).toLocaleDateString("EN-EN", options);
    document.getElementById("currentDate").innerHTML = currentDt;

    //displaying current weather symbol
    let src = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
    document.getElementById("myImg").src = src;

    //displaying short weather description
    document.getElementById("weatherDescription").innerHTML = weatherData.current.weather[0].description

    //displaying the current temperature
    document.getElementById("currentTemp").innerHTML = "Current temperature: " + Math.round(weatherData.current.temp) + "°C";

    //displaying "feels-like" temperature
    document.getElementById("currentTempFeelsLike").innerHTML = "Feels-like temperature: " + Math.round(weatherData.current.feels_like) + "°C";

    //displaying the current wind (speed and direction)
    document.getElementById("currentWind").innerHTML = "Wind speed and direction: " + weatherData.current.wind_speed + " m/s, " + weatherData.current.wind_deg + "°";

    //displaying the current humidity 
    document.getElementById("currentHumidity").innerHTML = "Humidity: " + weatherData.current.humidity + "%";

    //displaying the current clouds
    document.getElementById("currentClouds").innerHTML = "Cloudiness: " + weatherData.current.clouds + "%";
}