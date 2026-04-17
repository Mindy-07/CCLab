let sewing;
// let hoopImgs = [];
// let hoopImg;
// function preload() {
//   hoopImgs[0] = loadImage("assets/images/Hoop.jpg");
// }

function setup() {
  createCanvas(500, 500);
  // hoopImgs = crop(hoopImgs, 0, 0, hoopImgs[0].width, hoopImgs[0].height);
  // eraseBg(hoopImgs, 20);
  // hoopImg = hoopImgs[0];
  sewing = new SewingActivity(290, 250, 190);
}

function draw() {
  background(231, 201, 169);
  sewing.display();
}

function mousePressed() {
  sewing.handleMousePressed(mouseX, mouseY);
}

function mouseReleased() {
  sewing.handleMouseReleased(mouseX, mouseY);
}

class SewingActivity {
  constructor(x, y, radius) {
    this.hoop = new EmbroideryHoop(x, y, radius);
    this.stitches = [];
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;

    // adjusted palette positions for shorter canvas
    this.palette = [
      new PalColor(50, 120, color("red"), "red"),
      new PalColor(50, 200, color("blue"), "blue"),
      new PalColor(50, 280, color("green"), "green"),
      new PalColor(50, 360, color("black"), "black"),
    ];

    this.currentThreadColor = this.palette[0].threadColor;
    this.currentThreadName = this.palette[0].name;
    this.resetButton = new ResetButton(85, 440, 90, 36, "Reset");
  }

  display() {
    this.drawFabricArea();
    this.hoop.display();
    
    // stitches
    for (let i = 0; i < this.stitches.length; i++) {
      this.stitches[i].display();
    }

    //while dragging
    if (this.isDragging) {
      stroke(this.currentThreadColor);
      strokeWeight(3);
      line(this.startX, this.startY, mouseX, mouseY);

      fill(130, 90, 90);
      noStroke();
      circle(mouseX, mouseY, 8);
    }

    this.displayPalette();
    this.displayInfo();
  }

  drawFabricArea() {
    noStroke();
    fill(250, 247, 243);
    circle(this.hoop.x, this.hoop.y, this.hoop.radius * 2 - 18);
  }

  displayPalette() {
    // fill(70);
    // noStroke();
    // textAlign(CENTER);
    // textSize(12);
    // text("Thread", 60, 120);

    for (let i = 0; i < this.palette.length; i++) {
      let isSelected = this.currentThreadName === this.palette[i].name;
      this.palette[i].display(isSelected);
      
    }
    this.resetButton.display();
  }

  displayInfo() {
    fill(70);
    noStroke();
    textAlign(CENTER);
    textSize(13);
    text("Stitches: " + this.stitches.length, width / 2, height - 20);
  }


  handleMousePressed(mx, my) {
    if (this.resetButton.contains(mx, my)) {
      this.stitches = []; // This clears the array of stitches
      return;
    
    }
    // check palette first
    for (let i = 0; i < this.palette.length; i++) {
      if (this.palette[i].contains(mx, my)) {
        this.currentThreadColor = this.palette[i].threadColor;
        this.currentThreadName = this.palette[i].name;
        return;
      }
    }

    // start sewing
    if (this.hoop.contains(mx, my)) {
      this.startX = mx;
      this.startY = my;
      this.isDragging = true;
    }
  }

  handleMouseReleased(mx, my) {
    if (!this.isDragging) return;

    if (this.hoop.contains(mx, my)) {
      let d = dist(this.startX, this.startY, mx, my);

      if (d > 8) {
        this.stitches.push(
          new Stitch(this.startX, this.startY, mx, my, this.currentThreadColor)
        );
      }
    }

    this.isDragging = false;
  }
}

// class EmbroideryHoop {
//   constructor(x, y, radius) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.displayW = 420;
//     this.displayH = 300;
//   }

//   display() {
//     imageMode(CENTER);
//     image(hoopImg, this.x, this.y, this.displayW, this.displayH);
//   }

//   contains(px, py) {
//     let dx = px - this.x;
//     let dy = py - this.y;

//     let rx = this.displayW * 0.38;
//     let ry = this.displayH * 0.42;

//     return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) < 1;
//   }
// }
class EmbroideryHoop {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  display() {
    push();

    //hoop
    noFill();
    stroke(171, 116, 67);
    strokeWeight(10);
    circle(this.x, this.y, this.radius * 2);

    //canvas
    noStroke();
    fill(248, 244, 236);
    circle(this.x, this.y, this.radius * 2 - 8);

    //top clamp
    fill(171, 116, 67);
    rectMode(CENTER);
    rect(this.x, this.y - this.radius - 6, 30, 18, 5);

    pop();
  }

  contains(px, py) {
    return dist(px, py, this.x, this.y) < this.radius - 10;
  }
}


class Stitch {
  constructor(x1, y1, x2, y2, threadColor,stitchNumber) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.threadColor = threadColor;
    this.stitchNumber = stitchNumber;
  }

  display() {
    stroke(this.threadColor);
    strokeWeight(3);
    line(this.x1, this.y1, this.x2, this.y2);

    let midX = (this.x1 + this.x2) / 2;
    let midY = (this.y1 + this.y2) / 2;

    // fill(70);
    // noStroke();
    // textAlign(CENTER, CENTER);
    // textSize(10);
    // text(this.stitchNumber, midX, midY - 10);

  }
}

class PalColor {
  constructor(x, y, threadColor, name) {
    this.x = x;
    this.y = y;
    this.size = 40;
    this.threadColor = threadColor;
    this.name = name;
  }

  display(isSelected) {
    if (isSelected) {
      stroke(255, 140, 120);
      strokeWeight(4);
    } else {
      stroke(120);
      strokeWeight(1.5);
    }

    fill(this.threadColor);
    circle(this.x, this.y, this.size);
  }

  contains(mx, my) {
    return dist(mx, my, this.x, this.y) < this.size / 2;
  }
}
class ResetButton {
  constructor(x, y, w, h, label) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
  }

  display() {
    rectMode(CENTER);
    stroke(120);
    strokeWeight(1.5);
    fill(225);
    rect(this.x, this.y, this.w, this.h);

    fill(70);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(this.label, this.x, this.y);
  }

  contains(mx, my) {
    return (
      mx > this.x - this.w / 2 &&
      mx < this.x + this.w / 2 &&
      my > this.y - this.h / 2 &&
      my < this.y + this.h / 2
    );
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
