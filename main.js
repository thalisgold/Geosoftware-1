"use strict"
/**
- function to find out whether a point is in a polygon or not.
- works only with polygons which are parellel to the longitude- and latitude-axis 
- Input: point [long,lat], leftUpperCorner (of the polygon) [long,lat], rightBottomCorner (of the polygon) [long, lat]
- returns true if the point is inside the polygon, else false
*/

const leftUpperCorner =  polygon[3];
const rightBottomCorner = polygon[1];

let resultArray = new Array(route.length); // create array to save results (now we know which points are in- or outside)
let intersectIndex = [];
let distancesPointToPoint = [];
let distancesSubsequences = [];
let contentTable = [];

function isPointInsidePolygon(point, leftUpperCornerBBox, rightBottomCornerBBox){
    return point[0] > leftUpperCorner[0] && point[0] < rightBottomCorner[0] && point[1] < leftUpperCorner[1] && point[1] > rightBottomCorner[1]
}

/**
for (let index = 0; index < route.length; index++) {
    console.log(isPointInsidePolygon(route[index],leftUpperCorner,rightBottomCorner));
    
}
*/

/**
function that fills the arrays with the results wheter the points of the route are in or outside the polygon
*/ 

function fillResultArray(){
    for (let index = 0; index < route.length; index++) {
        resultArray[index] = isPointInsidePolygon(route[index],leftUpperCorner,rightBottomCorner);
    }
}

function fillIntersectIndex(){
    for (let index = 0; index < resultArray.length; index++) {
        if(index == 0  || index == resultArray.length - 1){
            intersectIndex.push(index);
        } 
        else if (!resultArray[index] && (resultArray[index+1] || resultArray[index-1])) {
                intersectIndex.push(index);
        } 
    }

}


fillResultArray(); // fill array
fillIntersectIndex();
console.table(resultArray); //show array in console
console.table(intersectIndex);

// function that calculates distances in m between two points

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
  
function deg2rad(deg) {
    return deg * (Math.PI/180);
  }

  console.log(distanceInMeter(route[0],route[1]));

function calculatePointToPointDistances(){
  for (let index = 0; index < route.length-1; index++) {
      distancesPointToPoint[index] = distanceInMeter(route[index], route[index+1]);
  }
}

calculatePointToPointDistances();
console.table(distancesPointToPoint);

function calculateSubsequenceDistances(){
    for (let index = 0; index < intersectIndex.length-1; index++) {
        var sum = 0
        for (let i = intersectIndex[index]; i < intersectIndex[index + 1]; i++) {
            sum += distancesPointToPoint[i];
        }
        distancesSubsequences.push(sum);
    }
    
}

calculateSubsequenceDistances();
console.table(distancesSubsequences);

// Gesamte Länge berechnen, über alle Streckenlängen iterieren und aufaddieren
function totalDistance(){
    var sum = 0;
    for (let index = 0; index < distancesPointToPoint.length; index++) {
        sum += distancesPointToPoint[index];
    }
    return sum;
}

console.log(totalDistance());

//Wir wollen nun alle Daten in einem Array abspeichern also Länge der Abschnitte, Point 1 [lng, lat], Point 2 [lng, lat], und Streckenabschnitt
// Vielleicht auch inside/outside?
function fillContentTable(){ 
    for (let index = 0; index < distancesSubsequences.length; index++) {
        var tableRow = Array(3);
        tableRow[0] = index+1;
        tableRow[1] = distancesSubsequences[index];
        tableRow[2] = route[intersectIndex[index]];
        tableRow[3] = route[intersectIndex[index + 1]];
        tableRow[4] = resultArray[intersectIndex[index] + 1]

        contentTable.push(tableRow);
    }
}


fillContentTable(); //contentTable füllen
console.table(contentTable); //unsortiert ausgeben

contentTable.sort((a,b) => b[1]-a[1]); // Tabelle sortieren

console.table(contentTable); //Sortierte Tabelle ausgeben

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

convertArrayValues(contentTable); //Macht es für die Tabelle schön
console.table(contentTable);

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

console.table(contentTable);
document.getElementById("tbody").innerHTML = makeTableHTML(contentTable);
document.getElementById("pbody").innerHTML = "Total length: " + (Math.round(totalDistance() * 100) / 100) + " m";