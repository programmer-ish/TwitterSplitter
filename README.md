# TwitterSplitter
## A platform for sharing and splitting tweet
The product Tweeter allows users to post short messages limited to 50 characters each. 
#### Example
Suppose the user wants to send the following message:

    I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.

This is 91 characters excluding the surrounding quotes. When the user presses send, it will send the following messages:

    1/2 I can't believe Tweeter now supports chunking
    2/2 my messages, so I don't have to do it myself.

## Project setup and execution

### Technology stack 
  - **Frontend libraries** : JQuery, bootstrap, font awesome
  - **Backend Server** : Node.js + express (To serve static content)

### Project Structure
```
├── TwitterSplitter/
│   ├── public/  # Static content
│   ├── server.js
│   ├── test/
│   ├── README.md

```

#### How to run the project ?
1. Prerequisites - Install node ( > 6.X ) and npm
2. Git clone the repositroy
3. Run ```npm install ``` to install the required dependencies
4. Open browser http://localhost:8080


### Run test cases
    -  node test/unitTesting.js  or npm test
