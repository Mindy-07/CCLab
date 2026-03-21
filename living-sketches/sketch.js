let scanned = [];
let sleep;
let clocks;
let bg;

let curSleep = 0;
let curClock = 0;

let alarmRinging = false;
let alarmStopped = false;

// sleep character position
let sleepX = 20;
let sleepY = 330;

// clock position
let clockX = 620;
let clockY = 330;

//scooting speed
let moveSpeed = 1.1;

//returning
let sleepBack;
let isReturning = false;
let startX = 20;


// display sizes
let sleepW, sleepH;
let clockW, clockH;

function preload() {
  //background is a bed
  bg = loadImage("bed.jpg");

  //scooting to clock images and clock
  for (let i = 1; i <= 3; i++) {
    scanned.push(loadImage("move-" + i + ".jpg"));
  }
  //scooting back to bed
  sleepBack = [];
  for (let i = 1; i <= 3; i++) {
  sleepBack.push(loadImage("back-" + i + ".jpg"));
  }
}

function setup() {
  createCanvas(800, 500);

  eraseBg(scanned, 10);
  eraseBg(sleepBack, 10);
  sleep = crop(scanned, 0, 1800, 1200, 800);
  clocks = crop(scanned, 2800, 1800, 2800, 2000);
  sleepBack = crop(sleepBack, 0, 1800, 1200, 800);
  sleepW = sleep[0].width * 0.25;
  sleepH = sleep[0].height * 0.25;

  clockW = clocks[0].width * 0.25;
  clockH = clocks[0].height * 0.25;

  console.log(sleep[0])
}

function draw() {
  image(bg, 0, 0, width, height);

  let targetX = clockX - sleepW + 40;
  let isMoving = false;

  if (alarmRinging && !alarmStopped && !isReturning) {
    // clock is ringing
    curClock = floor((frameCount / 10) % clocks.length);

    // scooting towards clock
    if (sleepX < targetX) {
      sleepX += moveSpeed;
      isMoving = true;
    } else {
      // when it reaches the clcok, it stops ringing
      alarmRinging = false;
      isReturning = true;
    }
  } 
  else if (isReturning) {
    curClock = 0;
  
    if (sleepX > startX) {
      sleepX -= moveSpeed;
      isMoving = true;
    } else {
      // returning to bed and making it stop
      isReturning = false;
      alarmStopped = true;
    }
  } else {
    curClock = 0;
  }

  let currentFrames;

  // choosing frames
  if (isReturning) {
    currentFrames = sleepBack;
  } else {
    currentFrames = sleep;
  }

  if (isMoving) {
    curSleep = 1 + floor((frameCount / 10) % 2);
  } else {
    curSleep = 0;
  }
  
  // draw moving back
  if (currentFrames[curSleep]) {
    image(currentFrames[curSleep], sleepX, sleepY, sleepW, sleepH);
  }
  // Draw Clock
   if (clocks[curClock]) {
     image(clocks[curClock], clockX, clockY, clockW, clockH);
   }
  }

function mousePressed() {
  // checks if the clock was pressed
  if (
    mouseX >= clockX &&
    mouseX <= clockX + clockW &&
    mouseY >= clockY &&
    mouseY <= clockY + clockH
  ) {
    // if the alarm is ringing, and if pressed 
    // while ringing it will make the person go back to bed
    if (alarmRinging) {
      alarmRinging = false;
      isReturning = true;
    } 
    // ringing is off and return again if pressed
    else if (!isReturning) {
      alarmRinging = true;
      alarmStopped = false;
    }
  }
}

// You shouldn't need to modify these helper functions:

function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned
}
