
let fs = require('fs');
let request = require('request');
let Jimp = require('jimp');
let metData = require('./DataRequest/insdata.json');
let images = [];
let loadedImages = 0;
let img_height = 100;




loadImages();
// function setup() {
//   createCanvas(1200,1600);
//   metData = loadJSON("DataRequest/insdata.json",loadImages);
// }

function loadImages(){
  console.log(Object.keys(metData).length);
  for (let i = 0; i<Object.keys(metData).length; i++){
      Jimp.read("DataRequest/downloads/"+ metData[i].objIds+".jpg", (err, myimg)=>{
        if(err) throw err;
        myimg
          .resize(Jimp.AUTO,300)
          .quality(100)
          .write(`${metData[i].objIds}.jpg`);

      });


    //   images[i] = loadImage("DataRequest/downloads/"+ metData[i].objIds+".jpg",
    // function(){
    //   loadedImages ++;
    //   if(loadedImages == Object.keys(metData).length){
    //       resizeImages();
      // }

    // });

  }


}

function resizeImages(){
  // background(0);
  // fill(255);
  // textSize(8);
  let thiswidth =0;
  let thisY =0;
for(let i = 0 ; i<Object.keys(metData).length; i++){
  console.log(metData[i].objIds);
  images[i].resize(0,img_height);
  // images[i].save( `${metData[i].objIds}`,"jpg");
      image(images[i],thiswidth, thisY,images[i].width, images[i].height);
      text(metData[i].title, thiswidth+20, images[i].height+thisY+20);
      thiswidth+= images[i].width;
      if( i%4==0){
        thisY+= images[i].height+40;
        thiswidth=0;
      }
    }
}
