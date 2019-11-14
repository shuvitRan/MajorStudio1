function SoundViz(){
  // this.color =color;
  push();
  let spectrum = fft.analyze();
  fill(200);
  noStroke();
  rectMode(CORNER);
  // stroke(random(0,255),0,random(100,200));


  var x = width * noise(t);
  var y = height * noise(t+5);
  var r = 255 * noise(t+10);
  var g = 255 * noise(t+15);
  var b = 255 * noise(t+20);
  // background(r, g, b);

noStroke();
// fill(r, g, b);

  for(let i = 0; i<spectrum.length;i++){
    let amp = spectrum[i];
    let y = map(amp, 0 , 64, height, 0);
      let r = map(amp, 0 , 64, 4, 70);
        // fill(100);
    // rect(i*wfft,y, wfft ,height -y);
    // fill(random(40,150));
    // fill(random(r));
    fill(r,0,b)
    fftCircles[i].move();
    fftCircles[i].display(r);
  };

t = t + 0.01;
pop();

};





class Jitter {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(10, 30);
    this.speed = 1;
  }

  pUpdate(){
    this.x = random(width);
    this.y = random(height);
  }

  move() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display(spectrumInput) {
    this.spectrumInput = spectrumInput
    ellipse(this.x, this.y, this.spectrumInput, this.spectrumInput);
  }
}
