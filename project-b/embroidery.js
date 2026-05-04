
  
function mouseReleased() {
    if (currentPage === "sewing") {
      sewing.handleMouseReleased(mouseX, mouseY);
    }
    if (currentPage === "stars") {
      handleStarMouseReleased(mouseX, mouseY);
    }
  }
  
class SewingActivity {
    constructor(x, y, radius) {
      this.hoop = new EmbroideryHoop(x, y, radius);
      this.stitches = [];
      this.isDragging = false;
      this.startX = 0;
      this.startY = 0;
  
      this.palette = [
        new PalThread(50, 120, redThreadImgs[0], selectedRedThreadImgs[0], color("red"), "red"),
        new PalThread(48, 200, blueThreadImgs[0], selectedBlueThreadImgs[0], color("blue"), "blue"),
        new PalThread(46, 280, greenThreadImgs[0], selectedGreenThreadImgs[0], color("green"), "green"),
        new PalThread(44, 360, yellowThreadImgs[0], selectedYellowThreadImgs[0], color("yellow"), "yellow"),
      ];
  
      this.currentThreadColor = this.palette[0].threadColor;
      this.currentThreadName = this.palette[0].name;
      this.resetButton = new ResetButton(85, 440, 90, 120, "Reset");
    }
    display() {
        this.hoop.display();
      
        for (let i = 0; i < this.stitches.length; i++) {
          this.stitches[i].display();
        }
      
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
  
    displayPalette() {
  
      for (let i = 0; i < this.palette.length; i++) {
        let isSelected = this.currentThreadName === this.palette[i].name;
        this.palette[i].display(isSelected);
        
      }
      this.resetButton.display();
    }
  
    displayInfo() {
      fill(70);
      noStroke();
      textFont(pixelFont);
      textAlign(CENTER);
      textSize(13);
      text("Stitches: " + this.stitches.length +"/15", width / 2, height - 20);
    }
  
  
    handleMousePressed(mx, my) {
      if (this.resetButton.contains(mx, my)) {
        this.stitches = []; //clear my array
        return;
      
      }
      //checks the palette first
      for (let i = 0; i < this.palette.length; i++) {
        if (this.palette[i].contains(mx, my)) {
          this.currentThreadColor = this.palette[i].threadColor;
          this.currentThreadName = this.palette[i].name;
          return;
        }
      }
  
      //start sewing
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

  class EmbroideryHoop {
    constructor(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
  
      this.displayW = 420;
      this.displayH = 420;
    }
  
    display() {
      imageMode(CENTER);
      image(hoopImgs[0], this.x, this.y, this.displayW, this.displayH);

      // //TEMP HitBox checker
      // noFill();
      // stroke("red");
      // strokeWeight(2);
      // circle(this.x+12, this.y+22, (this.radius - 24) * 2);
    }
  
    contains(px, py) {
      return dist(px, py, this.x+12, this.y+22) < this.radius - 24;
    }
  }
  
  class Stitch {
    constructor(x1, y1, x2, y2, threadColor,stitchNumber) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.threadColor = threadColor;
    }
  
    display() {
      stroke(this.threadColor);
      strokeWeight(3);
      line(this.x1, this.y1, this.x2, this.y2);
    }
  }
  
  class PalThread {
    constructor(x, y, normalImg, selectedImg, threadColor, name) {
      this.x = x;
      this.y = y;
      this.normalImg = normalImg;
      this.selectedImg = selectedImg;
      this.threadColor = threadColor;
      this.name = name;
      this.size = 58;
    }
  
    display(isSelected) {
        imageMode(CENTER);
      
        if (isSelected && this.selectedImg) {
          image(this.selectedImg, this.x, this.y, this.size, this.size);
        } else if (this.normalImg) {
          image(this.normalImg, this.x, this.y, this.size, this.size);
        }
      }
  
      contains(mx, my) {
        return clickArea(mx, my, this.x, this.y, this.size, this.size);
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
        imageMode(CENTER);
        image(resetImgs[0], this.x, this.y, this.w, this.h);
      }
  
      contains(mx, my) {
        return clickArea(mx, my, this.x, this.y, this.w, this.h);
      }
  }
