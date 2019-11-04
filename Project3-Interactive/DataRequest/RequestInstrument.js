
var fs = require('fs')


const fetch = require('node-fetch')

const objectBaseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
// load a default library that lets us make HTTP requests (like calls to an API)
// var request = require('request')

// endpoint URL
const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=buddha';

let n = ""

function fetchSingleMuseumData(url){

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
        fs.writeFileSync('./insdata.json', JSON.stringify(myArray), 'utf8')
    }).catch(error => { console.log('caught', err.message); });




}

// create array using just the data we need
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
      // metURL: metURL
    });

}
