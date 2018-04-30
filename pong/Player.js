function Player(number) {

    if (number == 1)
        this.x = width - 20;
    else if (number == 2)
        this.x = 20;
    else {
        this.x = -50;
        alert("Player funktion bitte mit 1/2 als Argument aufrufen!");
    }

    this.y = height / 2;
    this.m = 10;
    this.ydir = 0;

    this.show = function () {
        fill(105);
        rectMode(CENTER);
        rect(this.x, this.y, 20, 150);
        if (!ball.started) {
            fill(0);
            text("Speed", width - (textWidth("Speed") + 55), player1.y - 15);
            text(sliderP1.value(), width - (textWidth(sliderP1.value()) + 90), player1.y - 75);
            sliderP1.position(width + 60, player1.y - 25);
            sliderP1.style('width', '150px');
            player1.m = sliderP1.value();

            text("Speed", 40, player2.y - 15);
            text(sliderP2.value(), 60, player2.y - 75);
            sliderP2.position(300, player2.y - 25);
            sliderP2.style('width', '150px');
            player2.m = sliderP2.value();
        }
        else {
            sliderP1.remove();
            sliderP2.remove();
        }
    }

    this.setDir = function (dir) {
        this.ydir = dir;
    }

    this.move = function () {
        this.y += this.ydir * this.m;
    }
}