/**
 * @author Thalis Goldschmidt
 * Matrikelnr.: 462238
 * This file was created to manage the upload process of a route as a .geojson file and to implement the 
 * functionalities for the created buttons.
 */

 "use strict"


 //Variables

 let uploaddiv = document.getElementById("uploaddiv"); //container for the upload field
 let uploadfield = document.getElementById("uploadfield"); //upload field where you can upload the .geojson file of a route

 let buttondiv = document.getElementById("buttonsdiv"); //container for the buttons where you can choose if you want to use the uploaded or default route
 let buttonUploaded = document.getElementById("buttonUploaded");  //button to use the uploaded file 
 let buttonDefault = document.getElementById("buttonDefault");  //button to use the default file

 let tablediv = document.getElementById("dataTable"); //container for the table that has to be calculated

 let buttonsAsStringsdiv = document.getElementById("buttonsAsStringdiv") //container for the buttons to show the chosen route or polygon as string

 let routeAsStringdiv = document.getElementById("routeAsStringdiv") //container to show the selected or default .geojson file as string
 let buttonRouteAsString = document.getElementById("buttonRouteAsString"); //button to display the .geojson file of the chosen route as a string

 let polygonAsStringdiv = document.getElementById("polygonAsStringdiv") //container to show the .geojson file of the polygon file as a string
 let buttonPolygonAsString = document.getElementById("buttonPolygonAsString"); ////button to display the .geojson file of the polygon as a string
 

 //Functions

 /**
  * Implements the functionalities of the button "Use uploaded .geojson file".
  * This function first creates all necessary parameters out of the uploaded route for the showResultTable function and then 
  * calls it to calculate the data table.
  */
buttonUploaded.addEventListener("click", function(){
    buttonsAsStringsdiv.style.display = "block"; //makes the buttons that can show the route or polygon as string visible
    if (uploadfield.files.length > 0){ //if someone has uploaded a file
        var reader = new FileReader(); //creates a reader
        if (checkFileExtension()){ //checks if the uploaded file is of the type .geojson
            reader.readAsText(uploadfield.files[0]); //reads the file
            reader.addEventListener("load", function(){ //loads the file
                let inputRouteAsGeoJSON = JSON.parse(reader.result); //creates a .json file of the uploaded route 
                if (inputRouteAsGeoJSON.type == "LineString") //checks if the .json object is of the type "LineString"
                {
                    let inputRouteAsString = JSON.stringify(inputRouteAsGeoJSON); //transforms the .json file of the route into a string
                    let polygonAsGeoJSON = makePointArrayToGeoJSONPolygon(polygon) //creates a .geojson file of the polygon
                    let polygonAsString = JSON.stringify(polygonAsGeoJSON); // transforms the .geojson file of the polygon into a string

                    showResultTable(inputRouteAsGeoJSON, inputRouteAsString, polygonAsString); //hands over all parameters needed to calculate the data table
                }
                else 
                    alert("Error: The .geojson file is not of the type LineString") //if the .json type is not of the type LineString
            })
        }  
        else
            alert("Error: The file uploaded needs to be a .geojson file") //if the uploaded file is not of the type .geojson
    }
    else 
        alert("Error: No file was uploaded") //if the upload field is empty

})

/**
 * This function checks if the file extension of the uploaded file is .geojson.
 * @returns true if the file extesion is .geojson else false
 */
function checkFileExtension() {
    let fileName = document.getElementById("uploadfield").value;
    let extension = fileName.split('.').pop();
    if (extension == "geojson"){
        return true;
    }
    else{
        return false;
    }
};

/**
 * Implements the functionalities of the button "Use default .geojson file".
 * This function first creates all necessary parameters out of default route for the showResultTable function and then 
 * calls it to calculate the data table.
 * The function doesn't need to read a file, because it works with the default route.
 */
buttonDefault.addEventListener("click", function(){
    buttonsAsStringsdiv.style.display = "block"; //makes the buttons that can show the route or polygon as string visible
    let defaultRouteAsGeoJSON = makePointArrayToGeoJSONLineString(route); //creates a .geojson file of the default route
    let defaultRouteAsString = JSON.stringify(defaultRouteAsGeoJSON); //transforms the .geojson file of the route into a string
    let polygonAsGeoJSON = makePointArrayToGeoJSONPolygon(polygon) //creates a .geojson file of the polygon
    let polygonAsString = JSON.stringify(polygonAsGeoJSON); // transforms the .geojson file of the polygon into a string

    showResultTable(defaultRouteAsGeoJSON, defaultRouteAsString, polygonAsString);    
})

/**
 * This function creates the result table.
 * @param {.geojson} route as a .geojson file 
 * @param {string} routeAsString the .geojson file of the route as a string
 * @param {string} polygonAsString  the .geojson file of the polygon as a string
 */
function showResultTable(route, routeAsString, polygonAsString){
    let dataTable = calculateTableData(route.coordinates); //calculates the data table of the route depending on its coordinates
    tablediv.style.display = "block"; //changes the visibility of the table container so that the table can be displayed on the website
    document.getElementById("tbody").innerHTML = makeTableHTML(dataTable); //refers to the table body from the html-document and inserts the code generated from the makeTableHTML function
    document.getElementById("pbody").innerHTML = "Total length: " + (Math.round(totalDistance(route.coordinates) * 100) / 100) + " m"; //refers to the paragraph of the html-document and creates the output for the total length of the route
    document.getElementById("paragraphRouteAsString").innerHTML = routeAsString; //stores the string of the .geojson file of the used route in this paragraph of the html document
    document.getElementById("paragraphPolygonAsString").innerHTML = polygonAsString; //stores the string of the .geojson file of the polygon in this paragraph of the html document
}

/**
 * Implements the functionalities of the button "Show selected route as .geojson file".
 * It should display the string of the .geojson file of the route if we click on it.
 * If we click on it again it should no longer be displayed.
 */
let showRouteAsString = false; //by default the div where the string of the .geojson file of the route is shown is not displayed
buttonRouteAsString.addEventListener("click", function(){
    if (showRouteAsString == false) //if it is not displayed and we click on the button it shoud be displayed
    {
        routeAsStringdiv.style.display = "block";
        showRouteAsString = true;
    }   
    else
    {
        routeAsStringdiv.style.display = "none"; //if it is displayed and we click on the button it should not be displayed
        showRouteAsString = false;

    }
})

/**
 * Implements the functionalities of the button "Show polygon as .geojson file".
 * It should display the string of the .geojson file of the polygon if we click on it.
 * If we click on it again it should no longer be displayed.
 */
let showPolygonAsString = false; //by default the div where the string of the .geojson file of the polygon is shown is not displayed
buttonPolygonAsString.addEventListener("click", function(){
    if (showPolygonAsString == false) //if it is not displayed and we click on the button it shoud be displayed
    { 
        polygonAsStringdiv.style.display = "block";
        showPolygonAsString = true;
    }
    else
    {
        polygonAsStringdiv.style.display = "none"; //if it is displayed and we click on the button it should not be displayed
        showPolygonAsString = false;
    }
})

/**
 * This function converts an two dimensional array into a .geojson file of the type "LineString".
 * @param {[[number,number]]} inputPoints two dimensional array of numbers
 * @returns a .geojson file of the type "LineString"
 */
function makePointArrayToGeoJSONLineString(inputPoints){
    let geojson = {
        "type": "LineString",
        "coordinates": inputPoints,
    }

    return geojson;
}

/**
 * This function converts an two dimensional array into a .geojson file of the type "Polygon".
 * @param {[[number,number]]} inputPoints two dimensional array of numbers
 * @returns a .geojson file of the type "Polygon"
 */
function makePointArrayToGeoJSONPolygon(inputPoints){
    let geojson = {
        "type": "Polygon",
        "coordinates": inputPoints,
    }

    return geojson;
}