let img; // <---
let s = 6;

function preload() {
  img = loadImage('assets/photo_6.jpg'); //<----
}

function setup() {
  createCanvas(266, 400);
  background(0);
}

function draw() {
  // background(0);
  // image(img, 0, 0); // <---
  img.loadPixels();

  // for (let i = 0; i < 100; i++) {

  //   let x = floor(random(0, width))
  //   let y = floor(random(0, height))

  //   let index = (x + y * img.width) * 4;
  //   let r = img.pixels[index];
  //   let g = img.pixels[index + 1];
  //   let b = img.pixels[index + 2];

  //   noStroke();
  //   fill(r, g, b)
  //   rect(x, y, s, s);
  //   //circle(x, y, s)
  // }




  for (let y = 0; y <= img.height; y += s) {
    for (let x = 0; x <= img.width; x += s) {
      let d = dist(mouseX, mouseY, x, y);
      let size = map(d, 0, img.width, s + 1, 5);

      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];

      noStroke()
      fill(r, g, b)
      //circle(x, y, size)
      rect(x, y, s)
    }
  }





  // fill(r, g, b);
  // circle(mouseX, mouseY, 50)
}
