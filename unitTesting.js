var _ = require('lodash');
function splitMessage(tweet) {
    try {
        if (tweet === undefined)
            return undefined;

        if (tweet.length <= 50)
            return tweet;
        else {
            tweet = tweet.toString();
            var newTweets = [];
            var difference;
            console.log("length" + tweet.length);

            for(i=0;;i++){
                difference= tweet.length-((46-i)*9*(Math.pow(10,i)));
                if(difference<0){
                    endOfPost=46-i;
                    break;
                }
            }

            for (i = 0, startOfPost = 0; endOfPost < tweet.length; startOfPost = endOfPost + 1, endOfPost += 46) {
                console.log("endOfPost before lastIndexOf" + endOfPost);
                endOfPost = tweet.lastIndexOf(" ", endOfPost);
                if (endOfPost === -1) {
                    alert(" message contains a span of non-whitespace characters longer than tweet character limit");
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


var input, output;

function testSplitMessage(input, output) {
    var output_after_splitting = splitMessage(input);
    console.log(typeof (output));
    console.log(typeof (output_after_splitting));
    if (_.isEqual(output, output_after_splitting)) { // === will check if the objects are of same instance and return false
        var tweetOfInvalidLength = _.find(output_after_splitting, function (tweet) { return tweet.length > 50; });
        if (tweetOfInvalidLength === undefined) {
            console.log("Test pass");
        }
        else {
            console.log("Test fail" + " output " + output + " tweetOfInvalidLength " + tweetOfInvalidLength + " length of " + tweetOfInvalidLength.length);
        }

    } else {
        console.log("Test fail" + " output " + output + " output_after_splitting " + output_after_splitting);
    }
}

// //Test 1- Handling undefined 
// input = undefined;
// output = undefined;
// testSplitMessage(input, output);

// //Test 2- Handling tweet of 91 characters
// input = "I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself."
// output = [
//     "1/2 I can't believe Tweeter now supports chunking",
//     "2/2 my messages, so I don't have to do it myself."
// ]
// testSplitMessage(input, output);

// //Test 3- Hadling message containing a span of non-whitespace characters longer than 46 characters
// input = "Ican'tbelieveTweeternowsupportschunkingmymessages,soIdon'thavetodoitmyself."
// output = undefined
// testSplitMessage(input, output);

//Test 4- Handling tweet of 5000 characters, part indicators more than 4 characters
input = "GFG is dedicated to bringing fashion online in high growth markets and offers brands the " +
    "chance to enter the fashion e-commerce sector in highly promising economies. We operate with five " +
    "branded platforms in 24 countries and employ over 9,000 people. Working closely with our partners, we " +
    "have crafted the best in-class shopping experience for our customers offering over 3,000 international " +
    "and local brands to be delivered in a fast and convenient way. "
output = [
    "1/11 GFG is dedicated to bringing fashion online",
    "2/11 in high growth markets and offers brands the",
    "3/11 chance to enter the fashion e-commerce sector",
    "4/11 in highly promising economies. We operate",
    "5/11 with five branded platforms in 24 countries",
    "6/11 and employ over 9,000 people. Working closely",
    "7/11 with our partners, we have crafted the best",
    "8/11 in-class shopping experience for our",
    "9/11 customers offering over 3,000 international",
    "10/11 and local brands to be delivered in a fast",
    "11/11 and convenient way. "
]
testSplitMessage(input, output);

