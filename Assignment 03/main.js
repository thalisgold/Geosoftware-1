function success(pos) {
    let position = pos.coords;
    let latitude = position.latitude;
    let longitude = position.longitude;
    

    loadWeatherAtPosition(latitude, longitude);


    document.getElementById("coordinates").innerHTML = `[${position.longitude}, ${position.latitude}]`;
    document.getElementById("accuracy").innerHTML = `Accuracy in meter:  ${position.accuracy}`;
}

function error(error) {
    alert("Error: User denied access to position");
}

let buttonGetPosition = document.getElementById("buttonGetPosition");
buttonGetPosition.addEventListener('click', function(){
    navigator.geolocation.getCurrentPosition(success, error);
})

function loadWeatherAtPosition(latitude, longitude){
    let apiKey = "817a6d7b9d3034dc29c06604bd82846a";
    var xhttp = new XMLHttpRequest();
    //xhttp.onload = loadcallback;
    //xhttp.onerror = errorcallback;
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            let weatherData = JSON.parse(this.responseText)
            console.log(weatherData);
            showWeatherAtPosition(weatherData);
        } 
    }
    xhttp.open("GET", `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`, true);
    xhttp.send();

}

function showWeatherAtPosition(weatherData){
    //displaying the date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let currentDt = new Date(weatherData.current.dt * 1000).toLocaleDateString("EN-EN", options);
    document.getElementById("currentDate").innerHTML = "Date: " + currentDt;

    //displaying the current temperature
    console.log(weatherData.current.temp);
    document.getElementById("currentTemp").innerHTML = "Current temperature: " + weatherData.current.temp + " [celcius]";

    //displaying "feels-like" temperature
    document.getElementById("currentTempFeelsLike").innerHTML = "Feels-like temperature: " + weatherData.current.feels_like + " [celsius]";

    //displaying the current wind
    document.getElementById("currentWind").innerHTML = "Wind speed/direction: " + weatherData.current.wind_speed + " [m/s]/" + weatherData.current.wind_deg + " [degrees]";

    //displaying the current humidity 
    document.getElementById("currentHumidity").innerHTML = "Humidity: " + weatherData.current.humidity + "[%]";

    //displaying the current clouds
    document.getElementById("currentClouds").innerHTML = "Cloudiness: " + weatherData.current.clouds + "[%]";

    //displaying current rain
    //document.getElementById("currentRain").innerHTML = "Rainfall in the last 60 minutes: " + weatherData.current.rain.1h + "[mm]";

    //displaying current weather symbol
    let src = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
    img = document.createElement('img');
    img.src = src;
    document.body.appendChild(img);
}