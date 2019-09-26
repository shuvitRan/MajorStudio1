/*
Example by Dan Shiffman:
https://www.youtube.com/watch?v=lIPEvh8HbGQ
*/

let input;
let button;

function setup(){
  // we are using p5.dom, so no canvas, just html
  noCanvas();
  
  input = createInput("A crazy day today.");
  input.changed(processRita);

button = createButton("submit");
button.mousePressed(processRita);

}


function processRita() {
  console.log(input.value());
  
  let s = input.value();
  let rs = new RiString(s);
  let words = rs.words();
  let pos = rs.pos();





let output = '';

for(let i = 0; i<words.length; i++){
  output += words[i];
  output += " ";
  
}


  
  createP(s);
  
}