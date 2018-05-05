function ShapeBoom(x, y, pr, pg, pb, velx, vely) { //Konstruktor Funktion
    //X Position des Parent Obejektes (Partikel), Y des Parent, Parent Rot, Parent Grün ,Parent Blau

    //Basic Physic------------------------------
    this.pos = createVector(x, y);  //Position
    this.vel = createVector(velx, vely);
    this.acc = createVector(0, 0);  //Acceleration
    //Basic Physic------------------------------

    //Visibility = Alpha wert für Fadeout, wird im Update manipoliert
    this.visibility = 255;

    //Parent Farbe für den Großteil der Explosion annehmen, sonst random Farbe
    if (random(1) > 0.25) {
        this.RED = pr;
        this.GREEN = pg;
        this.BLUE = pb;
    }
    else {
        this.RED = floor(random(0, 255));
        this.GREEN = floor(random(0, 255));
        this.BLUE = floor(random(0, 255));
    }


    this.done = function () {
        if (this.visibility < 0)
            return true;
        else
            return false;
    }

    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.update = function () {
        this.vel.mult(random(0.95, 0.99));
        this.visibility -= 2;

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