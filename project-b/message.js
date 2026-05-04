function messagesPage() {
    background(231, 201, 169);
  
    //phone
    rectMode(CENTER);
    fill(245, 238, 225);
    stroke(60);
    strokeWeight(5);
    rect(width / 2, height / 2, 310, 420);
  
    //messages
    fill(180, 210, 180);
    noStroke();
    rect(width / 2, 70, 300, 55, 20);
  
    fill(40);
    textFont(pixelFont);
    textAlign(CENTER);
    textSize(18);
    text("MESSAGES", width / 2, 70);

    //text bubble from friend
    fill(173,216,230)
    rect(200, 350, 180, 45, 20)
    fill(0)
    textSize(10);
    if (messageN === 1) {
        text("Come on just come out,\nyou are always in your room", 200, 350);
        fill(211, 211, 211)
        rect(300, 420, 180, 45, 20)
        fill(0);
        text("ummm.. maybe later", 300, 420);

      } else if (messageN === 2) {
        text("You have to come! You're' probably \n just sitting in your room anyway", 200, 350);
        fill(211, 211, 211)
        rect(300, 420, 180, 45, 20)
        fill(0);
        text("oh.. I'll get back to you", 300, 420);
      } else if (messageN === 3) {
        text("Hii we should hang out today! \n no worries if you can't though :)", 200, 350);



           //yes button
        fill(255);
        stroke(80);
        strokeWeight(2);
        rect(180, 410, 90, 45);

        fill(40);
        noStroke();
        textSize(15);
        text("Yes", 180, 410);

    //no button
        fill(255);
        stroke(80);
        strokeWeight(2);
        rect(320, 410, 90, 45);

        fill(40);
        noStroke();
        text("No", 320, 410);
      }
}

function checkYesorNo(mx, my) {
    if (messageN === 3) {
      // yes button
      if (clickArea(mx, my, 180, 410, 90, 45)) {
        currentPage = "yesPage";
      }
  
      // no button
      if (clickArea(mx, my, 320, 410, 90, 45)) {
        currentPage = "noPage";
      }
    }
  }

  function notifPopup() {
    if (notification) {
      if (millis() - notifStart > notifTime) {
        notification = false;
        return;
      }
      fill(255, 245, 180);
      stroke(80);
      strokeWeight(3);
      rectMode(CENTER);
      rect(width / 2, 95, 260, 55, 12);
  
      fill(40);
      noStroke();
      textFont(pixelFont);
      textAlign(CENTER, CENTER);
      textSize(14);
      text("You have a message!", width / 2, 95);
    }
  }
