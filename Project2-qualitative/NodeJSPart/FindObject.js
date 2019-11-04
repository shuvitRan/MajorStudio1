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
const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=buddha';


// 37426, 38649, 38226 (these three were took out from the json file, it is not realted to buddha  )

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
    }).catch(error => { console.log('caught', err.message); });
}

//
// function timeout(ms, promise) {
//   return new Promise(function(resolve, reject) {
//     setTimeout(function() {
//       reject(new Error("timeout"))
//     }, ms)
//     promise.then(resolve, reject)
//   })
// }


// from the response, fetch objects
function fetchObjects(data){
  //check first 5
  // let objectIDs = data.objectIDs.slice(0,5);

  let objectIDs = data.objectIDs;
  console.log("fetching: " + objectIDs.length + " objects");

// fs.writeFileSync('./objIds.json', JSON.stringify(data.objectIDs), 'utf8')

    objectIDs.forEach(function(n, i) {
      //check link if it's correct
      // console.log(objectBaseUrl + n);
      //save to my own json with setTimeout, Rate limiter——————————*****
      setTimeout(function(){
        let objUrl = objectBaseUrl + n;

          fetch(objUrl)
          .then(data => data.json())
          .then(data => {
            console.log(i);
            // console.log(data);
              if(data.classification=="Sculpture"){
                addObject(data)
              };
            // return myArray;
          }).then(data=>{
            // console.log(data);
              fs.writeFileSync('./data.json', JSON.stringify(myArray), 'utf8')
          }).catch(error => { console.log('caught', err.message); });
      }, i*100)
        });


}
// create your own array using just the data you need
function addObject(objectData){
    var currentID = objectData.objectID;
    var currentTitle = objectData.title;
    var currentDate = objectData.objectBeginDate;
    var imgUrl = objectData.primaryImage;
    var classification = objectData.classification;
    var culture = objectData.culture;
    var medium = objectData.medium;
    var metURL = objectData.objectURL;
    // var country = objectData.country;

    var index = myArray.length;
    // myArray[index] = {};
    // myArray[index]["objIds"] = currentID;
    // myArray[index]["title"] = currentTitle;
    // myArray[index]["date"] = currentDate;
    // myArray[index]["image"] = imgUrl;
    // myArray[index]["culture"] = culture;
    // // myArray[index]["country"] = country;
    // myArray[index]["filename"] = objectData.primaryImage.split('/').pop();
    // myArray[index]["classification"] = classification;

    // console.log(myArray[index]);

    // return myArray;
    myArray.push({
      objIds : currentID,
      date : currentDate,
      image : imgUrl,
      culture: culture,
      // country :country,
      filename : objectData.primaryImage.split('/').pop(),
      classification: classification,
      medium: medium,
      metURL: metURL
    });

}





// the function inside the setTimeout saves myResults to a JSON
// it will automatically run after 2000 ms
// setTimeout(() => {
//     fs.writeFileSync('./data1.json', JSON.stringify(myArray), 'utf8')
// }, 2000)
