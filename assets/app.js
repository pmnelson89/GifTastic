//initial array of topics
var topics = ["hiking", "biking", "running", "rock climbing", "kayaking"];

//function to render HTML to display content
function displayActivity() {
    $("#gifBox").empty();
    var activity = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + activity + "&api_key=cOUO60NrIV6qa7uxG6UDhDVnzEwMiwVW&limit=10";

    //create AJAX call for the specific activity button clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            //create a div to hold the activity
            var activityDiv = $("<div class='activity'>");   
            //create  image tag
            var activityImg = $("<img>");
            //giv image tag src attribute of property form result
            activityImg.attr("src", results[i].images.fixed_height.url);
            //store rating data
            var rating = results[i].rating;  
             //create an element to have the rating displayed
            var p = $("<p>").text("Rating: " + rating); 
            //append the activityImg and to activityDiv
            activityDiv.append(activityImg);
            activityDiv.append(p);
            //prepend div to the #imgBox
            $("#gifBox").append(activityDiv);
        }
    });

}

//function for displaying movie data
function renderButtons(){

    //Deleate activites prior to adding new activities
    $("#buttonBox").empty();

    //loop through the array of activities
    for (var i = 0; i < topics.length; i++){

        //generate buttons for each activity in the array
        var btn = $("<button class='btn btn-success'>");
        //add a class to the button
        btn.addClass("activity-btn");
        //add a data-attribute
        btn.attr("data-name", topics[i]);
        //provide the initial button text
        btn.text(topics[i]);
        //add the button to the div
        $("#buttonBox").append(btn);
    }
}

//function handles events where an activity button is clicked
$("#add").on("click", function(event) {
    event.preventDefault();

    //grabs the input from the textbox
    var activity = $("#input").val().trim();

    //add activity from the textbox to the array
    topics.push(activity);

    //call renderButtons to process the movie array
    renderButtons();
    $("#input").val("");
})

//add a click event listener to all elements with a class of "activity-btn"
$(document).on("click", ".activity-btn", displayActivity);

//call the render buttons function to display the initial buttons
renderButtons();
