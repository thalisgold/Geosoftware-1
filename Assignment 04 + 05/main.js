/**
 * @author Thalis Goldschmidt
 * This file was created to implement the functionalities of the map.
 */

"use strict"


//VARIABLES

//creates a map with a default view directed towards the center of germany
var map = L.map('map').setView([51.505, 10.27], 6);

//creates a layer of the OSM
var osmLayer = new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'});

//variable for the items drawn with the leaflet tool
var drawnItems = new L.FeatureGroup();

//new draw control for the given map. It only includes the "draw rectangle"-tool
var drawControl = new L.Control.Draw({
    draw: {
        circle: false,
        polyline: false,
        polygon: false,
        marker: false
    }
});

//featuregroup to store the markers
let markers = new L.featureGroup();

//variable for the route
var route = L.geoJson(Route_Uebung4.features[0].geometry);    

//variable for the basemap layer and its overlays to make it possible to switch between them
var baseMapLayer = { "OSM": osmLayer};
var overlays = { "Drawn items": drawnItems,
                 "Route": route}

//controls which layers are visible
L.control.layers(baseMapLayer, overlays).addTo(map);

//ADDING LAYER TO THE MAP

//adds OSM layer to map
osmLayer.addTo(map);

//adds route to map
route.addTo(map);

//adds the draw control to the map
map.addControl(drawControl);

//adds the layer with the drawn items to the map 
map.addLayer(drawnItems);


// FUNCTIONS

/**
 * If something is created with the drawing tool we call a function to generate markers at intersections.
 */
map.on(L.Draw.Event.CREATED, function(event){
    setMarkersToIntersections(event);
});

/**
 * Function that sets markers on the intersections of the route and polygon.
 * @param {leaflet.draw.event} event 
 */
function setMarkersToIntersections(event) {
    deleteMarkers(); //first delete all existing markers
    let intersections = calculateIntersections(event); 
    //If there is no intersection throw error
    if (intersections.features.length == 0){
        alert("No intersections with the route!")
    }
    //Add marker at intersection to map
    else{
        for (let i = 0; i < intersections.features.length; i++) {
                var marker = new L.marker([intersections.features[i].geometry.coordinates[1], intersections.features[i].geometry.coordinates[0]]); //[lat,lng] of intersection
                markers.addLayer(marker) //add marker to featuregroup of markers
                loadWeatherAtPositionJQAJAX(marker, intersections.features[i].geometry.coordinates[1], intersections.features[i].geometry.coordinates[0], openweatherApiKey); //load weather at position of the marker
        }
    }
    map.addLayer(markers); //adds the layer with all the markers to the map
}

/**
 * Function that deletes the markers and clears the drawn items featuregroup.
 */
function deleteMarkers(){
        map.removeLayer(markers);
        markers = new L.featureGroup();
        drawnItems.clearLayers();
}

/**
 * Function that calculates the intersections of two geojson objects.
 * @param {leaflet.draw.event} event 
 * @returns intersecting points
 */
function calculateIntersections(event){
    drawnItems.addLayer(event.layer); //adds the polygon to the drawn items
    var rectangle = drawnItems.toGeoJSON(); //creates a geojson out of the layer in drawnitems
    return turf.lineIntersect(rectangle, Route_Uebung4); //returns the intersecting point (using turf api)
}

/**
 * //Jquery ajax request for weatherdata using the openweather api.
 * @param {L.marker} marker the marker object
 * @param {float} latitude latitude of the marker
 * @param {float} longitude longitude of the marker
 */
function loadWeatherAtPositionJQAJAX(marker, latitude, longitude) {
    {$.ajax({url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${openweatherApiKey}`, method: "GET"})
    .done(function(response) {
        let weatherData = response; //weatherData new parameter for the following function
        loadLocationNameAtPositionJQAJAX(marker, weatherData, latitude, longitude); //function to retrieve information about the name of the location
     })
    .fail(function(xhr, status, errorThrown) {
        alert( "Error: Weather couldn't be loaded") //error if the request fails
        console.dir(xhr)
        console.log(status)
        console.log(errorThrown)
    })}
}   

/**
 * Jquery ajax request to get the name of the markers location using mapbox api.
 * @param {L.marker} marker the marker object
 * @param {*} weatherData data about the weather on the markers location
 * @param {float} latitude latitude of the marker
 * @param {float} longitude longitude of the marker
 */
function loadLocationNameAtPositionJQAJAX(marker, weatherData, latitude, longitude){
    {$.ajax({url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxApiKey}`, method: "GET"})
        .done(function(response) {
            let locationName = response.features[2].place_name; //retrieving the necessary information about the name from the response of the ajax request
            createPopupInfo(marker, weatherData, locationName); //creating the popup for the marker
        })
        .fail(function(xhr, status, errorThrown) {
            alert( "Error: Location name couldn't be loaded") //error if the request fails
            console.dir(xhr)
            console.log(status)
            console.log(errorThrown)
        })
    }
}

/**
 * Function that gets all information needed (weather at the markers location and the locations name) and binds it on the popup of the marker.
 * @param {L.marker} marker the marker object
 * @param {*} weatherData data about the weather on the markers location
 * @param {*} locationName the location name
 */
function createPopupInfo(marker, weatherData, locationName){
    //variable for the date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let currentDt = new Date(weatherData.current.dt * 1000).toLocaleDateString("EN-EN", options);
 
    //variable for current weather symbol
    let src = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
 
    //variable for short weather description
    let weatherDescription = weatherData.current.weather[0].description
 
    //variable for the current temperature
    let currentTemp =  "Temperature: " + Math.round(weatherData.current.temp) + "°C";

    //variable for the current wind
    let currentWind = "Wind speed and direction: " + weatherData.current.wind_speed + " m/s, " + weatherData.current.wind_deg + "°";

    //variable for the humidity
    let humidity = "Humidity: " + weatherData.current.humidity + "%";
 
    //displaying all the variables created before
    marker.bindPopup("<center>" + "<h5>" + locationName + "</h5>" + "</br>" 
                                + currentDt + "</br>"
                                + "<img src = " + src + " />" + "</br>"
                                + weatherDescription + "</br>"
                                + currentTemp + "</br>"
                                + humidity + "</br>"
                                + currentWind + "</center>");
}