//initial array of topics and variables 
var topics = ["hiking", "biking", "running", "rock climbing", "kayaking", "swimming"];
var APIkey = "cOUO60NrIV6qa7uxG6UDhDVnzEwMiwVW"; 
var limit = 10;

//function to add new topic button
function topicBtn() {

    //Deleate activites prior to adding new activities
    $("#buttonBox").empty();

    //loop through the array of activities
    for (var i = 0; i < topics.length; i++){

        var btn = $("<button class='btn btn-primary'>");
        btn.addClass("activity-btn");
        btn.attr("activity-name", topics[i]);
        btn.text(topics[i]);
        $("#buttonBox").append(btn);
    }
}

//function to create new button from search form
function newTopic() {
    var activity = $("#input").val().trim();
    topics.push(activity);
    topicBtn();
    $("#input").val("");
}

//function to display gif
function displayActivity(event) {
    
    $("#gifBox").empty();
    $(".showTenMore").empty();
    var activityName = $(event).attr("activity-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + activityName + "&api_key=" + APIkey + "&limit=" + limit;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(response);

        addGif(response);
        var newButton = $("<div class='showTenMore'>");
        var showMore = $("<button class='btn btn-primary'>");
            newButton.append(showMore);
            showMore.attr("id", "showMoreBtn");
            showMore.attr("activity-name", activityName);
            showMore.text("Show 10 more gifs!");
        $("#gifBox").append(showMore);
    });
}

// function to add gif
function addGif(response) {
    
    var results = response.data;
    
    for (var i = 0; i < limit; i++) {
        var activityDiv = $("<div class='activity'>");
        var activityImg = $("<img>");
        var rating = results[i].rating; 
        var download = $("<a href=" + results[i].images.original.url + "download> Download </a>"); 
        var p = $("<p>").text("Rating: " + rating);

        activityImg.attr({
            "src": results[i].images.original_still.url,
            "data-still": results[i].images.original_still.url,
            "data-animate": results[i].images.original.url,
            "data-state": "still",
            "class": "gif",
        })

        activityDiv.append(activityImg);
        activityDiv.append(p);
        activityDiv.append(download);
        $("#gifBox").append(activityDiv);
    }  
}

//function to play/pause gif
function playGif() {
    var state = $(this).attr("data-state");
  
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

//click add to create new buttons
$("#add").on("click", function(event) {
    event.preventDefault();
    newTopic();
})

$(document).on("click", ".activity-btn", function(event) {
    event.preventDefault();
    limit = 10;
    displayActivity(this);
})

//click to add 10 more gifs
$(document).on("click", "#showMoreBtn", function(event) {
    event.preventDefault();
    $(".showTenMore").empty();
    limit = limit + 10;
    displayActivity(this);
})

//click gif to play/pause
$(document).on("click", ".gif", playGif);

topicBtn();