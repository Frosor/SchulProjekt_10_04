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
    }

    this.setDir = function (dir) {
        this.ydir = dir;
    }

    this.move = function () {
        this.y += this.ydir * this.m;
    }
}