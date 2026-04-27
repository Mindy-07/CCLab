class clock {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
    }
  
    display() {
        let minHand = frameCount * 0.1 - 90; //faster
        let hrHand = frameCount * 0.01 - 90;  //slower
      
        push();
        translate(this.x, this.y);
      
        // minute 
        push();
        rotate(radians(minHand));
        stroke(0);
        strokeWeight(2);
        line(0, 0, this.r * 0.6, 0);
        pop();
      
        // hour 
        push();
        rotate(radians(hrHand));
        stroke(0);
        strokeWeight(3);
        line(0, 0, this.r * 0.4, 0);
        pop();
      
        //center
        fill(0);
        circle(0, 0, 4);
      
        pop();
      }
  }

