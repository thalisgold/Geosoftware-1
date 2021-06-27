/**
 * Main script that calls the function, which provides the map divison with necessary data
 * @author Fabian Schumacher
 * @since 4.0.1
 */

"use strict"

// get a first map into the HTML-document and store the map object in the variable
var map = createMap();

// get the tilelayer for the map and store it into a variable
var osmLayer = addTileLayer(map);

// Variable for the items drawn with the leaflet tool. Uses a feature group to store the editable layers
var drawnItems = new L.FeatureGroup();

// FeatureGroup to store the markers
let markers = new L.FeatureGroup();

// New draw control for the given map, in which only the reactangle tool is provided
var drawControl = new L.Control.Draw({
    draw: {
        polygon: false,
        polyline: false,
        marker: false,
        circle: false,
        circlemarker: false
    },
});


// Variable that holds the given route
var routeUnprocessed = routeDB;

// adds the route to the map
var route = L.geoJson(routeUnprocessed.geometry);
route.addTo(map);

// adds the layer with drawn items to the map
map.addLayer(drawnItems);

// adds the draw control to the map
map.addControl(drawControl);

//Variables used for handling the layer control
var baseMap = { "OSM": osmLayer};
var overlayMap = {"Route": route}

// adds the layer control to the map
L.control.layers(baseMap, overlayMap).addTo(map);

// the function gets called every time the event (new reactangnle drawn) happens
map.on('draw:created', function(event) {
    // adds markers with weather information
    addWeatherMarkersAtIntersections(event, routeUnprocessed);
    console.log(route);

 })
