var _ = require('lodash');

function enablePopup(displayText) { return; }

function splitMessage(tweet) {
    try {
        if (tweet === undefined || tweet.length === 0 || !/\S/g.test(tweet)) {
            enablePopup("Sorry cannnot post empty Tweets");
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
                    enablePopup("Message contains a span of non-whitespace characters longer than the tweet character limit");
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

var input, output;

function testSplitMessage(input, output) {
    var output_after_splitting = splitMessage(input);

    //  Not using ===  because that will check if the objects are of same instance and return false
    //  isEqual does deep search
    if (_.isEqual(output, output_after_splitting)) {
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

//Test 1- Handling undefined 
input = undefined;
output = undefined;
testSplitMessage(input, output);

//Test 2- Handling input of zero length 
input = "";
output = undefined;
testSplitMessage(input, output);

//Test 3- Handling input with only spaces 
input = "             ";
output = undefined;
testSplitMessage(input, output);

//Test 4- Handling tweet of 91 characters
input = "I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself."
output = [
    "1/2 I can't believe Tweeter now supports chunking",
    "2/2 my messages, so I don't have to do it myself."
]
testSplitMessage(input, output);

//Test 5- Hadling exact 50 characters with no space
input = "Ican'tbelieveTweeternowsupportschunkingmymessages,"
output = ["Ican'tbelieveTweeternowsupportschunkingmymessages,"]
testSplitMessage(input, output);

//Test 6- Hadling message containing a span of non-whitespace 51 characters
input = "Ican'tbelieveTweeternowsupportschunkingmymessages,s"
output = undefined
testSplitMessage(input, output);

//Test 7- Hadling 49 characters with no space
input = "Ican'tbelieveTweeternowsupportschunkingmymessages"
output = ["Ican'tbelieveTweeternowsupportschunkingmymessages"]
testSplitMessage(input, output);

//Test 8- Handling tweet of 5000 characters, part indicators more than 4 characters
input = "GFG is dedicated to bringing fashion online in high growth markets and offers brands the " +
    "chance to enter the fashion e-commerce sector in highly promising economies. We operate with five " +
    "branded platforms in 24 countries and employ over 9,000 people. Working closely with our partners, we " +
    "have crafted the best in-class shopping experience for our customers offering over 3,000 international " +
    "and local brands to be delivered in a fast and convenient way. "
output = [
    "1/11 GFG is dedicated to bringing fashion online",
    "2/11 in high growth markets and offers brands",
    "3/11 the chance to enter the fashion e-commerce",
    "4/11 sector in highly promising economies. We",
    "5/11 operate with five branded platforms in 24",
    "6/11 countries and employ over 9,000 people.",
    "7/11 Working closely with our partners, we have",
    "8/11 crafted the best in-class shopping",
    "9/11 experience for our customers offering over",
    "10/11 3,000 international and local brands to be",
    "11/11 delivered in a fast and convenient way. "
]
testSplitMessage(input, output);

