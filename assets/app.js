

var topic = ["mustang", "honda"];
$.ajax({
    url: "https://api.giphy.com/v1/gifs/search?api_key=LAGebVZNkSZUf88WelXuGWoczQqvYlst&q="+ topic +"&limit=10&offset=0&rating=G&lang=en",
    method: "GET"
  }).then(function(response) {
    console.log(response);
  }); 
  $("#run-search").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
  
    // Empty the region associated with the articles
    clear();
  
    // Build the query URL for the ajax request to the NYT API
    var queryURL = buildQueryURL(cars);
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(updatePage);
  });

  $("#car-button").on("click", function() {

    // Storing our giphy API URL for a random cat image
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LAGebVZNkSZUf88WelXuGWoczQqvYlst&q="+ topic +"&limit=10&offset=0&rating=G&lang=en";

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    // After the data from the AJAX request comes back
      .then(function(response) {

      // Saving the image_original_url property
        var imageUrl = response.data.image_original_url;

        // Creating and storing an image tag
        var carImage = $("<img>");

        // Setting the catImage src attribute to imageUrl
        carImage.attr("src", imageUrl);
        carImage.attr("alt", "car image");

        // Prepending the catImage to the images div
        $("#images").prepend(carImage);
      });
  });

  $(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });