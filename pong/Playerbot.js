function Playerbot() {

    this.x = 20;
    this.y = height / 2;
    this.m = 10;
    this.ydir = 0;

    this.show = function () {
        fill(105);
        rectMode(CENTER);
        rect(this.x, this.y, 20, 150);
    }

    this.move = function () {

        this.y = ball.y;
    }
}