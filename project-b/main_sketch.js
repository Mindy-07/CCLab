let sewing;
let hoopImgs = [];
let deskImg;
let backImgs = [];
let speakerImgs = [];

let backX = 45;
let backY = 40;
let backSize = 60;

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

let wallclock;
let startImg;
let currentPage = "start";
let redThreadImgs = [];
let selectedRedThreadImgs = [];
let blueThreadImgs = []
let selectedBlueThreadImgs = []
let greenThreadImgs = []
let selectedGreenThreadImgs = []
let yellowThreadImgs = []
let selectedYellowThreadImgs = []
let resetImgs = []

let infoImgs = [];
let stickyNoteImgs = [];

let infoX = 455;
let infoY = 45;
let infoSize = 45;

let showDeskInfo = false;

let stickyX = 250;
let stickyY = 250;
let stickyW = 310;
let stickyH = 260;

let stickyCloseX = 365;
let stickyCloseY = 15;
let stickyCloseSize = 55;

let starJarImg;
let topStarJarImg;
let paperStarImgs = [];

let starStep = 0;
let starCount = 0;

let starX = 270;
let starY = 290;
let starSize = 150;

let jarX = 420;
let jarY = 80;
let jarSize = 95;

let draggingStar = false;

function preload() {
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

  for (let i = 1; i <= 8; i++) {
    paperStarImgs.push(loadImage("assets/images/ps" + i + ".jpg"));
}

}

function setup() {
  createCanvas(500, 500);
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
  eraseBg(backImgs, 10);
  eraseBg(paperStarImgs, 25);
  eraseBg([starJarImg], 25);
  eraseBg([topStarJarImg], 25);
  eraseBg(speakerImgs, 10);
  eraseBg(infoImgs, 10);
  eraseBg(stickyNoteImgs, 10);

  wallclock = new clock(405, 120, 43);
  sewing = new SewingActivity(290, 250, 190);
}

function draw() {
  if (currentPage === "start") {
    drawStartPage();
  } else if (currentPage === "sewing") {
    background(231, 201, 169);
    sewing.display();
    //back arrow 
    imageMode(CENTER);
    image(backImgs[0], backX, backY, backSize, backSize);
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

    if (showDeskInfo) {
      drawDeskInfoNote();
    }

  } else if (currentPage === "stars") {
    drawStarActivity();
    //back arrow 
    imageMode(CENTER);
    image(backImgs[0], backX, backY, backSize, backSize);
  }
}


function drawStartPage() {
  imageMode(CORNER);
  image(startImg, 0, 0, width, height);

  wallclock.display();
}

function mousePressed() {
  console.log(mouseX, mouseY, currentPage);

  if (currentPage === "start") {
    checkStart(mouseX, mouseY);
    return;
  } 
  else if (currentPage === "desk") {
    if (showDeskInfo) {
      if (
        mouseX > stickyCloseX - stickyCloseSize / 2 &&
        mouseX < stickyCloseX + stickyCloseSize / 2 &&
        mouseY > stickyCloseY - stickyCloseSize / 2 &&
        mouseY < stickyCloseY + stickyCloseSize / 2
      ) {
        showDeskInfo = false;
      }
      return;
    }
  
    if (
      mouseX > infoX - infoSize / 2 &&
      mouseX < infoX + infoSize / 2 &&
      mouseY > infoY - infoSize / 2 &&
      mouseY < infoY + infoSize / 2
    ) {
      showDeskInfo = true;
      return;
    }
  
    //checks where the user clicked on the desk
    checkThreadOnDesk(mouseX, mouseY);
    checkStarJarOnDesk(mouseX, mouseY);
    checkSpeaker(mouseX, mouseY);
    return;
  }
  else if (currentPage === "sewing") {
    checkBackButton(mouseX, mouseY);
    sewing.handleMousePressed(mouseX, mouseY);
  }
  else if (currentPage === "stars") {
    checkBackButton(mouseX, mouseY);
    handleStarMousePressed(mouseX, mouseY);
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
  
function checkThreadOnDesk(mx, my) {
    if (
      mx > threadOnDeskX - threadOnDeskSize / 2 &&
      mx < threadOnDeskX + threadOnDeskSize / 2 &&
      my > threadOnDeskY - threadOnDeskSize / 2 &&
      my < threadOnDeskY + threadOnDeskSize / 2
    ) {
      currentPage = "sewing";
    }
  }

function checkStart(mx, my) {
    let buttonX = 250;
    let buttonY = 391;
    let buttonW = 160;
    let buttonH = 80;
    //fill(255)
    //circle(buttonX,buttonY,50)
  
    if (
      mx > buttonX - buttonW / 2 &&
      mx < buttonX + buttonW / 2 &&
      my > buttonY - buttonH / 2 &&
      my < buttonY + buttonH / 2
    ) {
      currentPage = "desk";
    }
  }

  function checkBackButton(mx, my) {
    if (
      mx > backX - backSize / 2 &&
      mx < backX + backSize / 2 &&
      my > backY - backSize / 2 &&
      my < backY + backSize / 2
    ) {
      currentPage = "desk";
    }
  }

  function checkStarJarOnDesk(mx, my) {
    if (
      mx > deskStarJarX - deskStarJarSize / 2 &&
      mx < deskStarJarX + deskStarJarSize / 2 &&
      my > deskStarJarY - deskStarJarSize / 2 &&
      my < deskStarJarY + deskStarJarSize / 2
    ) {
      currentPage = "stars";
      starStep = 0;
      starX = 270;
      starY = 290;
    }
  }
  
  //for later, adds music
  function checkSpeaker(mx, my) {
    if (
      mx > speakerX - speakerSize / 2 &&
      mx < speakerX + speakerSize / 2 &&
      my > speakerY - speakerSize / 2 &&
      my < speakerY + speakerSize / 2
    ) {
      console.log("speaker clicked");
    }
  }