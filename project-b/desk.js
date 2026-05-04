function drawDeskInfoNote() {
    imageMode(CENTER);
    image(stickyNoteImgs[0], 250, 250, 330, 300);
  
    fill(70);
    noStroke();
    textFont(pixelFont);
    textAlign(CENTER);
    textSize(15);
  
    text(
      "Welcome to your desk!\n\nInstructions: Here you can do whatever you want\nclick around for some random activities\nWhen you get a message click on the phone!",
      160, 200, 200, 150
    );
  }

  //speaker functions on the desk
  function playSong() {
    stopSong();
  
    currentSong = floor(random(songs.length));
    songs[currentSong].play();
  
    songs[currentSong].onended(songEnded); {
    }
  }
  //if the speaker isn't clicked again then it'll play the next song
  function continueSong() {
    currentSong++;
  
    if (currentSong >= songs.length) {
      currentSong = 0;
    }
    songs[currentSong].play();
    //onended
    songs[currentSong].onended(songEnded); {
    }
  }
  function songEnded() {
    if (musicOn) {
      continueSong();
    }
  }
  
  function stopSong() {
    for (let i = 0; i < songs.length; i++) {
      songs[i].stop();
    }
  }

  function albumPage() {
    imageMode(CORNER);
    image(albumImg, 0, 0, width, height);
  
    imageMode(CENTER);
  
    //photo loading 
    image(albumPhotos[currentPhoto], 310, 240, 350, 350);
  
    //text under the postcards/photos
    textFont(pixelFont);
    fill(245);
    stroke(100);
    strokeWeight(2);
    rectMode(CENTER);
    rect(250, 450, 260, 30);
  
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text(albumTexts[currentPhoto], 250, 447);
  
  }

