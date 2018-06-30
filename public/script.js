function postMessage() {
    var tweet = document.getElementById("tweet").value;
    var postingWall = document.getElementById("list"); //get the list from html
    var new_post = document.createElement("li_a");
    var new_tweet = document.createTextNode(tweet);
    splitMessage(new_tweet);
    new_post.appendChild(new_tweet); //put value in element
    postingWall.appendChild(new_post); //put element in the old list

}

function splitMessage(){
    
}