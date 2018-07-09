// Function for adding new tweets to the posting wall 
function postMessage() {
    try {
        var postingWall = document.getElementById("list");
        var tweet = document.getElementById("tweet").value;
        tweet = splitMessage(tweet); // Splits tweet if required and returns it as an array
        if (tweet !== undefined) { // Only add tweet to posting wall if its an array, and add each element of array separately 
            for (i = 0; i < tweet.length; i++) {
                var new_post = document.createElement("li");
                var new_tweet = document.createTextNode(tweet[i]);
                new_post.appendChild(new_tweet);
                postingWall.appendChild(new_post);
            }
        }
    }
    catch{
        console.log("Error encountered in postMessage");
    }

}

// This function replaces the default alert in javascript and displays a warning popup
function enablePopup(displayText) {
    var popup = document.getElementById("popup");
    var arrow = document.getElementById("arrow");
    popup.innerHTML = '<i class="fa fa-warning"></i>' + displayText; // Adds a warning icon before the actual warning message
    popup.style.display = "block";
    arrow.style.display = "block";
}

// This function hides the popup
function disablePopup() {
    var popup = document.getElementById("popup");
    var arrow = document.getElementById("arrow");
    popup.style.display = "none";
    arrow.style.display = "none";
}

// Splits tweet if required otherwise sends tweet back as an array with 1 element
function splitMessage(tweet) {
    try {
        // Tweets that are undefined, have no content, or are only spaces are not added to posting wall
        if (tweet === undefined || tweet.length === 0 || !/\S/g.test(tweet)) {
            enablePopup(" Sorry cannot post empty Tweets"); // General warning for the three cases
            return undefined;
        }

        //If tweet is not greater than 50 characters, returns tweet as an array with 1 element
        if (tweet.length <= 50)
            return [tweet];

        // Spliting is required
        else {

            // Newly split tweets are stored in newTweets
            var newTweets = [];

            // Loop for calculating max length of each split tweet without part indicator
            var difference;
            for (i = 0; ; i++) {
                difference = tweet.length - ((46 - (i * 2)) * 9 * (Math.pow(10, i)));
                if (difference < 0) {
                    maxLength = 46 - (i * 2); // Final value
                    break;
                }
            }

            // Loop for splitting the tweets
            for (i = 0, startOfPost = 0, endOfPost = maxLength; endOfPost < tweet.length; startOfPost = endOfPost + 1, endOfPost += maxLength) {

                // Searches backwards for a position to split tweet from maximum length of tweet possible
                endOfPost = tweet.lastIndexOf(" ", endOfPost);

                // When tweet has no space to split
                if (endOfPost === -1) {
                    enablePopup(" Message contains a span of non-whitespace characters longer than the tweet character limit");
                    return undefined;
                }

                // New tweet created without indicator
                newTweets[i] = tweet.substring(startOfPost, endOfPost);
                i++;
            }

            // Last tweet created
            newTweets[i] = tweet.substring(startOfPost, tweet.length);


            // Loop for adding part indicators for each tweet
            var noOfTweets = newTweets.length;
            for (i = 0, j = 0; i < noOfTweets; i++) {
                j = i + 1;
                newTweets[i] = j + "/" + noOfTweets + " " + newTweets[i];
            }

            // Returns final tweet as an array
            return newTweets;
        }
    }
    catch (error) {
        console.log("Error encountered in splitMessage " + error);
    }
}