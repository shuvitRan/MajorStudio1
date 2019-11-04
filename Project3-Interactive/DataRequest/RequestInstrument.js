
var fs = require('fs')


const fetch = require('node-fetch')

const objectBaseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';
// load a default library that lets us make HTTP requests (like calls to an API)
// var request = require('request')

// endpoint URL
// const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=buddha';

//添加data到已有的json的方式
let existObj = require('./insdata.json');
const myArray = [];
let objNumber = [501646,501536, 500928, 503502,501109,503048,503505,
                 501802,503348,503651,505399,503523,505626,503672,
                 503951,504210,502377,504019,506174,503578,505034,500957,503644];

// console.log(objectBaseUrl + objNumber)
fetchSingleMuseumData();

function fetchSingleMuseumData(){



objNumber.forEach(function(n, i) {

setTimeout(function(){
  let objUrl = objectBaseUrl + n;
    fetch(objUrl)
    .then(data => data.json())
    .then(data => {

          addObject(data)

    }).then(data=>{
      // console.log(data);
        fs.writeFileSync('./insdata.json', JSON.stringify(existObj), 'utf8')
    }).catch(error => { console.log('caught', err.message); });

  }, i*100)
});

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
    // var metURL = objectData.objectURL;
    // var country = objectData.country;

    // var index = myArray.length;
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
    existObj.push({
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
