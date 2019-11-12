
let selectedItems=[];
let selectedSoundId;

let playerSelected;

let quizeObj=[];

function StartButton(){

  rectMode(CENTER);
  let buttonWidth=200;
  let buttonHeight=50;

  let thisObjId = [...objIds];

  if(mouseX>=width/2-buttonWidth/2 &&
    mouseX<=width/2+buttonWidth/2 &&
    mouseY<=height/2+buttonHeight/2 &&
    mouseY>=height/2-buttonHeight/2){
      fill(100);
      rect(width/2, height/2,buttonWidth,buttonHeight,10);
      if(mouseIsPressed){

        page="Loading";
        calculateQuize(thisObjId);
      };

  }else{
    fill(200);
    rect(width/2, height/2,buttonWidth,buttonHeight,10);
  }
  fill(20);
  textSize(30);
  textAlign(CENTER,CENTER);
  text("ENTER",width/2, height/2)
  // enterButton.mouseOver();
};


class DisplayInstruments {
  constructor(objID){
    this.obj = loadImage("resizeImg/"+objID+".jpg");
    this.objID=objID
  }

  clicked(mx,my){
    if(mx>=this.x&&
       mx<=this.x+this.obj.width &&
       my >=this.y &&
       my<=this.y+this.obj.height){
         playerSelected = this.objID;


         console.log("this is item: "+this.objID);

         compareResult();


    }
  }

  selected(mx,my){
    if(mx>=this.x&&
       mx<=this.x+this.obj.width &&
       my >=this.y &&
       my<=this.y+this.obj.height){
         // this.obj.resize(0,250);
         rectMode(CORNER);
         fill(190,0,100,100);
         rect(this.x,this.y,this.obj.width,this.obj.height);
     }
  }

  display(x,y,resize){
    this.resize= resize;
    this.obj.resize(0,this.resize);
    this.x=x;
    this.y=y;
    image(this.obj,this.x,this.y);

  }

};



function calculateQuize(thisObjId){

  for(let i=0; i<4;++i){
    let thisid= random(thisObjId);
    selectedItems[i]=thisid;
    //Deleting the added value from the clone array
    thisObjId = arrayRemove(thisObjId,thisid);
    // console.log(thisObjId);
    quizeObj[i] = new DisplayInstruments(selectedItems[i]);
  }
  selectedSoundId=random(selectedItems);
  sound = loadSound("../../MajorStudioSupportFile/InteractiveProject/WorldMusicTrack/"+
    selectedSoundId+".mp3",()=>{
    console.log("selectedItems:"+ selectedItems);
    console.log("QuizeObj:"+quizeObj);
    console.log("selectedSoundId"+selectedSoundId);
      page="Quize";

  });

};

function displayQuizeImages(){

  let thisX = 0;

  for(let i=0; i<selectedItems.length;++i){
    thisX+=quizeObj[i].obj.width;
  };

  let centerX = (width-thisX)/2;

  let newX =  centerX;
  selectedItems.forEach((n,i)=>{
    // thisX+=quizeObj[i].obj.width;
    quizeObj[i].display(newX,height/2-100,200);
    newX+=quizeObj[i].obj.width+10;
    quizeObj[i].selected(mouseX,mouseY);
  });

};

function mouseReleased(){
  if(page == "Quize" && selection =="waitSelect"){
    for(let i = 0 ; i< quizeObj.length; ++i){
      quizeObj[i].clicked(mouseX,mouseY);
    }
  };

}

function compareResult(){

  if(playerSelected == selectedSoundId){


       selection ="Correct";

  }
  else if(playerSelected != selectedSoundId){

    selection = "Wrong";

    // page="ResultWrong";

  }
};


function DescriptionPage(){
  background(240);
  for(let i =0; i<quizeObj.length;++i){
    if(quizeObj[i].objID==selectedSoundId){
      quizeObj[i].display(width/2-quizeObj[i].obj.width,height/2-150,200);
    }
  };
  fill(0);
  textSize(50);
  textAlign(CENTER,CENTER);
  // text("CORRECT",width/2, height/2);
  // for(let number in metData ){
  //   console.log(metData[number]);
  //
  //
  // }

}


// function mouseMoved(){
//   for(let i = 0 ; i< quizeObj.length; ++i){
//     quizeObj[i].selected(mouseX,mouseY);
//   }
// }



function arrayRemove(arr, value) {
   return arr.filter(function(ele){
       return ele != value;
   });
};
