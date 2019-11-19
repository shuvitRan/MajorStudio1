  let metData;
  let images=[];
  let sound;
  let objIds=[];
  let img_height=300;

  let playSound = true;
  let selection ="waitSelect";

  let page = "Start";
    let vizPage = 1;

  let isClickAble = false;

let font1;
var movingDots = []
// let myMainFont = 'Trebuchet MS';
let myMainFont = 'Palatino';


let myTime = 0;
// let myMainFont = 'Comic Sans MS';

//perlinnoise
var t;

let correctSound, wrongSound,clickSound;

let posneg=1, random4Shape=1;

// sound Vis
let fft, wfft,fft2;
let fftCircles =[];
let fftLines = [];

let showInfo =false;

function preload(){
  metData = loadJSON("DataRequest/insdata.json", data=>{
    // font1 = loadFont("style/PatrickHand-Regular.ttf");
    font1 = loadFont("styleFile/Cochinchine.ttf");

    // font2 = loadFont("");
    correctSound = loadSound("sound/fx/correct.mp3");
    wrongSound = loadSound("sound/fx/wrong.mp3");
    clickSound = loadSound("sound/fx/click.mp3");
    // selectSoundFx = loadSound("sound/select.mp3")

    data.forEach(function(n,i){
      images[i]= loadImage("resizeImg/"+ metData[i].objIds+".jpg");
      // sound[i]= loadSound("../../MajorStudioSupportFile/InteractiveProject/WorldMusicTrack/"+metData[i].objIds+".mp3");
      objIds[i]=metData[i].objIds;


    });
  });
}

function setup(){

  var canvas =createCanvas(windowWidth,windowHeight);

  canvas.parent('container');

  fft = new p5.FFT(0.9,64);
  fft2 = new p5.FFT(0.9,16);
  wfft= width/64;
  clickSound.setVolume(0.5);


  // flock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < 64; i++) {
    fftCircles.push(new Jitter());
    fftLines.push(new SoundLine());
  }

  // for(let i =0; i<256;i++){
  //
  //
  // }
  // console.log(metData);
  // console.log(images);
  // resizeImages();

  // textAlign(LEFT);
  textFont(font1);
  textSize(120);
  let aString = 'Let the music play!';
  let tWidth= textWidth(aString);
  // console.log(tWidth);
  var points = font1.textToPoints(aString,(width-tWidth)/2,height/2-100,120,{
  sampleFactor: 0.25

   // simplifyThreshold: 0

});
  for(let i =0; i< points.length; i++){
    let pt = points[i];
    let movingDot = new MovingDot(pt.x,pt.y);
    movingDots.push(movingDot);
  }
t = 0.0;
  textFont(myMainFont);

}


function draw(){


    switch(page){
      case "Start":

// PerlinBackground
      // var x = width * noise(t);
      // var y = height * noise(t+5);
      // var r = 255 * noise(t+10);
      // var g = 255 * noise(t+15);
      // var b = 255 * noise(t+20);
      // background(r, g, b);
    // t = t + 0.01;
  // noStroke();
  // fill(r, g, b);

  // ellipse(x, y, 120, 120);


      background(20);

      DescriptionParagraph(height/2+100);
      // textFont(font1);

      for(let i =0; i< movingDots.length; i++){
          var v = movingDots[i];
          v.behaviors();
          v.update();
          v.show();
          // fill(i);

      }
      noStroke(0);
      strokeWeight(0);
      StartButton();

      break;

      case "Loading":
      background(20,20,20);
      fill(100);
      textSize(30);
      textAlign(CENTER,CENTER);
      text("loading",width/2, height/2)

      break;
      case "Quize":
      background(20,20,20);
      SoundViz();

      // stroke(255);
//       flock.run;
//       function mouseDragged() {
//   flock.addBoid(new Boid(mouseX, mouseY));
// }


      noStroke();
      // SoundStatus();
      displayQuizeImages();
      if(selection=="Wrong") {

        playerSelected=0;
        // background(200,50,0);
        fill(250);
        textSize(50);
        textAlign(CENTER,CENTER);
        text("WHOOPS...TRY AGAIN.",width/2, height/2-250);

        setTimeout(function(){
          selection="waitSelect";
        },500);



      } else if(selection =="Correct"){

      // background(0,200,0);
      fill(250,250,250);
      textSize(50);
      textAlign(CENTER,CENTER);
      text("YES, YOU ARE RIGHT.",width/2, height/2-250);

      setTimeout(function(){
        selection="waitSelect";
        page="Result";

      },1000);

    };

      break;

      case "Result":
      // sound.stop();
      // SoundStatus();

      DescriptionPage(resultInfo, resultPicture);
      DescriptionParagraph(height/2+300);
      // SoundStatus();


      if(!showInfo){
      showInfo=true;

      }else{
      return;
      };
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
    resizeCanvas(windowWidth,windowHeight);

  if(page!="Start"){
    soundButton.checkWidth(width/2+10,550);
    restartButton.checkWidth(width/2-210,550);

  }
  if(page=="Result"){
    infoButton.checkWidth(width/2-80,height/2+40);
  }

}

function SoundStatus(){

  if(!sound.isPlaying() && playSound==true){
    sound.loop();
  }else if( sound.isPlaying()&& playSound ==false ){

    sound.pause();

  }else if(sound.isPlaying() && playSound== false){
    // return;
    sound.pause();
  }else if(!sound.isPlaying() && playSound==true){
    sound.loop();
  };
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



function DescriptionParagraph(y){
  this.y =y;
  push();
  fill(200);
  textSize(12);
  textAlign(CENTER,CENTER);
  text("This is an interactive project based on Met's instruments collection.\n The project aims to provide the audience with a sensual association between the 24 instruments and their sounds.",width/2, this.y);
  pop();
}
