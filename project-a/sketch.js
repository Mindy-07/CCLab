let d = 100;
let isFullMoon = false;
let forestSeed;
let moonPhase = 0.5;
let nextResetSeed = 0;

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
  //background(30, 40, 5);

  // Mulch
  push();
  for (let i = 0; i < 200; i++) {
    randomSeed(forestSeed + i); // Keep mulch static
    let mulX = random(width);
    let mulY = random(height);
    fill(20, 30, 15, 30);
    noStroke();
    circle(mulX, mulY, 2);
  }
  pop();

  //leaves and sticks
  let breeze = noise(frameCount * 0.01);
  let breezeS = map(breeze, 0, 1, 0.2, 1.6);
  let floor = width / 16;

  for (let y = -floor; y < height + floor; y += floor * 0.7) {
    for (let x = -floor; x < width + floor; x += floor * 0.7) {
      let baseN = noise(x * 0.01, y * 0.01);
      let windN = noise(x * 0.02, y * 0.02, frameCount * 0.01);

      let xPos = x + (noise(x, y) - 0.5) * floor;
      let yPos = y + (noise(y, x) - 0.5) * floor;

      let offset = map(windN, 0, 1, -10, 10) * breezeS;

      push();
      translate(xPos + offset, yPos);
      rotate(baseN * 360);

      if (baseN > 0.4) {
        // leaves
        let hueVal = map(baseN, 0.4, 1, 80, 140);
        let bri = map(y, 0, height, 15, 45);

        fill(hueVal, 50, bri, 80);
        //leaf shape overlap ellipses
        ellipse(0, 0, floor * 0.8, floor * 0.4);
        fill(hueVal, 60, bri - 10, 40);
        ellipse(0, 0, floor * 0.5, floor * 0.2);
      } else {
        // Sticks
        fill(30, 40, 20, 60);
        rect(0, 0, floor * 0.5, 2, 2);
      }
      pop();
    }
  }

  //creatures
  for (let y = d / 2; y < height + 1000; y += d) {
    for (let x = d / 2; x < width + 1000; x += d) {
      //stops jittering
      randomSeed(forestSeed + x * 100 + y);

      let size = random(0.1, 0.2);
      let rotation = random(0, 360);
      let flapSpeed = random(5, 15);

      let noiseSeedX = random(1000);
      let noiseSeedY = random(1000);

      let offsetX = map(noise(noiseSeedX, frameCount * 0.01), 0, 1, -100, 100);
      let offsetY = map(
        noise(noiseSeedY, frameCount * 0.01 + 50),
        0,
        1,
        -100,
        100
      );

      let posX = x + offsetX;
      let posY = y + offsetY;

      // randown swarm around light
      if (mouseIsPressed) {
        let loc = forestSeed + x * 1000 + y;

        randomSeed(loc);
        let dir = random(0, 360);
        let mouseDis = random(20, 250);
        let speed = random(0.3, 2.5);

        let movSpeed = dir + frameCount * speed;

        posX = mouseX + cos(movSpeed) * mouseDis;
        posY = mouseY + sin(movSpeed) * mouseDis;

        posX += map(noise(noiseSeedX, frameCount * 0.06), 0, 1, -12, 12);
        posY += map(noise(noiseSeedY, frameCount * 0.06 + 10), 0, 1, -12, 12);
      }

      drawCreature(posX, posY, size, rotation, flapSpeed, isFullMoon);
    }
  }
  if (mouseIsPressed) {
    drawLight(mouseX, mouseY);
  }
}

function drawCreature(x, y, size, rota, flapSpeed, wisp) {
  let backColor; //= color(30, 40, 40);
  let middleColor; //= color(40, 30, 60);
  let headColor; //= color(20, 50, 20);
  let eyeColor; //= color(0, 0, 0);

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
      fill(190, 50, 100, 10 * i);
      ellipse(0, 20, 120 * i, 160 * i);
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
  translate(width - 80, 80);
  noStroke();

  let moonColor;
  if (full) {
    moonColor = 190;
  } else {
    moonColor = 45;
  }
  //Moon cover for phases
  for (let r = 50; r > 0; r -= 5) {
    fill(moonColor, 20, 100, 2);
    circle(0, 0, r * 2.5);
  }
  fill(moonColor, 10, 100);
  circle(0, 0, 60);

  if (full === false) {
    fill(30, 40, 5);
    let mShadowX = map(phase, 0, 0.7, 10, 50);
    circle(mShadowX, -5, 60);
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
