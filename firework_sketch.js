var cnv;
var rockets = [];
var Gravity;
var shapeloader;


function setup() {
    shapeloader = new loadShapes();
    //Fullscreen Canvas
    cnv = createCanvas(windowWidth, windowHeight);
    centerCanvas();

    Gravity = createVector(0, 0.1);

    //dicke der Objekte relativ zu der breite des Bildschirm machen
    strokeWeight(width / 180);
    background(0);


    if (height < 650 || width < 1200) {
        alert("Bitte eine größere Auflösung benutzen! Das Browerfester braucht eine minimal Höhe von 650px, und minimal Breite von 1000px!");
        location.reload(true);
    }
}

//Wird jeden Frame aufgerufen (60FPS)
function draw() {
    //Hintergrund mit ein wenig alpha für den Trail
    background(0, 25);

    //Immer eine Rakete erzeugen wenn der Randomwert kleiner als 0.05 ist (60FPS) ~4% wahrscheinlichkeit
    if (random(1) < 0.04) {
        //Neue Rakete in der Raketen Array hinzufügen
        rockets.push(new Rocket(random(width), height));
    }

    //Raketen Array Rückwärts durchgehen, da es sonst Probleme beim Splicen geben kann
    for (var i = rockets.length - 1; i >= 0; i--) {
        rockets[i].applyForce(Gravity);
        rockets[i].update();
        rockets[i].show();

        //Splicen wenn Rakete "fertig" ist, Splicen = Element aus dem Array entfernen
        if (rockets[i].done())
            rockets.splice(i, 1);
    }

}








//Canvas in der mitte
function centerCanvas() {
    var xCan = (windowWidth - width) / 2;
    var yCan = (windowHeight - height) / 2;
    cnv.position(xCan, yCan);
}
//Wenn die Größe des Festerns geändert wird
function windowResized() {
    centerCanvas();
    location.reload(true);
}