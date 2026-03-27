let myBall;

function setup() {
    createCanvas(400,400)
    myBall = new Ball(200,200);
    myBall2 = new Ball(200,300);
}

function draw() {
    background(220);
    myBall.move();
    myBall.display();

    myBall2.move();
    myBall2.display();
}

class Ball {
    constructor(){
        this.x = startX;
        this.y = startY;
        this.dia = 50;
    }
    move(){
        this.offset = sin(frameCount * 0.1) * 100;
        this.y += setInterval(framCount*0.01) * 100 + 200
    }
    display(){
        circle(this.x,this.y,this.dia)
    }
}