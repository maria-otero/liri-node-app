require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
// fs is a core Node package for reading and writing files
var fs = require("fs");


// Calling the MODULE('keys.js') that contains my api keys
var keys = require('./keys.js');

var userRequestType = process.argv[2];
var userRequestName = process.argv[3];

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



switch(userRequestType) {
  case "my-tweets":
      twitterRequest();
      break;
  case "spotify-this-song":
      spotifyResquest();
      break;
  case "movie-this":
      omdbRequest();
      break;
  case "do-what-it-says":
      doWhatItSays();
  default:
      console.log("\nDon't know what to put here??");
}



// ------- Calling info from twitter --------- RUNNING
function twitterRequest() {
    var params = {screen_name: 'mjesuotero'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error && userRequestType === "my-tweets") {
        console.log(tweets);
      }
    });
};


//------- Calling info from Spotify --------- NOT RUNNING
function spotifyResquest() {
    console.log('Here sopouse to run spotify code.');
//  spotify.search({ type: 'track', query: userRequestName }, function(err, spotifyData) {
//     if (!err) {
//        console.log(spotifyData); 
//     } else if (err){
//        console.log('Error occurred: ' + err);
//     }
//   });
// };
}


//------- Calling info from OMDB --------- RUNNING
function omdbRequest() {
    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + userRequestName + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
    // If the request is successful (i.e. if the response status code is 200)
    if (!error) {
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
};


//------- Reading the random.txt file --------- RUNNING
function doWhatItSays() {
    // This block of code will read from the "random.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function(error, data) {
      // If the code experiences any errors it will log the error to the console.
      if (!error) {
        console.log(data + '\n');
      } else if (error) {
        console.log(error);
      }
    })
};