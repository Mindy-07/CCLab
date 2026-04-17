let cam;
let s = 15;
let chars = [" ", ".", "-", "=", "+", "o", "%", "0", "$", "#", "@"];
function setup() {
  createCanvas(640, 480);
  cam = createCapture(VIDEO);
  cam.hide();
}
function draw() {
  background(0);
  push();
  scale(-1,1)
  translate(-width,0);
  // image(cam, 0, 0);
  cam.loadPixels();

  for(let y = 0; y<=height; y+= s) {
    for(let x = 0; x<=width; x+=s) {
      let index = (x + y * cam.width) *4
      let r = cam.pixels[index];
      let g = cam.pixels[index+1];
      let b = cam.pixels[index+2];

      let avg = (r + g + b)/3
      let charIndex = map(avg,0,255,0,chars.length)
      // let size = map(avg,0,225,0,s)

      fill(255,0,0)
      textSize(16)
      text(chars[charIndex],x,y)
      rect(x,y,size)
    }
  }


  pop();
}
