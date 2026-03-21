let backTrack;
let image;
let x = [];
let y = [];
let sounds = [];


function preload() {
  backTrack = loadSound("assets/my-sounds/00.mp3")
  for (let i=1; i<=8; i++) {
    sounds.push(loadSound("assets/my-sounds/0"+i+".mp3"))
  }
  img = loadImage("assets/images/asterisk.png")
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  //backTrack.loop()
}

function draw() {
  background(220);
  for (let i =0; i<x.length; i++) {
    drawCircle(x[i],y[i]);
  }
}
function drawCircle(x,y) {
  fill(0)
  //circle(x,y,30)
  image(img,x,y);
  //filter(BLUR,4)
}

function mousePressed() {
  x.push(mouseX);
  y.push(mouseY); 
  //let index = (x.length - 1) % sounds.length
  //sounds[index].play();
  let index = floor(map(mouseY,0 ,height,0,sounds.length))
  console.log(sounds.length)
  console.log(index)
}
