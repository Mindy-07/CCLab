let c = [];
let f = [];
let yay;

function preload() {
  yay = loadSound("yay.wav");
  yay.play();
}

function setup() {
  createCanvas(400, 400);
  // c = new Cloud(200, 200, 100)
}

function mousePressed() {
  c.push(new Cloud(mouseX,mouseY,random(40,80)))
  // f.push(new Firework(mouseX,mouseY))
  // for (let i = c.length - 1; i >= 0; i--) {
  //   let d = dist(mouseX, mouseY, c[i].x, c[i].y)
  //   if (d < 60) {
  //     c.splice(i, 1)
  //   }
  // }
}

function keyPressed() {
  if (key == " ") {
    c.push(new Cloud(200, 200, 60))
  }
}

function draw() {
  background(150, 125, 255);
  text(c.length, 50, 50);
  // if(mouseIsPressed) {
  //   f.push(new Firework(mouseX,mouseY))
  // }
 
  for (let i = 0; i < f.length; i++) {
    f[i].update();
    f[i].display();
  }
  
  for (let i = 0; i < c.length; i++) {
    for (let j = 0; j < c.length; j++) {
      if (j != i) {
        c[i].checkCollision(c[i]);
      }
    }
    if (c[i].isRaining) {
      f.push(new Firework(c[i].x, c[i].y));
    }
    c[i].move();
    c[i].display();
  }

  for (let i = c.length - 1; i >= 0; i--) {
    if (c[i].isDone) {
      c.splice(i, 1)
    }
  }
  for (let i = f.length - 1; i >= 0; i--) {
    if (f[i].isDone) {
      f.splice(i, 1)
    }
  }
}


