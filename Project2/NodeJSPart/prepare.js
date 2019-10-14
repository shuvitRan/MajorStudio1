/*
 * Note that this function uses *synchronous* JavaScript
 * There is a 2-second (2000 milliseconds) timer after which the JSON will be downloaded
 * so if the API calls are not finished by then, the JSON will only have the ones that did finish.
 * You can increase the timer if you need to.
 */

// load a default library that lets us read/write to the file system
var fs = require('fs')
// load a default library that lets us make HTTP requests (like calls to an API)
var request = require('request')

// endpoint URL
const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects'

// object Ids I want to download
let myObjectIds = []

let obj;
fs.readFile("./objIds.json", "utf8", (err, data) => {


myObjectIds = JSON.parse(data);

console.log(myObjectIds.length);

// set up empty Array for us to save results to
const myArray = []


// the function inside the setTimeout saves myResults to a JSON
// it will automatically run after 2000 ms
setTimeout(() => {
    fs.writeFileSync('./data2.json', JSON.stringify(myArray), 'utf8')
}, 2000)



myObjectIds.forEach(objectId => {
    fetchUrl(objectId)
})

});




function fetchUrl(objectId){
    request(url + '/' + objectId, function (error, response, body) {
      console.error('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

      let obj = JSON.parse(body);

      console.log(obj.primaryImage);
      let index = myArray.length;
      myArray[index] = {};
      myArray[index]["objectID"] = obj.objectID;
      myArray[index]["title"] = obj.title;
      myArray[index]["date"] = obj.objectBeginDate;
      myArray[index]["primaryImage"] = obj.primaryImage;
      myArray[index]["filename"] = obj.primaryImage.split('/').pop();
    });
  }
