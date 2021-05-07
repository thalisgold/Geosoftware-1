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
            let res = JSON.parse(this.responseText)
            console.log(res);
            //showWeatherAtPosition(res);
        } 
    }
    xhttp.open("GET", `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`, true);
    xhttp.send();

}

//showWeatherAtPosition(weatherData){}