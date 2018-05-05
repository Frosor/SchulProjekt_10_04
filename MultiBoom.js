function MultiBoom(x, y, pr, pg, pb) { //Konstruktor Funktion
    //X Position des Parent Obejektes (Partikel), Y des Parent, Parent Rot, Parent Grün ,Parent Blau

    //Basic Physic------------------------------
    this.pos = createVector(x, y);  //Position
    this.vel = p5.Vector.random2D();//Velocity
    this.acc = createVector(0, 0);  //Acceleration
    //Basic Physic------------------------------

    //Visibility = Alpha wert für Fadeout, wird im Update manipoliert
    this.visibility = 255;

    //Parent Farbe für den Großteil der Explosion annehmen, sonst random Farbe
    if (random(1) > 0.50) {
        this.RED = pr;
        this.GREEN = pg;
        this.BLUE = pb;
        this.vel.mult(random(1, 10));
    }
    else {
        this.RED = floor(random(0, 255));
        this.GREEN = floor(random(0, 255));
        this.BLUE = floor(random(0, 255));
        this.vel.mult(random(1, 5));
    }

    this.vel.mult(random(1, 2));


    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.update = function () {
        this.vel.mult(random(0.95, 0.99));
        this.visibility -= 3;

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.show = function () {
        stroke(this.RED, this.GREEN, this.BLUE, this.visibility);
        strokeWeight(width / 250);
        point(this.pos.x, this.pos.y);
    }
}