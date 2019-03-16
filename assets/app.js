//initial array of topics
var topics = ["hiking", "biking", "running", "rock climbing", "kayaking", "golf"];

//function to render HTML to display content
function displayActivity() {
    $("#gifBox").empty();
    var activity = $(this).attr("data-name");
    var limit = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + activity + "&api_key=cOUO60NrIV6qa7uxG6UDhDVnzEwMiwVW&limit=" + limit;

    //create AJAX call for the specific activity button clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        var results = response.data;

        console.log(results);

        for (var i = 0; i < limit; i++) {
           
            var activityDiv = $("<div class='activity'>");   
            
            var activityImg = $("<img>");
    
            activityImg.attr({
                "src": results[i].images.original_still.url,
                "data-still": results[i].images.original_still.url,
                "data-animate": results[i].images.original.url,
                "data-state": "still",
                "class": "gif",
            })

            var rating = results[i].rating;  
            var p = $("<p>").text("Rating: " + rating); 
            activityDiv.append(activityImg);
            activityDiv.append(p);
            $("#gifBox").append(activityDiv);

        }

        moreButton();

    });
}

//click function to pause/play gif
$(document).on("click", ".gif", function(event) {
    event.preventDefault();
    var state = $(this).attr("data-state");
    if (state === "still") {
        console.log("still");
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
        console.log("animate");
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

//function for displaying movie data
function renderButtons(){

    //Deleate activites prior to adding new activities
    $("#buttonBox").empty();

    //loop through the array of activities
    for (var i = 0; i < topics.length; i++){

        var btn = $("<button class='btn btn-success'>");
        btn.addClass("activity-btn");
        btn.attr("data-name", topics[i]);
        btn.text(topics[i]);
        $("#buttonBox").append(btn);
    }
}

//click event to add activities to the array and generate buttons
$("#add").on("click", function(event) {
    event.preventDefault();
    var activity = $("#input").val().trim();
    topics.push(activity);
    renderButtons();
    $("#input").val("");
})

//function to add the more button to the form
function moreButton() {
    $(".newButton").empty();
    var moreBtn = $("<button class='btn btn-info'>");
    moreBtn.addClass("more-btn");
    moreBtn.attr("id", "more");
    moreBtn.text("Show More Gifs");
    $(".newButton").append(moreBtn);
}

//click event to generate more gifs
$("#more").on("click", showMore());

//function to show more gifs on page
function showMore(){

}

//add a click event listener to all elements with a class of "activity-btn"
$(document).on("click", ".activity-btn", displayActivity);


//call the render buttons function to display the initial buttons
renderButtons();
