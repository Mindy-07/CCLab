let img;
let s = 5;

function preload() {
  img = loadImage(loadImage("assets/hoop"));
}

function setup() {
  createCanvas(700, 500);
}

function draw() {
  background(220);
  image(img,0,0);
  img.loadPixels();

  for (let y =0; y<=img.height; y+=s) {
    for (let x = 0; x <= img.width; x+= s) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      fill(r, g, b)
      noStroke()
      rect(x,y,s)
    }
  }



  // fill(r,g,b);
  // circle(mouseX, mouseY,50)
}
