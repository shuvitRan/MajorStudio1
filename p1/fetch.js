const searchUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers';
const objectBaseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

const IslamicArtUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=14';
const IslamNFashionUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=14&departmentIds=1'

const ChineseArtUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=6"

//search needs contain a query.
const ChineseArtUrl2 = "https://collectionapi.metmuseum.org/public/collection/v1/search?geoLocation=China&q=dog"

let metData;
let myArray = [];

fetchMuseumData(ChineseArtUrl2);



// var json = ;
// var fs = require('fs');
// fs.writeFile('metDataTest.json', JSON.stringigy(myArray), 'utf8', callback);

// fetch a query
function fetchMuseumData(url) {
  window
    .fetch(url)
    .then(data => data.json())
    .then(data => {
      console.log(data);
      fetchObjects(data);})

    .then(function(data){
       // console.log(data)
       // createImg()
      })
      ;

      // fs.writeFile('metDataTest.json', JSON.stringigy(myArray), 'utf8', callback);




}


function createImg(){
  console.log(myArray['0']);
  var container = document.getElementById('imageContainer');
  var docFrag = document.createDocumentFragment();
    myArray.forEach(function(obj,index,originalArray){
        var img = document.createElement('img');
        img.src = obj.image;

        docFrag.appendChild(img);
      });

}



// from the response, fetch objects
function fetchObjects(data){

  var itemProcessed =0;
  let objectIDs = data.objectIDs.slice(0,20);
  console.log("fetching: " + objectIDs.length + " objects");
    objectIDs.forEach(function(n,i,a) {
      // console.log(objectBaseUrl + n);
      itemProcessed++;
      let objUrl = objectBaseUrl + n;
      window
        .fetch(objUrl)
        .then(data => data.json())
        .then(data => {
          // console.log(data);
          // console.log(data.department)
          addObject(data);
        });

        if(itemProcessed ==a.length){
          createImg();
        }

    });

}

// create your own array using just the data you need
function addObject(objectData){
    // var currentID = objectData.objectID;
    // var currentTitle = objectData.title;
    // var currentDate = objectData.objectBeginDate;
    // var imgUrl = objectData.primaryImage;
    // var index = myArray.length;
    // myArray[index] = {};
    // myArray[index]["title"] = currentTitle;
    // myArray[index]["date"] = currentDate;
    // myArray[index]["image"] = imgUrl;
    // console.log(myArray[index]);


    myArray.push({
      "title" : objectData.title,
      "date" : objectData.objectBeginDate,
      "image" : objectData.primaryImage,
      // "additionalImages" : objectData.additionalImages,
      "objectName" : objectData.objectName,
      "culture" : objectData.culture,
      "classification" : objectData.classification

    });
    // console.log(objectData.culture);


}
