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
  var red = 255 * noise(t+10);
  var g = 100 * noise(t+15);
  var b = 200 * noise(t+20);
  // background(r, g, b);

noStroke();
// fill(r, g, b);

  for(let i = 0; i<spectrum.length;i++){
    let amp = spectrum[i];
    let y = map(amp, 0 , 64, height, 0);
      let r = map(amp, 0 , 64, 4, 70);

      let mix = map(r+red,0,316,21,200)
        // fill(100);
    // rect(i*wfft,y, wfft ,height -y);
    // fill(random(40,150));
    // fill(random(r));
    // fill(r,g,b);
    fill(mix,20,b);
      // fill(mix);
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
    // this.n = n;
    // this.z = z;
    // this.x += n;
    // this.y += z;
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  display(spectrumInput) {
    this.spectrumInput = spectrumInput
    ellipse(this.x, this.y, this.spectrumInput, this.spectrumInput);
  }
}
