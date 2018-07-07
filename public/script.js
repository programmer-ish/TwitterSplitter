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

function enablePopup() {
    var popup = document.getElementById("popup");
    var arrow = document.getElementById("arrow");
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
        if (tweet === undefined)
            return undefined;

        if (tweet.length <= 50)
            return [tweet];
        else {
            var newTweets = [];
            var difference;
            console.log("length" + tweet.length);

            for (i = 0; ; i++) { // loop for calculating max length of substring without indicator
                difference = tweet.length - ((46 - (i * 2)) * 9 * (Math.pow(10, i)));
                console.log("difference" + difference);
                if (difference < 0) {
                    maxLength = 46 - (i * 2);
                    break;
                }
            }
            console.log("maxLength" + maxLength);

            for (i = 0, startOfPost = 0, endOfPost = maxLength; endOfPost < tweet.length; startOfPost = endOfPost + 1, endOfPost += maxLength) {

                console.log("endOfPost before lastIndexOf" + endOfPost);
                endOfPost = tweet.lastIndexOf(" ", endOfPost);
                if (endOfPost === -1) {
                    enablePopup();
                    return;
                }
                console.log("startOfPost " + startOfPost + "endOfPost" + endOfPost);
                newTweets[i] = tweet.substring(startOfPost, endOfPost);
                i++;
            }
            console.log("startOfPost " + startOfPost);
            newTweets[i] = tweet.substring(startOfPost, tweet.length);
            var noOfTweets = newTweets.length;
            for (i = 0, j = 0; i < noOfTweets; i++) {
                j = i + 1;
                newTweets[i] = j + "/" + noOfTweets + " " + newTweets[i];
                console.log("substring lenght" + newTweets[i].length + "substring" + newTweets[i]);
            }
            return newTweets;
        }
    }
    catch (error) {
        console.log("Error encountered in splitMessage " + error);
    }
}