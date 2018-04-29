function Ball() {

    this.x = width / 2;
    this.y = height / 2;
    this.started = false;
    this.m = 10;
    this.movestartLR = random(0, 100);
    this.movestartUD = random(0, 100);
    this.start = true;
    this.out = false;

    this.dirX = 1;
    this.dirY = 1;

    this.show = function () {
        noStroke();
        fill(192);
        ellipseMode(CENTER);
        ellipse(this.x, this.y, 20, 20);
    }

    this.move = function () {
        if (this.start) {
            if (this.movestartLR < 50)
                this.dirX = -1;
            else
                this.dirX = 1;

            if (this.movestartUD < 50)
                this.dirY = -1;
            else
                this.dirY = 1;

            this.start = false;
        }

        if (this.y > height - 5 || this.y < 5)
            this.dirY = this.dirY * -1;

        if (this.x > player1.x - 10 && this.y < player1.y + 75 && this.y > player1.y - 75)
            this.dirX = this.dirX * -1;

        if (this.x < player2.x + 10 && this.y < player2.y + 75 && this.y > player2.y - 75)
            this.dirX = this.dirX * -1;

        this.x += this.dirX * this.m;
        this.y += this.dirY * this.m;
    }

    this.checkWin = function () {
        if (this.x > width - 5 || this.x < 5) {
            this.dirX = 0;
            this.dirY = 0;
            this.out = true;
            fill(0);
            textSize(50);
            if (this.x > width - 5)
                text("Player 2 won! Press spacebar to restart!", width / 2 - (textWidth("Player 2 won! Press spacebar to restart!") / 2), height / 2 - 50);
            if (this.x < 5)
                text("Player 1 won! Press spacebar to restart!", width / 2 - (textWidth("Player 1 won! Press spacebar to restart!") / 2), height / 2 - 50);
        }
    }
}