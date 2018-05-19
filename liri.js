require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

// Calling the MODULE('keys.js') that contains my api keys
var keys = require('./keys.js');

var userRequest = process.argv[3];

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


// ------- Calling info from twitter ---------
// var params = {screen_name: 'mjesuotero'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error && userRequest === "my-tweets") {
//     console.log(tweets);
//   }
// });


//------- Calling info from Spotify ---------
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (!error && userRequest === "spotify-this-song") {
//       return console.log('Error occurred: ' + err);
//     }
//   console.log(data); 
//   });


//------- Calling info from OMDB ---------
// Then run a request to the OMDB API with the movie specified
request("http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && userRequest === "movie-this") {

        console.log("\n");
        // Title of the movie
        console.log("\nThe movie's title is: " + JSON.parse(body).Title);
        // Year the movie came out
        console.log("\nThe year that the movie come out: " + JSON.parse(body).Year);
        // IMDB Rating of the movie.
        console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        // Rotten Tomatoes Rating of the movie
        console.log("The movie's tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
        // Country where the movie was produced
        console.log("The country where the movie was produced is: " + JSON.parse(body).Country);
        // Language of the movie
        console.log("The language of the is: " + JSON.parse(body).Language);
        // Plot of the movie
        console.log("The plot of the movie is: " + JSON.parse(body).Plot);
        // Actors in the movie
        console.log("The actors of the movie are: " + JSON.parse(body).Actors);
        console.log("\n");

    } else {
        console.log("If you haven't watched 'Mr. Nobody' then you should: <http://www.imdb.com/title/tt0485947/>");
        console.log("It's on Netflix!")
    }
});