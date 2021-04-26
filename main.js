/**
 * @author Thalis Goldschmidt
 * Matrikelnr.: 462238
 * Generates the output of the table in html format that was created in table.js and generates the output for the total length.
 */

"use strict"

//Functions

//
/**
 * This function creates html-code to generate a table out of a two-dimensional array.
 * Link: https://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array
 * @param {Array[][]} myArray two-dimensional array
 * @returns HTML-code to generate a table of a given array
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

//Refers to the table body from the html-document and inserts the code generated in the makeTableHTML-function.
document.getElementById("tbody").innerHTML = makeTableHTML(dataTable);

//Refers to the paragraph of the html-document and creates the output for the total length.
document.getElementById("pbody").innerHTML = "Total length: " + (Math.round(totalDistance(route) * 100) / 100) + " m";
