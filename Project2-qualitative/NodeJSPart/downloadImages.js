//
//
// let fs = require('fs');
// // load a default library that lets us make HTTP requests (like calls to an API)
// let request = require('request');

// let obj;
// fs.readFile("./data.json", "utf8", (err, data) => {
//
//
// obj = JSON.parse(data);
//
// console.log(obj.length);
//
// });

//419 items in json file

// Downloading Image

// load a default library that lets us read/write to the file system
let fs = require('fs');
// load a default library that lets us make HTTP requests (like calls to an API)
let request = require('request');

// the folder we will write into
let folder = "downloads";

// download the image by url, name the file by filename
function downloadImage(uri, filename, callback){
  request.head(uri, function(err, res, body){
    // console.log('content-type:', res.headers['content-type']);
    // console.log('content-length:', res.headers['content-length']);
    request(uri).pipe(fs.createWriteStream( folder + "/" + filename)).on('close', callback);
  });
};

// go through the json we created before
function downloadData() {
  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) console.log(err);

    JSON.parse(data).forEach((e,i) => {
      setTimeout(function(){
      if(e.filename != null){
      console.log('Downloading ' + e.filename);
      downloadImage(e.image, e.objIds+".jpg", function(){
        console.log('Finished Downloading ' + e.filename);
      });
    }
  }, i*1000);
  });

  });
}

downloadData();
