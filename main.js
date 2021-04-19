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

function totalDistance(){
    var sum = 0;
    for (let index = 0; index < distancesPointToPoint.length; index++) {
        sum += distancesPointToPoint[index];
    }
    return sum;
}

console.log(totalDistance());