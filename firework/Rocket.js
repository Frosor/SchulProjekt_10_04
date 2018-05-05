function Rocket(x, y) { //Konsturktor Funktion 
    //Basic Physic------------------------------
    this.pos = createVector(x, y);                              //Position
    this.vel = createVector(random(-2.5, 2.5), random(-13, -7));//Velocity // -13, -7 gute werte für eine 1920*1080 Monitor
    this.acc = createVector(0, 0);                              //Acceleration
    //Basic Physic------------------------------
    this.RED = floor(random(0, 255));
    this.GREEN = floor(random(0, 255));
    this.BLUE = floor(random(0, 255));

    this.particles = [];
    this.special = false;
    this.shape = false;

    this.exploded = false;

    //Entscheiden was diese Rakete "trägt" - Spezial Expolionen // oder ob sie normal ist
    if (random(1) < 0.04) {
        //Entscheiden welcher Typ von Spezialrakete es ist
        if (random(1) < 0.66) {
            this.special = "multi";
        }
        else {
            this.special = "shape";
            if (random(1) < 0.66) {
                this.shape = "heart";
            }
            else {
                this.shape = "dick";
            }
        }
    }

    //Überprüfung ob die Rakete "fertig" ist - Ob sie explodiert ist, und ihre explosion fertig ist
    this.done = function () {
        if (this.exploded && this.particles.length === 0)
            return true;
        else
            return false;
    }

    //Force auf das Objekt geben
    this.applyForce = function (force) {
        if (!this.exploded)
            this.acc.add(force);
    }

    //Position / und andere Atribute des Objektes updaten
    this.update = function () {
        if (!this.exploded) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            //Acceleration nach jedem Update wieder auf 0 setzen, damit diese sich nicht addieren
            this.acc.mult(0);

            if (this.vel.y >= 0) {
                this.exploded = true;
                this.explode();
            }
        }

        //Die einzelnen Parikel Updaten / Löschen
        for (var i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].applyForce(Gravity);
            this.particles[i].update();
            if (this.particles[i].done()) {
                this.particles.splice(i, 1);
            }
        }
    }

    //Partikel bei der Explosion erzeugen
    this.explode = function () {
        //Schaunen ob die Rakete Speziell ist, dann gegebenenfalls, andere "Köpfe" erschaffen.
        if (this.special == "multi") {
            var particle_number = 5;
        }
        //Laden der einzelnen Form Elemente (X,Y,Partikelanzahl)
        else if (this.special == "shape") {
            var particle_number = shapeloader.load_Part(this.shape);
            //velx / vely, sind Vector arrays für die x&y Werte der Formen
            var velx = shapeloader.loadX(this.shape);
            var vely = shapeloader.loadY(this.shape);
        }
        else {
            var particle_number = random(10, 40);
        }

        //erzeugen von Objekten, je nach dem ob eine Form oder nicht wird geschaut
        for (var i = 0; i < particle_number; i++) {
            if (this.special == "shape")
                var p = new ShapeBoom(this.pos.x, this.pos.y, this.RED, this.GREEN, this.BLUE, velx[i], vely[i]);
            else
                var p = new Particle(this.pos.x, this.pos.y, this.RED, this.GREEN, this.BLUE, this.special);

            this.particles.push(p);
        }
    }




    //Objekt anzeigen
    this.show = function () {
        if (!this.exploded) {
            stroke(this.RED, this.GREEN, this.BLUE);
            point(this.pos.x, this.pos.y);
        }

        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].show();
        }
    }
}