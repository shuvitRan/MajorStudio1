
let selectedItem=[];
let selectedSound;

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

        page="Quize";
        for(let i=0; i<4;++i){
          let thisid= random(thisObjId);
          selectedItem[i]=thisid;
          //Deleting the added value from the clone array
          thisObjId = arrayRemove(thisObjId,thisid);
          // console.log(thisObjId);
          quizeObj[i] = new DisplayInstruments(selectedItem[i]);
        }
        console.log(selectedItem);
        // console.log(metData);

        selectedSound=random(selectedItem);


          console.log(quizeObj);

      }

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
  }

  clicked(){
    console.log("this is item: "+objID);
  }

  display(x,y){
    this.x=x;
    this.y=y;
    image(this.obj,this.x,this.y);

  }

};







function arrayRemove(arr, value) {
   return arr.filter(function(ele){
       return ele != value;
   });
};
