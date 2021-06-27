/**
 * The script provides functions to create, manipulate and add thngs to leaflet maps
 * @author Fabian Schumacher
 * @version 4.0.1
 */
"use strict"

// Basemap options
 let osmTileLayerOptions = {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
};

// Default map options
let mapOptionsDefault = {
    drawControl: false
}


/**
 * The function creates the leaflet map with the view set to Germany with a zoom level, so that the whole country can be seen in the map window.
 * 
 * @param {String} htmlID - the HTML-id of the division in which the map is displayed
 * @param {Object} mapOptionsDefault - the default map options used for the initialization
 * @returns - the leaflet map object
 */
function createMap(htmlID = 'map', mapOptions = mapOptionsDefault) {
     return L.map(htmlID, mapOptions).setView([51.505, 10.27], 6);
}


/**
 * The functions adds a mapbox/openstreet tilelayer to the map with the osmTileLayerOptions
 * 
 * @param {L.Map} mapObj - the Leaflet map object stored in the variable
 * @returns - the tile layer, which will be added to map
 */
function addTileLayer(mapObj) {
    return new L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxToken}`, osmTileLayerOptions).addTo(mapObj);
}


/**
 * The function is being called every time a new reactangle is drawed in the map.
 * It first deletes all the markers that were set from the previous drawn reactangle, then calculates the new intersections
 * and adds a marker with the weather information on each intersection.
 * 
 * @param {L.Leaflet.Draw.Event} event
 */
function addWeatherMarkersAtIntersections(event, route){
    deleteCurrentMarkers();
    let intersections = calculateIntersections(event, route);
    for (let i = 0; i < intersections.features.length; i++) {
        addMarker(intersections, i);
    }
    map.addLayer(markers);
}


/**
 * The function calculates and returns the intersections of the reactangle with the given route.
 * It accesses the reactangle over the event and the layer the event creates. First the reactangle is added to the drawnItems FeatureGroup.
 * Then the intersections are calculated. The lineIntersect-method is from the turf library.
 * 
 * @param {L.Leaflet.Draw.Event} event - the draw event - hold information about the drawn items
 * @param {GeoJSON object} Route_Uebung4 - FeatureCollection that holds a MultiLineString stored 
 * @returns - the intersction/s as GeoJSON
 */
function calculateIntersections(event, route) {
    drawnItems.addLayer(event.layer);
    return turf.lineIntersect(route, drawnItems.toGeoJSON());
}


/**
 * The function is called in addWeatherMarkersAtIntersections(event) adds a marker for every intersection index i in the intersections.
 * To achieve this the function creates new Coordinate Objects from class Coordinates (defined in coordinates.js) and calls the function
 * createPositionMarkers(coordObj) with the Coordinate-object.
 *  
 * @param {GeoJSON object} intersections - FeatureCollection which holds the intersections of the reactangle with the given route
 * @param {integer} i - index of the intersection in the FeatureCollection on which the function is currently calculating/working
 */
function addMarker(intersections, i){
    console.log(intersections)
    let coordinates = intersections.features[i].geometry.coordinates
    let coordObj = new Coordinate(coordinates[1], coordinates[0]);
    createPositionMarkers(coordObj);
}


/**
 * The function creates a marker for the given coordinates, adds the marker to the marker FeatureGroup and
 * calls the getWeatherData-function with the coordinates.
 * 
 * @param {Coordinate} coordObj - Coordinate Object - used to create the marker and 
 */
function createPositionMarkers(coordObj) {
    let marker = new L.marker([coordObj.latitude, coordObj.longitude]);
    getWeatherData(coordObj.latitude, coordObj.longitude, marker);
    markers.addLayer(marker);
}


/**
 * The function removes all the current markers from the map and sets the markers variable to a new empty FeatureGroup.
 * Optional: Removes the drawn reactangle 3 seconds after it was created
 * 
 */
function deleteCurrentMarkers(){
    map.removeLayer(markers);
    markers = new L.FeatureGroup();
    setTimeout(function deleteDrawnItems(){drawnItems.clearLayers()}, 3000);
}


/**
 * The function makes an asynchronous HTTP request (ajax) to the openWeatherAPI and gets the weather
 * for the coordinates of the intersection(the marker). If the request was successfull it calls the getReadableLocation()-function
 * and provides it with the marker and the requested weatherData.
 * 
 * @param {float} latitude - latitude coordinate of the intersection
 * @param {float} longitude - longitude coordinate of the intersection
 * @param {L.Marker} marker - the marker currently "working" on
 */
function getWeatherData(latitude, longitude, marker) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${openweatherAPIKey}`,
        method: "GET"
    })
    .done(function(weatherData){                                        // if the request was successfull
        getReadableLocation(latitude, longitude, marker, weatherData);
    })
    .fail(function(xhr, status, errorThrown){                           // if the request fails
        alert("error");
        console.dir(xhr)
        console.log(status)
        console.log(errorThrown)
    })
}


/**
 * The function makes an asynchronous HTTP request (ajax) to the mapboxGeocodingAPI and gets the readably information about
 * the location of the intersection. If the request was successfull it calls the createWeatherMarkerPopup()-function
 * and provides it with the marker, the weatherData and the requested information about the location.
 * 
 * @param {float} latitude - latitude coordinate of the intersection
 * @param {float} longitude - longitude coordinate of the intersection
 * @param {L.Marker} marker - the marker currently "working" on
 * @param {object} weatherData - the weatherData requested in the getWeatherData()-function
 */
function getReadableLocation(latitude, longitude, marker, weatherData) {
    $.ajax({
        url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxToken}`,
        method: "GET"
    })
    .done(function(location){                                           // if the request was succesfull
        createWeatherMarkerPopup(marker, weatherData, location);
    })
    .fail(function(xhr, status, errorThrown){                           // if the request fails
        alert("error");
        console.dir(xhr)
        console.log(status)
        console.log(errorThrown)
    })
}


/**
 * The function creates a leaflet Popup for the marker and fills it with the weather information and
 * a readable location description.
 * 
 * @param {object} result 
 * @param {L.Marker} marker 
 */
function createWeatherMarkerPopup(marker, weatherData, location){

    // create weather Image
    let weatherImage = new Image();
    weatherImage.src = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`

    // craete date-object and define the 
    let date = new Date(weatherData.current.dt*1000)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};

    // create Popup with the weather and location<s information
    marker.bindPopup(  `<h5>${location.features[2].place_name}</h5>
                        <p>${date.toLocaleDateString('en-EN', options)}</p>
                        <p><img src = ${weatherImage.src}></img></p>
                        <p>${weatherData.current.weather[0].description}</p>
                        <p>${"Temperature: " + Math.round(weatherData.current.temp) + "°C"}<br>
                        ${"Windspeed: " + weatherData.current.wind_speed + " m/s"}<br>
                        ${"Wind direction: " + weatherData.current.wind_deg + "°"}<br>
                        ${"Humidity: " + weatherData.current.humidity + " %"}<br>
                        ${"Cloudiness: " + weatherData.current.clouds + " %"}</p>`)
}