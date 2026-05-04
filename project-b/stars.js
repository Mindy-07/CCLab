function drawStarActivity() {
    background(231, 201, 169);
  // jar in top corner
    imageMode(CENTER);
    image(topStarJarImg, jarX, jarY, jarSize, jarSize);
  
    //current folding step
    image(paperStarImgs[starStep], starX, starY, starSize, starSize);
    // counter
    fill(70);
    noStroke();
    textFont(pixelFont);
    textAlign(CENTER);
    textSize(16);
    text("Stars: " + starCount + "/5", jarX, jarY + 70);
  
    //instruction
    textSize(13);
    if (starStep < 7) {
      text("Click the paper to fold the star", width / 2, height - 30);
    } else {
      text("Drag the finished star into the jar", width / 2, height - 30);
    }
  }

  function handleStarMousePressed(mx, my) {
    if (clickArea(mx, my, starX, starY, starSize, starSize)) {
      if (starStep < 7) {
        paperSound.stop();
        //play(startTime, rate, amp, cueStart, duration)
        paperSound.play(0, 1, 1, 0, 0.3);
        starStep++;
      } else {
        draggingStar = true;
      }
    }
  }

  function mouseDragged() {
    if (currentPage === "stars" && draggingStar) {
      starX = mouseX;
      starY = mouseY;
    }
  }

  function handleStarMouseReleased(mx, my) {
    if (draggingStar) {
      let d = dist(starX, starY, jarX, jarY);
  
      if (d < jarSize / 2) {
        starCount++;

        // reset to new paper strip
        starStep = 0;
        starX = 270;
        starY = 290;
      }
  
      draggingStar = false;
    }
  }