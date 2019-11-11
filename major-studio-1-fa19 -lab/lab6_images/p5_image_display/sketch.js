let met_data;
let img_height =200;
let margin = 5;
let images = [];
let folder = "images";
let loadedImagesCount = 0;

function setup() {
 	createCanvas(1200,600);
  // loading the json data. Since this is asynchronous, we use a callback for loading the images
  met_data = loadJSON("data.json", loadImages);
}

// load all images
function loadImages(){

  console.log(typeof(met_data.length));
    for(let i=0; i<met_data.length; i++){
      images[i] = loadImage(folder + "/" + met_data[i].filename,
      function(){
          // since these will load asynchronously, we have to keep track how many images have been loaded
          loadedImagesCount++;

          // once all have been loaded, draw the images
          if(loadedImagesCount==met_data.length){
            drawImages();
          }
      }
    );
    }
}



// draw images in correct aspect ratio to each other
function drawImages() {
  background(0);
  fill(255);
  textSize(8);
  let thiswidth =0;
  let thisY =0;
  for(let i =0; i<met_data.length; i++){
      images[i].resize(0, img_height);
      // image(images[i],(thiswidth),thisY, images[i].width/4, images[i].height/4);
      image(images[i],thiswidth, thisY,images[i].width, images[i].height);
      text(met_data[i].title, thiswidth+20, images[i].height+thisY+20);

      thiswidth+= images[i].width;
      if(i/4==1){
        thisY+= images[i].height+40;
        thiswidth=0;
      }
      // console.log(images[i].height);
      // console.log(images[i].width);

  }
}
