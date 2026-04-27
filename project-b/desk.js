function drawDeskInfoNote() {
    imageMode(CENTER);
    image(stickyNoteImgs[0], stickyX, stickyY, stickyW, stickyH);
  
    fill(70);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(15);
  
    text(
      "Welcome to your desk!\n\nDo whatever you want.\nClick around for activities.\n\nRight now it's only\nthe thread and stars.",
      stickyX,
      stickyY,
      200,
      150
    );
  }