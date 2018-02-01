//On page load.
    //set variables:
    //displayButtons - make it a function with the following things within it
        //clear previous buttons from screen
        //for loop through the buttonTitles array.
            //create a jQuery button
            //add attribute to jQuery button created (attribute title: "button-title"  attribute value: "")
            //put the current buttonTitle that we are looping through in the button (.text, or .html)
            //append the button to the page
        //when a user clicks one of the the buttons - function

            //in this case, the "this" keyword refers to the button that was clicked

            // constructing a URL to search Giphy for the name of the person who said the quote.
             //prevent default
            //get attribute of the button clicked, and store to variable
            //clear out old images from page (.empty)
            //Ajax call to giphy
                // Method | GET
                // URL | https://api.giphy.com/v1/gifs/search?api_key=YOUR API KEY&g=(PUT IN THE ATTRIBUTE OF BUTTON CLICKED)
                // .done
  
                    // loop through response.data
                        // create a jQuery div
                        // create a jQuery image
                        // set the src attribute of the jQuery image to be the image from Giphy response (data[i].images.original_still.url)
                        // Add data-state attribute to jQuery image = "still"
                        // add data-animateURL attribute to jQuery image = response.data[i].images.original.url
                        // add data-stillURL attribute to jQuery image = response.data[i].images.original_still.url
                        // create a jQuery paragraph
                        // put the rating from Giphy response into pragraph created. (response.data[i].rating)
                        // Append jquery paragraph to jQuery div
                        // Append jQuery image to jQuery div
                        // Append jQuery div to the page
        // On click of form submit button - function
            // create variable of user input text field
            // push variable just created to array (buttonTitles)
            // run displayButtons function
        // On click of image div - function
            // Set variable equal to image clicked data-state attribute (from line 25)
            // if (imageState == "still")
                // set src attribute of image clicked to be the data-animateURL attribute of the image clicked
                // Set data-state attribute of image clicked to be "animated"
            // else if (imageState == "animated")
                // set src attribute of image clicked to be the data-stillURL attribute of the image clicked
                // Set data-state attribute of image clicked to be "still"

$(document).ready(function() {

    buttonTitles = ["The Worm", "Moonwalk", "Headspin", "Synchronized Swimming", "Ballet", "Ghost Ridin' The Whip", "Cossack", "The Lawnmower", "Soulja Boy", "The Carleton", "Floss Dance", "Sign Spinning"]

    function displayArrayButtons () {
        $(".button-drop").empty();

        for (var i = 0; i < buttonTitles.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
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

                    var results = response.data;

                    for (var i = 0; i < results.length; i++) {
                        var gifDiv = $("<div class='posted-gif' style='float: left;'>");

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        var p = $("<p>").text("Rating: " + rating);

                        var divImageStill = $("<img>");
                        divImageStill.attr("src", results[i].images.fixed_height_still.url);

                        gifDiv.append(p);
                        gifDiv.append(divImageStill);

                        $(".gif-drop").prepend(gifDiv);
                    }
            });
    }

    $("#submit-button").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var danceGif = $("#user-input").val().trim();
        // Adding movie from the textbox to our array
        buttonTitles.push(danceGif);
        // Calling renderButtons which handles the processing of our movie array
        displayArrayButtons();
    });

    $(".button-drop").on("click", ".dances", displayGif);
    displayArrayButtons();

}) // document.ready
