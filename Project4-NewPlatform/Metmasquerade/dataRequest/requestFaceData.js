var fs = require('fs');
const fetch = require('node-fetch');
const objectBaseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

const myArray=[];
let objNumber = [26563,313444,671508,255940,22739,318622,50421,190001,319070,314544];
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
        fs.writeFileSync('./maskdata.json', JSON.stringify(myArray), 'utf8')
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
    myArray.push({
      objIds : currentID,
      title: currentTitle,
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
