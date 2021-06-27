"use strict"

// variables that store the necessary HTML-objects
var deleteButton = document.getElementById('deleteButton');


/**
 * Eventlistener that listens for a click event on the deleteButton. 
 * If the button is clicked the callback function is executed which sends 
 * an ajax-POST-request to the express server. 
 * The data sent to the server are the id's of the routes which should be deleted from the database.
 * After the ajax-request is done the page gets refreshed.
 * 
 */
deleteButton.addEventListener('click', function(){
    var checkedRoutes = getCheckedRoutes();
    var objectDataString = JSON.stringify(checkedRoutes);
    $.ajax({
        type: "POST",
        url: "/manageRoutes/delete",
        dataType: "json",
        data: {
            o: objectDataString
        },
        success: function (data) {
            alert('success');
        },
        error: function () {
            alert('error')
        }
    })
    .done(window.location.href = "/manageRoutes")
})



/**
 * The function iterates through all HTML-objects from type input:checkbox
 *  and puts all ids of the checked boxes into one array which is stored in an js object.
 * 
 * @returns {object} the object that contains an array with the ids of all the checked boxes in the HTML-document
 */
function getCheckedRoutes() {
    var obj = {};
    obj.routesChecked=[];
    
    $("input:checkbox").each(function(){
        var $this = $(this);

        if($this.is(":checked")){
            obj.routesChecked.push($this.attr("id"));
        }
    });
    console.log(obj);
    return obj;
}


/**
 * The function gets called everytime the Rename-Button of the input the DB stored
 * route is clicked. See html onclick-attribute of the rename buttons.
 * When clicked the function is executed and sends an ajax-POST-request to the server
 * with an object that contains the id of the the route object to rename, the index of the button (id+index = button id)
 * and the new name for the route which is the text put into the input field. 
 * After the ajax-request is done the page gets refreshed.
 * 
 * @param {String} id - id of the object to rename
 * @param {String} index - index of the button used to get it by its id (=id+index)
 */
function renameRoute(id, index) {

    var obj = {};
    var text = document.getElementById(id + index).value;
    
    obj.id = id;
    obj.index = index;
    obj.newname = text;

    console.log(obj);

    var objectDataString = JSON.stringify(obj);
    console.log(objectDataString);
    $.ajax({
        type: "POST",
        url: "/manageRoutes/rename",
        dataType: "json",
        data: {
            o: objectDataString
        },
        success: function (data) {
            alert('success');
        },
        error: function () {
            alert('error')
        }
    })
    .done(window.location.href = "/manageRoutes")
}