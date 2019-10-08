/*
 * Note that this function uses *synchronous* JavaScript
 * There is a 2-second (2000 milliseconds) timer after which the JSON will be downloaded
 * so if the API calls are not finished by then, the JSON will only have the ones that did finish.
 * You can increase the timer if you need to.
 */

// load a default library that lets us read/write to the file system
var fs = require('fs')


const fetch = require('node-fetch')

const objectBaseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
// load a default library that lets us make HTTP requests (like calls to an API)
// var request = require('request')

// endpoint URL
const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=buddha';


// object Ids I want to download
// const myObjectIds = [
//   436524,
//  705155,
//  11922,
//  2032,
//  343052,
//  2019,
//  208554,
//  360837,
//  207869
// ]


// set up empty Array for us to save results to
const myArray = []


fetchMuseumData(url);

function fetchMuseumData(url) {

    fetch(url)
    .then(data => data.json())
    .then(data => {
      // console.log(data);
      fetchObjects(data);
    });
}





// from the response, fetch objects
function fetchObjects(data){

  let objectIDs = data.objectIDs.slice(0,5);
  console.log("fetching: " + objectIDs.length + " objects");



    objectIDs.forEach(function(n) {
      // console.log(objectBaseUrl + n);
      let objUrl = objectBaseUrl + n;

        fetch(objUrl)
        .then(data => data.json())
        .then(data => {
          // console.log(data);
          addObject(data);
        }).then(data=>{

        fs.writeFileSync('./data1.json', JSON.stringify(myArray), 'utf8')


        });
    });

}
// create your own array using just the data you need
function addObject(objectData){
    var currentID = objectData.objectID;
    var currentTitle = objectData.title;
    var currentDate = objectData.objectBeginDate;
    var imgUrl = objectData.primaryImage;
    var classification = objectData.classification;
    var index = myArray.length;
    myArray[index] = {};
    myArray[index]["title"] = currentTitle;
    myArray[index]["date"] = currentDate;
    myArray[index]["image"] = imgUrl;
    myArray[index]["finlename"] = objectData.primaryImage.split('/').pop();
    myArray[index]["classification"] = classification;
    // console.log(myArray[index]);

    // return myArray;
    // myArray.push{
    //
    // };

}

// the function inside the setTimeout saves myResults to a JSON
// it will automatically run after 2000 ms
// setTimeout(() => {
//     fs.writeFileSync('./data1.json', JSON.stringify(myArray), 'utf8')
// }, 2000)
