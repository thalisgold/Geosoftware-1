"use strict"
//Variables

const leftUpperCorner =  polygon[3]; //Left upper corner of the polygon. It is constant because the polygon remains the same for all points.
const rightBottomCorner = polygon[1]; //Right bottom corner of the polygon. It is constant because the polygon remains the same for all points.

let pointsInsideOrOutsideArray = []; // [boolean] Array that stores the results of all calculations to find out whether a point lies inside or outside the polygon
let intersectIndexArray = []; // [integer] Array that stores the indices, where the route enters or leaves the polygon
let distancesPointToPoint = []; // [float] Array that stores all distances between consecutive points 
let distancesSubsequences = []; // [float] Array that stores the calculated distances of the subsequences that were formed by the polygon
let resultTable = []; // Array that stores information about the route section, the length of the route, the start- and end point and if the route lies within or outside the given polygon

//Functions

/**
 * The function finds out whether a point is in- or outside a given polygon.
 * It only works with polygons which are parellel to the longitude- and latitude-axis.
 * @param {[float,float]} coordinates of one point given in [lng/lat] 
 * @param {[float,float]} leftUpperCornerBBox the left upper corner of the polygon given in [lng/lat] 
 * @param {[float,float]} rightBottomCornerBBox the right bottom corner of the polygon given in [lng/lat] 
 * @returns true if the point is inside the polygon otherwise false
 */
function isPointInsidePolygon(coordinates, leftUpperCornerBBox, rightBottomCornerBBox){
    return coordinates[0] > leftUpperCorner[0] && coordinates[0] < rightBottomCorner[0] && coordinates[1] < leftUpperCorner[1] && coordinates[1] > rightBottomCorner[1]
}


/**
 * This function fills the PointsInsideOrOutside-Array 
 */
function fillPointsInsideOrOutside(){
    for (let index = 0; index < route.length; index++) {
        pointsInsideOrOutsideArray[index] = isPointInsidePolygon(route[index],leftUpperCorner,rightBottomCorner); //For each point the function decides if the point is in- or outside the polygon
    }
}

/**
 * The goal of the function is to find the indices where the route enters or leaves the polygon and to store the result in the IntersectIndexArray. 
 */
function fillIntersectIndexArray(){
    for (let index = 0; index < pointsInsideOrOutsideArray.length; index++) {
        if(index == 0  || index == pointsInsideOrOutsideArray.length - 1){
            intersectIndexArray.push(index); //The first and last point of the route have to be in the array, because they are always part of the indices
        } 
        else if (!pointsInsideOrOutsideArray[index] && (pointsInsideOrOutsideArray[index+1] || pointsInsideOrOutsideArray[index-1])) {
                intersectIndexArray.push(index); //The route enters or leaves the polygon only when the boolean is false and the next or previous is true
        } 
    }

}

/**
 * This function calculates distances in m between two points.
 * Link: https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
 * @param {[float,float]} p1 given in [lng/lat] 
 * @param {[float,float]} p2 given in [lng/lat] 
 * @returns distance between the two points in meters.
 */
function distanceInMeter(p1,p2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(p2[1]- p1[1]);  // deg2rad below
    var dLon = deg2rad(p2[0]- p1[0]); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(p1[1])) * Math.cos(deg2rad(p2[1])) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d*1000;
  }
  
/**
 * The function converts coordinates in degrees into coordinates of radiants.
 * @param {float} deg coordinates (deg)
 * @returns converted coordinates (rad)
 */
function deg2rad(deg) {
    return deg * (Math.PI/180);
  }

/**
 * The function calculates all distances between consecutive points and saves them in the distancesPointToPoint-Array.
 */
function calculatePointToPointDistances(){
  for (let index = 0; index < route.length-1; index++) {
      distancesPointToPoint[index] = distanceInMeter(route[index], route[index+1]);
  }
}

/**
 * Function, that calculates the distances of the subsequences that were formed by the polygon. It saves the distances in the distancesSubsequences-Array.
 */
function calculateSubsequenceDistances(){
    for (let index = 0; index < intersectIndexArray.length-1; index++) {
        var sum = 0
        for (let i = intersectIndexArray[index]; i < intersectIndexArray[index + 1]; i++) {
            sum += distancesPointToPoint[i];
        }
        distancesSubsequences.push(sum);
    }
    
}

/**
 * This funtion calculates the total length of the route and returns it.
 * @returns
 */
function totalDistance(){
    var sum = 0;
    for (let index = 0; index < distancesPointToPoint.length; index++) {
        sum += distancesPointToPoint[index]; //Iterate and add up over all consecutive point distances
    }
    return sum;
}

/**
 * This fuction fills the resultTable-Array with all attributes that we are going do display in our table.
 * The array stores information about the route section, the length of the route, the start- and end point and if the route lies in- or outside the given polygon
 */
function fillResultTable(){ 
    for (let index = 0; index < distancesSubsequences.length; index++) {
        var tableRow = [];
        tableRow[0] = index+1;
        tableRow[1] = distancesSubsequences[index];
        tableRow[2] = route[intersectIndexArray[index]];
        tableRow[3] = route[intersectIndexArray[index + 1]];
        tableRow[4] = pointsInsideOrOutsideArray[intersectIndexArray[index] + 1]

        resultTable.push(tableRow);
    }
}

/**
 * This function converts the values in the result table.
 * The function rounds the lengths to two decimal places, brackets the coordinates and converts "True" to "Yes" and "False" to "No".
 * @param {Array[][]} myArray two-dimensional Array
 */
function convertArrayValues(myArray) {
    for(var i=0; i<myArray.length; i++) {
        for(var j=0; j<myArray[i].length; j++){
           if (j == 1){
                myArray[i][j] = Math.round(myArray[i][j] * 100) / 100;
           }
           if (j == 2 || j == 3){
                myArray[i][j] = "(" + myArray[i][j] + ")";
           }
           if (j == 4) {
               if (myArray[i][j] == true) {
                    myArray[i][j] = "Yes";
               }
               if (myArray[i][j] == false) {
                    myArray[i][j] = "No";
               }

           }
        }
    }
}

/**
 * This function creates html-code to generate a table out of a two-dimensional array.
 * @param {Array[][]} myArray two-dimensional array
 * @returns HTML-code to generate a table
 */
function makeTableHTML(myArray) {
    var result = "<table border=1>";
    for(var i=0; i<myArray.length; i++) {
        result += "<tr>";
        for(var j=0; j<myArray[i].length; j++){
            result += "<td>"+myArray[i][j]+"</td>";
        }
        result += "</tr>";
    }
    result += "</table>";

    return result;
}

// Commands

fillPointsInsideOrOutside();
fillIntersectIndexArray();
calculatePointToPointDistances();
calculateSubsequenceDistances();
fillResultTable();
resultTable.sort((a,b) => b[1]-a[1]); //Sort table
convertArrayValues(resultTable); //Make it look nice

//Display the results in console
console.table(pointsInsideOrOutsideArray); //Display the arrays in console
console.table(intersectIndexArray);
console.table(distancesPointToPoint);
console.table(distancesSubsequences);
console.log(totalDistance()); //Display total length
console.table(resultTable); //Display sorted and converted result table

document.getElementById("tbody").innerHTML = makeTableHTML(resultTable); //Refers to the table body from the html-document and inserts the code created in the makeTableHTML-function.
document.getElementById("pbody").innerHTML = "Total length: " + (Math.round(totalDistance() * 100) / 100) + " m"; //Refers to the paragraph of the html-document and creates the output for the total length.