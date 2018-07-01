function postMessage() {
    try {
        var postingWall = document.getElementById("list"); //get the list from html
        var tweet = document.getElementById("tweet").value;
        tweet = splitMessage(tweet);
        if (tweet !== undefined) {
            for (i = 0; i < tweet.length; i++) {
                var new_post = document.createElement("li");
                var new_tweet = document.createTextNode(tweet[i]);
                new_post.appendChild(new_tweet); //put value in element
                postingWall.appendChild(new_post); //put element in the old list
            }
        }
    }
    catch{
        console.log("Error encountered in postMessage");
    }

}

function splitMessage(tweet) {
    try {
        if (tweet.length <= 50)
            return tweet;
        else {
            tweet = tweet.toString();
            var newTweets = [];
            for (i = 0, startOfPost = 0, endOfPost = 46; endOfPost < tweet.length; startOfPost = endOfPost + 1, endOfPost += 46) {
                endOfPost = tweet.lastIndexOf(" ", endOfPost);
                if (endOfPost === -1) {
                    alert(" message contains a span of non-whitespace characters longer than 46 characters");
                    return;
                }
                newTweets[i] = tweet.substring(startOfPost, endOfPost);
                i++;
            }
            newTweets[i] = tweet.substring(startOfPost, tweet.length);
            var noOfTweets = newTweets.length;
            for (i = 0, j = 0; i < noOfTweets; i++) {
                j = i + 1;
                newTweets[i] = j + "/" + noOfTweets + " " + newTweets[i];
            }
            return newTweets;
        }
    }
    catch{
        console.log("Error encountered in splitMessage");
    }
}