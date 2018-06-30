function postMessage() {
    var tweet = document.getElementById("tweet").value;
    tweet=splitMessage(tweet);
    var postingWall = document.getElementById("list"); //get the list from html
    var new_post = document.createElement("li_a");
    var new_tweet = document.createTextNode(tweet);
    new_post.appendChild(new_tweet); //put value in element
    postingWall.appendChild(new_post); //put element in the old list

}

function splitMessage(tweet) {
    console.log("new tweet"+tweet.length);
    var newTweets= [];
    if(tweet<=50)
        return tweet;
    else{
        tweet=tweet.toString();
        newTweets=tweet.match(/.{1,46}/g); // not just {46} so that we include strings that are not multiples of 46
        var noOfTweets= newTweets.length;
        for(i=0,j=0;i<noOfTweets;i++){
            j=i+1;
            newTweets[i]=j+"/"+noOfTweets+" "+newTweets[i];
        }
        console.log(newTweets);
        return newTweets;
    }
}