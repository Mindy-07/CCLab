let pixelFont;

let sewing;
let hoopImgs = [];
let deskImg;
let backImgs = [];
let speakerImgs = [];

let backX = 45;
let backY = 40;
let backSize = 60;

//sounds
//songs for speaker
let songs = [];
let currentSong = -1;
let musicOn = false;

//Where thread is
let threadOnDeskX = 50;
let threadOnDeskY = 250;
let threadOnDeskSize = 60;

//where jar is
let deskStarJarX = 380;
let deskStarJarY = 260;
let deskStarJarSize = 110;

//where speaker is
let speakerX = 90;
let speakerY = 140;
let speakerSize = 130;

//homepage
let wallclock;
let startbuttonImgs = [];
let startImg;
let currentPage = "start";
//threads 
let redThreadImgs = [];
let selectedRedThreadImgs = [];
let blueThreadImgs = []
let selectedBlueThreadImgs = []
let greenThreadImgs = []
let selectedGreenThreadImgs = []
let yellowThreadImgs = []
let selectedYellowThreadImgs = []
let resetImgs = []

//Info page w/ the sticky note
let infoImgs = [];
let stickyNoteImgs = [];

let infoX = 455;
let infoY = 45;
let infoSize = 45;

let showDeskInfo = false;

//where the close hitbox is
let stickyCloseX = 385;
let stickyCloseY = 160;
let stickyCloseSize = 45;

//Jar of stars in star activity
let starJarImg;
let topStarJarImg;
let paperStarImgs = [];

let paperSound;

let starStep = 0;
let starCount = 0;

let starX = 270;
let starY = 290;
let starSize = 150;

let jarX = 420;
let jarY = 80;
let jarSize = 95;

let draggingStar = false;

//album/drawer 
let flipSound;
let drawerImg;
let albumImg;
let albumPhotos = [];
//album
let albumTexts = ["New York City 6/25/25", "Hong Kong 4/5/26", "Photo Strip 4/18/26", "Hong Kong 1/15/26",
  "Mantou! 11/23/26",
  "21st Birthday 9/20/26",
  "Xin Jiang 12/28/25",
  "Graduating! Class of 26'"
];

let drawerOpen = false;
let albumOpen = false;
let currentPhoto = 0;

//the progress level
let progressImgs = [];
let progressLevel = 0;

let sewingGoal = false;
let starsGoal = false;
let albumGoal = false;

//phone
let phoneImgs = [];
let phoneIndex = 0;
let openMessage = false;

//recentProgress
let recentProgress = 0;
let unreadMessage = false;
let messageN = 0;

//notifications
let notification = false;
let notifStart = 0;
let notifTime = 2500; 
let notifSound;

//ending pages
let yesImg;
let noImg;

//drawer
let drawerSound;



function preload() {
  pixelFont = loadFont('assets/Retropix.ttf');
  //Image and sound preloads
  deskImg = loadImage("assets/images/desk.jpg");
  hoopImgs.push(loadImage("assets/images/hoop.jpg"));
  startImg = loadImage("assets/images/start_page.jpg");
  backImgs.push(loadImage("assets/images/back.jpg"));
  resetImgs.push(loadImage("assets/images/reset_button.jpg"));
  redThreadImgs.push(loadImage("assets/images/red_thread.jpg"));
  selectedRedThreadImgs.push(loadImage("assets/images/selected_red_thread.jpg"));
  blueThreadImgs.push(loadImage("assets/images/blue_thread.jpg"));
  selectedBlueThreadImgs.push(loadImage("assets/images/selected_blue_thread.jpg"));
  greenThreadImgs.push(loadImage("assets/images/green_thread.jpg"));
  selectedGreenThreadImgs.push(loadImage("assets/images/selected_green_thread.jpg"));
  yellowThreadImgs.push(loadImage("assets/images/yellow_thread.jpg"));
  selectedYellowThreadImgs.push(loadImage("assets/images/selected_yellow_thread.jpg"));
  starJarImg = loadImage("assets/images/starjar.jpg");
  topStarJarImg = loadImage("assets/images/top_starjar.jpg");
  speakerImgs.push(loadImage("assets/images/speaker.jpg"));
  infoImgs.push(loadImage("assets/images/info.jpg"));
  stickyNoteImgs.push(loadImage("assets/images/sticky_note.jpg"));
  startbuttonImgs.push(loadImage("assets/images/start.jpg"));
  drawerImg = loadImage("assets/images/drawer.jpg");
  albumImg = loadImage("assets/images/album.jpg");

  yesImg= loadImage("assets/images/yes_page.jpg");
  noImg= loadImage("assets/images/no_page.jpg");
  for (let i = 1; i <= 2; i++) {
    phoneImgs.push(loadImage("assets/images/phone_" + i + ".jpg"));
  }

  for (let i = 0; i <= 3; i++) {
    progressImgs.push(loadImage("assets/images/progress_" + i + ".jpg"));
  }

  for (let i = 1; i <= 8; i++) {
    paperStarImgs.push(loadImage("assets/images/ps" + i + ".jpg"));
}
  for (let i = 1; i <= 3; i++) {
    songs.push(loadSound("assets/sounds/lofi_" + i + ".mp3"));
}
  for (let i = 1; i <= 8; i++) {
    albumPhotos.push(loadImage("assets/images/photo_" + i + ".jpg"));
}
//sounds
paperSound = loadSound("assets/sounds/paper.mp3");
notifSound = loadSound("assets/sounds/notification.mp3")
drawerSound = loadSound("assets/sounds/drawer.mp3")
flipSound = loadSound("assets/sounds/flip.mp3");
}

function setup() {
  let canvas = createCanvas(500, 500);
  canvas.parent("p5-canvas-container");
  //createCanvas(500, 500);
  //Erasing my bg
  eraseBg(hoopImgs, 25);
  eraseBg(redThreadImgs, 25);
  eraseBg(selectedRedThreadImgs, 25);
  eraseBg(blueThreadImgs, 25);
  eraseBg(selectedBlueThreadImgs, 25);
  eraseBg(greenThreadImgs, 25);
  eraseBg(selectedGreenThreadImgs, 25);
  eraseBg(yellowThreadImgs, 25);
  eraseBg(selectedYellowThreadImgs, 25);
  eraseBg(resetImgs, 25);
  eraseBg(backImgs, 20);
  eraseBg(paperStarImgs, 25);
  eraseBg([starJarImg], 25);
  eraseBg([topStarJarImg], 25);
  eraseBg(speakerImgs, 25);
  eraseBg(infoImgs, 25);
  eraseBg(stickyNoteImgs, 35);
  eraseBg(startbuttonImgs,25);
  eraseBg(albumPhotos,10);
  eraseBg(progressImgs, 25);
  eraseBg(phoneImgs,25);
  
  wallclock = new clock(405, 120, 43);
  sewing = new SewingActivity(290, 250, 190);
}

function draw() {
  updateProgress();

  if (currentPage === "start") {
    drawStartPage();
  } else if (currentPage === "sewing") {
    background(231, 201, 169);
    sewing.display();
    //back arrow 
    imageMode(CENTER);
    image(backImgs[0], backX, backY, backSize, backSize);
    drawProgressBar();

  } else if (currentPage === "desk") {
    imageMode(CORNER);
    image(deskImg, 0, 0, width, height);
    imageMode(CENTER);
    //the speaker
    image(speakerImgs[0], speakerX, speakerY, speakerSize, speakerSize);
    //the red thread
    image(redThreadImgs[0], threadOnDeskX, threadOnDeskY, threadOnDeskSize, threadOnDeskSize);
    //jar of stars
    image(starJarImg, 380, 260, 120, 120);
    //info button
    imageMode(CENTER);
    image(infoImgs[0], infoX, infoY, infoSize, infoSize);
    //image(phoneImgs[0], 250, 260, 120, 120);
    //phone image based on progress bar
    phoneIndex = 0;
    if (unreadMessage) {
      phoneIndex = 1;
    }
    image(phoneImgs[phoneIndex], 250, 260, 120, 120);
    
    drawProgressBar();


    if (showDeskInfo) {
      drawDeskInfoNote();
    }

  } else if (currentPage === "stars") {
    drawStarActivity();
    //back arrow 
    imageMode(CENTER);
    image(backImgs[0], backX, backY, backSize, backSize);
    drawProgressBar();
  }
  else if (currentPage === "drawer") {
    imageMode(CORNER);
    image(drawerImg, 0, 0, width, height);
    image(backImgs[0], backX - 30, backY - 20, backSize, backSize);
    drawProgressBar();

  }
  
  else if (currentPage === "album") {
    imageMode(CORNER);
    image(albumImg, 0, 0, width, height);
    albumPage();
    image(backImgs[0], backX , backY -10 , backSize, backSize);
    drawProgressBar();
                    // //TEMP HITBOX
                    // noFill();
                    // stroke("red");
                    // strokeWeight(2);
                    // rectMode(CENTER);
                    // rect(485, 260, 25, 45);  
                
                    // fill(255, 0, 0, 100); 
                    // rectMode(CENTER);
                    // rect(485, 260, 25, 45);
  }
  else if (currentPage === "messages") {
    image(backImgs[0], backX, backY, backSize, backSize);
    messagesPage();
  
    imageMode(CENTER);
    image(backImgs[0], backX, backY, backSize, backSize);
  }
  //last page to the game
  else if (currentPage === "yesPage") {
    imageMode(CORNER);
    image(yesImg, 0, 0, width, height);
    //the end message
    fill(40);
    noStroke();
    textFont(pixelFont);
    textAlign(CENTER);
    textSize(16);
    text("You chose Yes! Which means you are comfortable with going out. \n You were able to reacharge your energy by doing small activities in your room. \n Just remember you don't always have to say yes, sometimes \n you need that alone time and that's ok! \n Burnout and being socially drained is and will forever be a part of us", 250, 250, 250, 400);
  }
  
  else if (currentPage === "noPage") {
    imageMode(CORNER);
    image(noImg, 0, 0, width, height);
    //the end message
    fill(40);
    noStroke();
    textFont(pixelFont);
    textAlign(CENTER);
    textSize(16);
    text("You chose No \n which means that you still felt uncomfortable with going out. \n Which is not a bad thing at all! This just means you need more time for yourself before you feel ready to interact with someone else \n Remember burnout and being socially drained is acceptable! \n Don't let pressure force you into discomfort!", 250, 250, 250, 400);
  }
  notifPopup();
}



function drawStartPage() {
  imageMode(CORNER);
  image(startImg, 0, 0, width, height);

  wallclock.display();
  imageMode(CENTER);
  image(startbuttonImgs[0], 250, 400, 180, 170);
}

function mousePressed() {
  console.log(mouseX, mouseY, currentPage);

  if (currentPage === "start") {
    checkStart(mouseX, mouseY);
    return;
  } 
  else if (currentPage === "desk") {
    if (showDeskInfo) {
      if (clickArea(mouseX, mouseY, 250, 250, 330, 300)) {
        showDeskInfo = false;
      }
      return;
    }
  
    if (clickArea(mouseX, mouseY, infoX, infoY, infoSize, infoSize)) {
      showDeskInfo = true;
      return;
    }
  
    //checks where the user clicked on the desk
    if (checkDrawerClick(mouseX, mouseY)) {
      drawerSound.play(0,1,1,.4);
      return;
    }
    if (checkThreadOnDesk(mouseX, mouseY)) return;
    if (checkStarJarOnDesk(mouseX, mouseY)) return;
    if (checkSpeaker(mouseX, mouseY)) return;
    if (checkPhone(mouseX, mouseY)) return;
  }
  else if (currentPage === "sewing") {
    checkBackButton(mouseX, mouseY);
    sewing.handleMousePressed(mouseX, mouseY);
  }
  else if (currentPage === "stars") {
    checkBackButton(mouseX, mouseY);
    handleStarMousePressed(mouseX, mouseY);
  }
  else if (currentPage === "drawer") {
    checkBackButton(mouseX, mouseY);
    checkAlbumClick(mouseX, mouseY);
    return;
  }
  
  else if (currentPage === "album") {
    checkBackButton(mouseX, mouseY);
    checkLeftArrow(mouseX, mouseY);
    checkRightArrow(mouseX, mouseY);

    return;
  }
  else if (currentPage === "messages") {
    checkBackButton(mouseX, mouseY);
    checkYesorNo(mouseX, mouseY);
    return;
  }
}

//checks the hitbox area of where its clicked
function clickArea(mx, my, x, y, w, h) {
  return (
    mx > x - w / 2 && mx < x + w / 2 &&
    my > y - h / 2 && my < y + h / 2
  );
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
  
  function checkThreadOnDesk(mx, my) {
    if (clickArea(mx, my, threadOnDeskX, threadOnDeskY, threadOnDeskSize, threadOnDeskSize)) {
      currentPage = "sewing";
    }
  }

  function checkStart(mx, my) {
    if (clickArea(mx, my, 250, 400, 180, 170)) {
      currentPage = "desk";
    }
  }

  function checkBackButton(mx, my) {
    if (clickArea(mx, my, backX, backY, backSize, backSize)) {
      currentPage = "desk";
    }
  }

  function checkStarJarOnDesk(mx, my) {
    if (clickArea(mx, my, deskStarJarX, deskStarJarY, deskStarJarSize, deskStarJarSize)) {
      currentPage = "stars";
      starStep = 0;
      starX = 270;
      starY = 290;
    }
  }
  
  //for later, adds music
  function checkSpeaker(mx, my) {
    if (clickArea(mx, my, speakerX, speakerY-25, speakerSize, 70)) {
      console.log("speaker");
        if (musicOn) {
          stopSong();
          musicOn = false;
        } else {
            playSong();
            musicOn = true;
        }
    }
  }
  function checkDrawerClick(mx, my) {
    if (clickArea(mx, my, 365, 460, 200, 50)) {
      currentPage = "drawer";
      console.log("Switching to Drawer Page");
      return true; 
    }
    return false;
  }
  function checkAlbumClick(mx, my) {
    if (clickArea(mx, my, 100, 260, 130, 200)) {
      currentPage = "album";
      currentPhoto = 0;
      albumGoal = true;
    }
  }

  function checkLeftArrow(mx,my) {
    if (clickArea(mx, my, 15, 260, 25, 45)) {
      if (currentPhoto > 0) {
        currentPhoto--;
        flipSound.play();
      }
    }
  }

  function checkRightArrow(mx,my) {
    if (clickArea(mx, my, 485, 260, 25, 45)) {
      if (currentPhoto < albumPhotos.length - 1) {
        currentPhoto++;
        flipSound.play();
      }
    }
  }
  //makes sure phone_2 changes back to phone_1 (light to dark)
  function checkPhone(mx,my) {
      if (unreadMessage && clickArea(mx, my, 250, 260, 120, 120)) {
        currentPage = "messages";
        unreadMessage = false;
        return true;
      }
      return false;
    }

  function drawProgressBar() {
    imageMode(CENTER);
    image(progressImgs[progressLevel], 350, 60, 150, 110);
  }

  function updateProgress() {
    sewingGoal= sewing.stitches.length >= 15;
    starsGoal= starCount >= 5;
  
    progressLevel = 0;
  
    if (sewingGoal) progressLevel++;
    if (starsGoal) progressLevel++;
    if (albumGoal) progressLevel++;

    //phone lights up 
    if (progressLevel > recentProgress) {
      unreadMessage = true;
      messageN = progressLevel;
      recentProgress = progressLevel;

      notification = true;
      notifStart = millis();

      notifSound.stop();
      notifSound.play(0, 1, 1, 0, 0.5);
    }
  }
