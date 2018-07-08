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

function enablePopup(displayText) {
    var popup = document.getElementById("popup");
    var arrow = document.getElementById("arrow");
    popup.innerHTML = " " + '<i class="fa fa-warning"></i>' + displayText + '&nbsp';
    popup.style.display = "block";
    arrow.style.display = "block";
}
function disablePopup() {
    var popup = document.getElementById("popup");
    var arrow = document.getElementById("arrow");
    popup.style.display = "none";
    arrow.style.display = "none";
}

function splitMessage(tweet) {
    try {
        if (tweet === undefined || tweet.length === 0 || !/\S/g.test(tweet)) {
            enablePopup(" Sorry cannot post empty Tweets");
            return undefined;
        }

        if (tweet.length <= 50)
            return [tweet];
        else {
            var newTweets = [];
            var difference;

            for (i = 0; ; i++) { // loop for calculating max length of substring without indicator
                difference = tweet.length - ((46 - (i * 2)) * 9 * (Math.pow(10, i)));
                if (difference < 0) {
                    maxLength = 46 - (i * 2);
                    break;
                }
            }

            for (i = 0, startOfPost = 0, endOfPost = maxLength; endOfPost < tweet.length; startOfPost = endOfPost + 1, endOfPost += maxLength) {
                endOfPost = tweet.lastIndexOf(" ", endOfPost);
                if (endOfPost === -1) {
                    enablePopup(" Message contains a span of non-whitespace characters longer than the tweet character limit");
                    return undefined;
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
    catch (error) {
        console.log("Error encountered in splitMessage " + error);
    }
}