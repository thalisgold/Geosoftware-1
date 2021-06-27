"use strict"

// variables that store the necessary HTML-objects
var submitButton = document.getElementById('submit');



/**
 * EventListener that listens to a click event on the submitButton.
 * When the button gets clicked it first gets the id and value(name) of the selected option in the form(id=routes).
 * After that an ajax-POST-request is made which send the id of the selected option (also id of the route in the DB)
 * to the server where the right route is loaded from the database to overwrite the routeDB.geojson in the filesystem.
 * 
 */
submitButton.addEventListener('click', function() {
    var id = $("#routes option:selected").attr("id");
    var name = $("#routes option:selected").attr("value");
    if(name != '0') {
        $.ajax({
            type: "POST",
            url: "/selectRoute",
            async: false,
            dataType: "text",
            data: {
                id: id,
                name: name
            },
            success: function(data){
                console.log('success');
            },
            error: function(){
                alert('error')
            }
        })
    }    
});