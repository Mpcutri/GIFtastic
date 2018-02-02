$(document).ready(function() {

    buttonTitles = ["The Worm", "Moonwalk", "Headspin", "Synchronized Swimming", "Ballet", "Ghost Ridin' The Whip", "Cossack", "The Lawnmower", "Soulja Boy", "The Carleton", "Floss Dance", "Sign Spinning"]
    $(".gif-drop").hide();

    function displayArrayButtons () {
        $(".button-drop").empty();

        for (var i = 0; i < buttonTitles.length; i++) {
            // Then dynamicaly generating buttons for each movie in the array
            var danceButton = $("<button style='margin: 5px;'>");
            // Adding a class of movie to our button
            danceButton.addClass("dances");
            // Adding a data-attribute
            danceButton.attr("data-search", buttonTitles[i]);
            // Providing the initial button text
            danceButton.text(buttonTitles[i]);
            // Adding the button to the buttons-view div
            $(".button-drop").append(danceButton);
        }
    }

    console.log(buttonTitles);

    function displayGif () {
        var search = $(this).attr("data-search");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=YuQOykztApqbXnKmRYzlYYDn2HLDa4SC&limit=10";

              $.ajax({
                url: queryURL,
                method: "GET"
              }).then(function(response) {

                    console.log(response);
                    $(".gif-drop").show();
                    var results = response.data;

                    for (var i = 0; i < results.length; i++) {
                        var gifDiv = $("<div class='posted-gif' style='display: inline-block;'>");

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        var p = $("<p>").text("Rating: " + rating);

                        var divImageStill = $("<img class='gif-image'>");
                        divImageStill.attr("data-state", "still");
                        divImageStill.attr("data-still", results[i].images.fixed_height_still.url);
                        divImageStill.attr("data-animate", results[i].images.original.url);
                        divImageStill.attr("src", results[i].images.fixed_height_still.url);

                        gifDiv.append(p);
                        gifDiv.append(divImageStill);

                        $(".gif-drop").prepend(gifDiv);
                    }
            }); 
    }

    $(".gif-drop").on("click", ".gif-image", function() {
        console.log("this got clicked");
        var state = $(this).attr("data-state");

        if (state == "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })

    function handleSubmit() {
        var danceGif = $("#user-input").val().trim();

        if (danceGif == "") {
            console.log("empty value")
        } else {       
            buttonTitles.push(danceGif);
            displayArrayButtons();
            $("#user-input").val("");
        }
    }

    $("#submit-button").on("click", function(event) {
        event.preventDefault();
        handleSubmit();
    });

    $('#user-input').keyup(function(e){
        if(e.keyCode == 13) {
            handleSubmit();
        }
    });

    $(".button-drop").on("click", ".dances", displayGif);
    displayArrayButtons();

}) // document.ready
