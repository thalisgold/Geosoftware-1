/**
 * @author Thalis Goldschmidt
 * Matrikelnr.: 462238
 * This file was created to manage the upload process of the geojson files (route and polygon)
 */

 "use strict"

 let uploaddiv = document.getElementById("uploadform");
 let uploadfield = document.getElementById("uploadfield");

 let buttondiv = document.getElementById("buttons");
 let buttonUploaded = document.getElementById("button1"); 
 let buttonDefault = document.getElementById("button2"); 

 let result3div = document.getElementById("result3");
 let result4div = document.getElementById("result4");


 let tablediv = document.getElementById("dataTable");


buttonUploaded.addEventListener("click", function(){
    if (uploadfield.files.length > 0){
        var reader = new FileReader();
        reader.readAsText(uploadfield.files[0]);
        reader.addEventListener("load", function(){
            let inputRouteAsGeoJSON = JSON.parse(reader.result);
            let inputRouteAsString = JSON.stringify(inputRouteAsGeoJSON);
            let polygonAsGeoJSON = makePolygonToGeoJSON(polygon)
            let polygonAsString = JSON.stringify(polygonAsGeoJSON);

            showResultTable(inputRouteAsGeoJSON, inputRouteAsString, polygonAsString);
        })
    }  
    else
        alert("Error: No file was uploaded")
})

buttonDefault.addEventListener("click", function(){
    let defaultRouteAsGeoJSON = makePointArrayToGeoJSON(route);
    let defaultRouteAsString = JSON.stringify(defaultRouteAsGeoJSON);
    let polygonAsGeoJSON = makePolygonToGeoJSON(polygon)
    let polygonAsString = JSON.stringify(polygonAsGeoJSON);
    showResultTable(defaultRouteAsGeoJSON, defaultRouteAsString, polygonAsString);    
})

function showResultTable(route, routeAsString, polygonAsString){
    let dataTable = calculateTableData(route.coordinates);
    tablediv.style.display = "block";
    document.getElementById("tbody").innerHTML = makeTableHTML(dataTable);
    document.getElementById("pbody").innerHTML = "Total length: " + (Math.round(totalDistance(route.coordinates) * 100) / 100) + " m";
    document.getElementById("result3").innerHTML = routeAsString;
    document.getElementById("result4").innerHTML = polygonAsString;
}

let showRouteAsGeoJSON = false;

button3.addEventListener("click", function(){
    if (showRouteAsGeoJSON == false)
    {
        result3div.style.display = "block";
        showRouteAsGeoJSON = true;
    }   
    else
    {
        result3div.style.display = "none";
        showRouteAsGeoJSON = false;

    }
})

let showPolygonAsGeoJSON = false;

button4.addEventListener("click", function(){
    if (showPolygonAsGeoJSON == false){
        result4div.style.display = "block";
        showPolygonAsGeoJSON = true;
    }
    else
    {
        result4div.style.display = "none";
        showPolygonAsGeoJSON = false;
    }
})

function makePointArrayToGeoJSON(inputPoints){
    let json = {
        "type": "LineString",
        "coordinates": inputPoints,
    }

    return json;
}

function makePolygonToGeoJSON(inputPoints){
    let json = {
        "type": "Polygon",
        "coordinates": inputPoints,
    }

    return json;
}


 // Commands
 
 //let dataTable = calculateTableData(route); //Create table depending on given route and polygon. Parameters of the given polygon don't habe to be handed over because they were set as default values
 //dataTable.sort((a,b) => b[1]-a[1]); //Sort table
 //convertTableValues(dataTable); //Make the table look nicer