var cnv;
var ball
var player1;
var player2;
var sliderP1;
var sliderP2;

function setup() {
    cnv = createCanvas(windowWidth - 100, windowHeight - 100);
    centerCanvas();

    ball = new Ball();
    player1 = new Player(1);
    //player2 = new Player(2);
    player2 = new Playerbot();

    // sliderP1 = createSlider(1, 20, 10, 1);
    // sliderP2 = createSlider(1, 20, 10, 1);
}

function draw() {
    background(255, 255, 255);
    ball.show();
    ball.checkWin();
    player1.show();
    player2.show();
    player1.move();
    player2.move();

    if (ball.started)
        ball.move();
    if (!ball.started) {
        fill(0);
        textSize(50);
        text("Press spacebar to start!", width / 2 - (textWidth("Press spacebar to start!") / 2), height / 2 - 50);
        text("Player 1", width - (textWidth("Player 1") + 25), player1.y + 70);
        text("Player 2", 30, player2.y + 70);
    }
}

function keyReleased() {
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW)
        player1.setDir(0);
    if (keyCode === 83 || keyCode === 87)
        player2.setDir(0);
}

function keyPressed() {
    if (keyCode === UP_ARROW)
        player1.setDir(-1);
    else if (keyCode === DOWN_ARROW)
        player1.setDir(1);
    else if (keyCode === 87)
        player2.setDir(-1);
    else if (keyCode === 83)
        player2.setDir(1);
    else if (keyCode === 32) {
        ball.started = true;
        if (ball.out)
            location.reload();
    }
}


function centerCanvas() {
    var xCan = (windowWidth - width) / 2;
    var yCan = (windowHeight - height) / 2;
    cnv.position(xCan, yCan);
}
function windowResized() {
    centerCanvas();
    location.reload(true);
}