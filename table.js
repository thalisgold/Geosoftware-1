/**
 * @author Thalis Goldschmidt
 * Matrikelnr.: 462238
 * This file includes all functions that are necessary to create the data needed for the table.
 */

 "use strict"

 //Variables
 
 const leftUpperCorner =  polygon[3]; //Left upper corner of the polygon. It is constant because the polygon remains the same for all points.
 const rightBottomCorner = polygon[1]; //Right bottom corner of the polygon. It is constant because the polygon remains the same for all points.
 
 //Functions
 
 /**
  * The function finds out whether a point is in- or outside a given polygon.
  * It only works with polygons which are parellel to the longitude- and latitude-axis.
  * @param {[number,number]} point given in [lng/lat] 
  * @param {[number,number]} leftUpperCornerBBox the left upper corner of the polygon given in [lng/lat] 
  * @param {[number,number]} rightBottomCornerBBox the right bottom corner of the polygon given in [lng/lat] 
  * @returns true if the point is inside the polygon otherwise false
  */
 function isPointInsidePolygon(point, leftUpperCornerBBox = leftUpperCorner, rightBottomCornerBBox = rightBottomCorner){
     return point[0] > leftUpperCornerBBox[0] && point[0] < rightBottomCornerBBox[0] && point[1] < leftUpperCornerBBox[1] && point[1] > rightBottomCornerBBox[1]
 }
 
 /**
  * This function calculates if the points of a route lie within or outside a given polygon and returns an array with the stored results.
  * @param {[[number,number]]} route array of points given in [lng/lat]
  * @param {[number,number]} leftUpperCornerBBox the left upper corner of the polygon given in [lng/lat]
  * @param {[number,number]} rightBottomCornerBBox the right bottom corner of the polygon given in [lng/lat] 
  * @returns array of booleans that stores the results of all calculations to find out whether a point lies inside or outside the given polygon
  */
 function calculatePointsInsideOrOutside(route, leftUpperCornerBBox, rightBottomCornerBBox){
     let pointsInsideOrOutside = [];
     for (let index = 0; index < route.length; index++) {
         pointsInsideOrOutside[index] = isPointInsidePolygon(route[index],leftUpperCornerBBox,rightBottomCornerBBox); //For each point the function decides if the point is in- or outside the polygon
     }
     return pointsInsideOrOutside;
 }
 
 /**
  * The goal of the function is to find the indices where the route enters or leaves a given polygon and to return an array with the stored results.
  * @param {[[number,number]]} route array of points given in [lng/lat]
  * @param {[number,number]} leftUpperCornerBBox the left upper corner of the polygon given in [lng/lat]
  * @param {[number,number]} rightBottomCornerBBox the right bottom corner of the polygon given in [lng/lat] 
  * @returns array that stores the indices where the route enters or leaves the given polygon
  */
 function calculateIntersectIndices(route, leftUpperCornerBBox, rightBottomCornerBBox){
     let intersectIndices = [];
     let pointsInsideOrOutside = calculatePointsInsideOrOutside(route, leftUpperCornerBBox, rightBottomCornerBBox);
     for (let index = 0; index < pointsInsideOrOutside.length; index++) {
         if(index == 0  || index == pointsInsideOrOutside.length - 1){
             intersectIndices.push(index); //The first and last point of the route have to be in the array, because they are always part of the indices
         } 
         else if (!pointsInsideOrOutside[index] && (pointsInsideOrOutside[index+1] || pointsInsideOrOutside[index-1])) {
                 intersectIndices.push(index); //The route enters or leaves the polygon only when the boolean is false and the next or previous is true
         } 
     }
     return intersectIndices;
 }
 
 /**
  * This function calculates distances in m between two points.
  * Link: https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
  * @param {[number,number]} p1 given in [lng/lat] 
  * @param {[number,number]} p2 given in [lng/lat] 
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
  * The function converts a point in degrees into a point of radiants.
  * @param {number} deg point (deg)
  * @returns converted point (rad)
  */
 function deg2rad(deg) {
     return deg * (Math.PI/180);
   }
 
 /**
  * The function calculates all distances between consecutive points and returns an array with the stored results.
  * @param {[[number,number]]} route array of points given in [lng/lat]
  * @returns array that stores all distances between consecutive points 
  */
 function calculatePointToPointDistances(route){
     let pointToPointDistances = [];
     for (let index = 0; index < route.length-1; index++) {
       pointToPointDistances[index] = distanceInMeter(route[index], route[index+1]);
     }
     return pointToPointDistances;
 }
 
 /**
  * Function, that calculates the distances of the subsequences that were formed by the polygon and returns an array with the stored results.
  * @param {[[number,number]]} route array of points given in [lng/lat]
  * @param {[number,number]} leftUpperCornerBBox the left upper corner of the polygon given in [lng/lat]
  * @param {[number,number]} rightBottomCornerBBox the right bottom corner of the polygon given in [lng/lat] 
  * @returns array that stores the calculated distances of the subsequences that were formed by the polygon
  */
 function calculateSubsequenceDistances(route, leftUpperCornerBBox, rightBottomCornerBBox){
     let subsequenceDistances = [];
     let intersectIndices = calculateIntersectIndices(route, leftUpperCornerBBox, rightBottomCornerBBox);
     let pointToPointDistances = calculatePointToPointDistances(route);
     for (let index = 0; index < intersectIndices.length-1; index++) {
         var sum = 0
         for (let i = intersectIndices[index]; i < intersectIndices[index + 1]; i++) {
             sum += pointToPointDistances[i];
         }
         subsequenceDistances.push(sum);
     }
     return subsequenceDistances;
 }
 
 /**
  * This funtion calculates the total length of the route and returns it.
  * @param {[[number,number]]} route array of points given in [lng/lat]
  * @returns the total length of the route in meters
  */
 function totalDistance(route){
     let pointToPointDistances = calculatePointToPointDistances(route);
     var sum = 0;
     for (let index = 0; index < pointToPointDistances.length; index++) {
         sum += pointToPointDistances[index]; //Iterate and add up over all consecutive point distances
     }
     return sum;
 }
 
 /**
  * This fuction calculates all data needed to fill the table.
  * It returns an array that stores information about the route section, the length of the route, the starting and end point and if the subsequences lie within or outside the given polygon.
  * The code is not so efficient because it calculates some values more than once. I chose this function anyway because it generates all the necessary data with just a single call 
  * depending on the three parameters and it is still fast enough for the size of our input data.
  * @param {[[number,number]]} route array of points given in [lng/lat]
  * @param {[number,number]} leftUpperCornerBBox the left upper corner of the polygon given in [lng/lat]
  * @param {[number,number]} rightBottomCornerBBox the right bottom corner of the polygon given in [lng/lat] 
  * @returns array that stores information about the route section, the length of the route, the starting and end point and if the subsequences lie within or outside the given polygon
  */
 function calculateTableData(route, leftUpperCornerBBox, rightBottomCornerBBox){ 
     let dataTable = [];
     let subsequencesDistances = calculateSubsequenceDistances(route, leftUpperCornerBBox, rightBottomCornerBBox);
     let intersectIndices = calculateIntersectIndices(route, leftUpperCornerBBox, rightBottomCornerBBox);
     let pointsInsideOrOutside = calculatePointsInsideOrOutside(route, leftUpperCornerBBox, rightBottomCornerBBox);
     for (let index = 0; index < subsequencesDistances.length; index++) {
         var tableRow = [];
         tableRow[0] = index+1;
         tableRow[1] = subsequencesDistances[index];
         tableRow[2] = route[intersectIndices[index]];
         tableRow[3] = route[intersectIndices[index + 1]];
         tableRow[4] = pointsInsideOrOutside[intersectIndices[index] + 1]
 
         dataTable.push(tableRow);
     }
     return dataTable;
 }
 
 /**
  * This function  was made to make the values look nicer.
  * The function rounds the lengths to two decimal places, brackets the coordinates of the starting and end points and converts "True" to "Yes" and "False" to "No".
  * @param {Array[][]} table two-dimensional array
  */
 function convertTableValues(table) {
     for(var i=0; i<table.length; i++) {
         for(var j=0; j<table[i].length; j++){
            if (j == 1){
                 table[i][j] = Math.round(table[i][j] * 100) / 100;
            }
            if (j == 2 || j == 3){
                 table[i][j] = "(" + table[i][j] + ")";
            }
            if (j == 4) {
                if (table[i][j] == true) {
                     table[i][j] = "Yes";
                }
                if (table[i][j] == false) {
                     table[i][j] = "No";
                }
 
            }
         }
     }
 }
 
 // Commands
 
 let dataTable = calculateTableData(route); //Create table depending on given route and polygon. Parameters of the given polygon don't habe to be handed over because they were set as default values
 dataTable.sort((a,b) => b[1]-a[1]); //Sort table
 convertTableValues(dataTable); //Make the table look nicer
 