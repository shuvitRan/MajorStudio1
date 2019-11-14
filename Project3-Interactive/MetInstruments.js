  let metData;
  let images=[];
  let sound;
  let objIds=[];
  img_height=100;

  let playSound = true;
  let selection ="waitSelect";

  let page = "Start";


function preload(){
  metData = loadJSON("DataRequest/insdata.json", data=>{
    data.forEach(function(n,i){
      images[i]= loadImage("resizeImg/"+ metData[i].objIds+".jpg");
      // sound[i]= loadSound("../../MajorStudioSupportFile/InteractiveProject/WorldMusicTrack/"+metData[i].objIds+".mp3");
      objIds[i]=metData[i].objIds;
    });
  });
}

function setup(){
  var canvas =createCanvas(windowWidth,600);

  canvas.parent('container');

  // console.log(metData);
  // console.log(images);
  // resizeImages();
}


function draw(){


    switch(page){
      case "Start":
      background(0);
      StartButton();
      break;

      case "Loading":
      background(100,100,0);
      fill(20);
      textSize(30);
      textAlign(CENTER,CENTER);
      text("loading",width/2, height/2)

      break;
      case "Quize":
      background(20,20,20);

      if(!sound.isPlaying() && playSound==true){
        sound.loop();
      }else if(playSound ==false){
        sound.pause();

      };
      if(selection=="waitSelect"){

      displayQuizeImages();

    }else if(selection=="Wrong") {
      playerSelected=0;
      background(200,50,0);
      fill(0);
      textSize(50);
      textAlign(CENTER,CENTER);
      text("WHOOPS...TRY AGAIN",width/2, height/2);
      setTimeout(function(){
        selection="waitSelect";
      },500);

    } else if(selection =="Correct"){
    ;
      background(0,200,0);
      fill(0);
      textSize(50);
      textAlign(CENTER,CENTER);
      text("CORRECT",width/2, height/2);

      setTimeout(function(){
        page="Result";

        selection="waitSelect";


      },1000);

    };

      break;

      case "Result":
      // sound.stop();
      DescriptionPage(resultInfo, resultPicture);




      // setTimeout(function(){
      //   page="Start";
      //
      //
      //
      // },1000);



      break;


      default:

    }



}

function windowResized(){
    resizeCanvas(windowWidth,600);

}



function DisplayImages(){
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
