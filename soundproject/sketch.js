let beat;
let song;
let amplitude;
let mic;

function preload() {
  beat = loadSound("sounds_asset/beat.mp3")
  song = loadSound("sounds_asset/song.mp3")
}


function setup() {
  createCanvas(400, 400);
  amplitude = new p5.Amplitude();
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(220);
  let level = mic.getLevel();

  let dia = map(level, 0.0, 0.5, 40, 200)

  circle(200,200, dia)

  //let vol = map(mouseX, 0, width, 0.0, 1.0);
  //song.setVolume(vol);

  //let rate = map(mouseY, 0, height, 0.5, 2.0)
}

//function mousePressed() {
  //if (!song.isPlaying()) {
    //song.loop();
 // }
//}