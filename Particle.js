function Particle(x, y, pr, pg, pb, special) { //Konstruktor Funktion
    //X Position des Parent Obejektes (Rakete), Y des Parent, Parent Rot, Parent Grün ,Parent Blau, Special

    //Basic Physic------------------------------
    this.pos = createVector(x, y);  //Position
    this.vel = p5.Vector.random2D();//Velocity
    this.acc = createVector(0, 0);  //Acceleration
    //Basic Physic------------------------------

    this.particles = [];
    this.special = special;

    //Visibility = Alpha wert für Fadeout, wird im Update manipoliert
    this.visibility = 255;

    //Parent Farbe für den Großteil der Explosion annehmen, sonst random Farbe
    if (random(1) > 0.33) {
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

    if (this.special == "multi") {
        this.vel.mult(random(1, 2));
    }

    //Abfrage für Special Partikel, ob ihre "Kinder" alle fertig sind
    this.done = function () {
        if (this.visibility < 0 && this.particles.length === 0)
            return true;
        else
            return false;
    }

    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.update = function () {
        this.vel.mult(random(0.95, 0.99));
        this.visibility -= 4;

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        //Abfrage ob es ein eine Spezielle Rakete war - wenn ja, wird dieser Partikel selbst nochmal neue Partikel erzeugen
        if (this.special == "multi") {
            if (this.visibility > 50 && this.visibility < 55)
                this.explode();

            for (var i = this.particles.length - 1; i >= 0; i--) {
                this.particles[i].applyForce(Gravity);
                this.particles[i].update();
                if (this.particles[i].visibility < 0) {
                    this.particles.splice(i, 1);
                }
            }
        }
    }

    //Partikel bei der Explosion erzeugen
    this.explode = function () {
        var particle_number = random(30, 60);

        for (var i = 0; i < particle_number; i++) {
            var p = new MultiBoom(this.pos.x, this.pos.y, this.RED, this.GREEN, this.BLUE);
            this.particles.push(p);
        }
    }

    this.show = function () {
        stroke(this.RED, this.GREEN, this.BLUE, this.visibility);
        if (this.special == "multi") {
            strokeWeight(width / 200);
        }
        else {
            strokeWeight(width / 250);
        }
        point(this.pos.x, this.pos.y);


        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].show();
        }
    }
}