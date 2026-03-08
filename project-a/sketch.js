let d = 100;
let isFullMoon = false;
let forestSeed;
let moonPhase = 0.5;
let nextResetSeed = 0;
let attraction = 0;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container")
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  reset();
}

function draw() {
  if (isFullMoon === true) {
    background(260, 40, 15);
  } else {
    background(30, 40, 5);
  }

  drawMoon(isFullMoon, moonPhase);
  drawForest(isFullMoon);

  //attraction to light
  if (mouseIsPressed) {
    if (attraction < 1) {
      //speed they flock
      attraction += 0.01;
    }
  } else {
    if (attraction > 0) {
      // How fast they wander away
      attraction -= 0.01;
    }
  }

  // moon-bug
  for (let y = d / 2; y < height + 1000; y += d) {
    for (let x = d / 2; x < width + 1000; x += d) {
      // stops jittering
      randomSeed(forestSeed + x * 100 + y);

      let size = random(0.1, 0.2);
      let rotation = random(0, 360);
      let flapSpeed = random(5, 15);

      let noiseSeedX = random(1000);
      let noiseSeedY = random(1000);

      // find where their positions are
      let offsetX = map(noise(noiseSeedX, frameCount * 0.01), 0, 1, -100, 100);
      let offsetY = map(noise(noiseSeedY, frameCount * 0.01 + 50), 0, 1, -100, 100);
      
      let wanderX = x + offsetX;
      let wanderY = y + offsetY;

      // where they flock
      let swarmX = wanderX;
      let swarmY = wanderY;

      if (attraction > 0) {
        let loc = forestSeed + x * 1000 + y;
        randomSeed(loc);
        let dir = random(0, 360);
        let mouseDis = random(20, 250);
        let speed = random(0.3, 2.5);

        let movSpeed = dir + frameCount * speed;

        swarmX = mouseX + cos(movSpeed) * mouseDis;
        swarmY = mouseY + sin(movSpeed) * mouseDis;

        swarmX += map(noise(noiseSeedX, frameCount * 0.06), 0, 1, -12, 12);
        swarmY += map(noise(noiseSeedY, frameCount * 0.06 + 10), 0, 1, -12, 12);
      }

      // lerp
      let finalPosX = lerp(wanderX, swarmX, attraction);
      let finalPosY = lerp(wanderY, swarmY, attraction);

      drawCreature(finalPosX, finalPosY, size, rotation, flapSpeed, isFullMoon);
    }
  }

  if (mouseIsPressed) {
    drawLight(mouseX, mouseY, 1);
  }
}

function drawCreature(x, y, size, rota, flapSpeed, wisp) {
  let backColor;
  let middleColor; 
  let headColor; 
  let eyeColor;

  if (wisp) {
    //Full moon situation
    backColor = color(280, 50, 40);
    middleColor = color(280, 50, 40);
    headColor = color(240, 40, 100);
    eyeColor = color(0, 0, 100);
  } else {
    backColor = color(30, 40, 40);
    middleColor = color(40, 30, 60);
    headColor = color(20, 50, 20);
    eyeColor = color(0, 0, 0);
  }

  push();
  translate(x, y);
  rotate(rota);
  scale(size);

  if (wisp) {
    noStroke();
    //glowing
    for (let i = 3; i > 0; i--) {
      fill(180, 50, 100, 5 * i);
      ellipse(0, 20, 100 * i, 100 * i);
    }
  }
  stroke(headColor);
  strokeWeight(2);
  noFill();
  bezier(-5, -5, -30, -40, -50, -10, -70, -40);
  bezier(5, -5, 30, -40, 50, -10, 70, -40);

  noStroke();
  fill(backColor);
  ellipse(0, 80, 35, 75);

  fill(middleColor);
  ellipse(0, 35, 50, 55);

  fill(headColor);
  ellipse(0, 0, 25, 20);

  fill(eyeColor);
  ellipse(-8, -2, 6, 8);
  ellipse(8, -2, 6, 8);

  drawWings(flapSpeed);
  pop();
}

function drawWings(flapSpeed) {
  let flap = abs(sin(frameCount * flapSpeed));

  push();
  noStroke();
  fill(40, 20, 80, 60);

  scale(flap * 0.5, 1);

  // Top Wings
  ellipse(85, 35, 200, 60); // Right
  ellipse(-85, 35, 200, 60); // Left

  // Bottom Wings
  rotate(-355);
  ellipse(75, 75, 150, 60); // Right
  rotate(353);
  ellipse(-75, 75, 150, 60); // Left
  pop();
}

function drawMoon(full, phase) {
  push();
  translate(width - 80, 60);
  noStroke();

  let moonColor;
  if (full) {
    moonColor = 190;
  } else {
    moonColor = 45;
  }
  //Moon cover for phases
  for (let r = 50; r > 0; r -= 5) {
    fill(moonColor, 20, 100, 7);
    circle(0, 0, r * 2.5);
  }
  fill(moonColor, 10, 100);
  circle(0, 0, 80);

  if (full === false) {
    fill(30, 40, 5);
    let mShadowX = map(phase, 0, 0.7, 10, 25);
    circle(mShadowX, -25, 80);
  }
  pop();
}

function reset() {
  forestSeed = random(10000);
  moonPhase = random(1);
  if (moonPhase > 0.7) {
    isFullMoon = true;
  } else {
    isFullMoon = false;
  }
}

function keyPressed() {
  if (key == "r" || key == "R") {
    reset();
  } else if (key == "1") {
    //Press 1 for random phase
    isFullMoon = false;
    moonPhase = random(1); 
  } else if (key == "2") {
    //Press 2 for full moon
    isFullMoon = true;
    
  }
}

function drawLight(x, y) {
  let radius = 80;
  noStroke();
  // soft glow with layered circles
  for (let r = radius; r > 0; r -= 12) {
    let t = r / radius;
    let a = 25 * t;
    fill(45, 60, 100, 40 * (1 - t));
    circle(x, y, r * 3);
  }

  fill(50, 20, 100, 80);
  circle(x, y, radius * 0.35);
}

function drawForest(wisp) {
  push();
  randomSeed(forestSeed); 

  let trunkHue;
  if (wisp === true) {
    trunkHue = 260;
  } else {
    trunkHue = 30;
  }

  //Background Trees

  for (let i = 0; i < 20; i++) {
    stroke(0)
    let x = random(width);
    let w = random(10, 30);
    let startY = 0;

    //trees are set below the moon
    if (x > width - 160) {
      startY = 140; 
    }

    fill(trunkHue, 40, 10, 80);
    noStroke();
    rect(x, startY, w, height);
  }

  // Trees in front
  stroke(0)
  for (let i = 0; i < 10; i++) {
    let x = random(-50, width);
    let w = random(40, 60);
    let startY = 0;

    // Checking if the trees overlaps w/ the moon
    if (x + w > width - 160) {
      startY = 140; 
    }

    fill(trunkHue, 40, 15, 90);
    rect(x, startY, w, height);
  }

  //Tree Leaves
  noStroke()
  for (let i = 0; i < 60; i++) {
    let leafx = random(width);
    let leafy = random(-20, 80);
    
    // Prevents leaves from covering moon
    if (leafx > width - 160 && leafy < 140) {
      leafy += 120; // Push these specific leaves lower
    }

    let leafColor;
    let leafSat; // Saturation
    let leafBri; // Brightness

    // Check if it's a full moon to swap the leaf colors
    if (wisp === true) {
      // Mystical colors
      leafColor = map(random(), 0, 1, 180, 240);
      leafSat = 65; 
      leafBri = 25; 
    } else {
      // Forest colors
      leafColor = map(random(), 0, 1, 80, 140);
      leafSat = 50;
      leafBri = 15;
    }

    fill(leafColor, leafSat, leafBri, 80);
    ellipse(leafx, leafy, random(80, 150), random(50, 100));
  }
  pop();
}
