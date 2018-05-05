function loadShapes() {
    //"Manager" Klasse für die Formen, mit Funktionen X,Y, und Partikelanzahl zurückzugeben

    this.heart_part = 52;
    this.heartX = [0, 1, 2, 4.5, 5, 5.5, 7, 7.5, 8, 8.5, 9, 10, 11, 11, 12, 11, 11, 10, 9, 7.5, 5.5, 4.5, 3.5, 2, 1, 0, 0, -1, -2, -4.5, -5, -5.5, -7, -7.5, -8, -8.5, -9, -10, -11, -11, -12, -11, -11, -10, -9, -7.5, -5.5, -4.5, -3.5, -2, -1, 0];
    this.heartY = [-10, -10.5, -11, -12, -12.5, -12, -12, -11.5, -11, -10.5, -10, -9, -8, -7, -5, -4, -2, 0, 2, 3, 4, 5, 7, 8, 9, 10, -10, -10.5, -11, -12, -12.5, -12, -12, -11.5, -11, -10.5, -10, -9, -8, -7, -5, -4, -2, 0, 2, 3, 4, 5, 7, 8, 9, 10];

    this.dick_part = 78;
    this.dickX = [0, 0, 0, 0, 0, 0.5, 1, 1.5, 2, 3, 4, 3, 2.5, 3, 3.5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 6, 7, 7.5, 8, 8.5, 8, 8, 6, 5, 4, 3, 2, 0, 0, 0, 0, 0, 0, -0.5, -1, -1.5, -2, -3, -4, -3, -2.5, -3, -3.5, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, -6, -7, -7.5, -8, -8.5, -8, -8, -6, -5, -4, -3, -2, -0,];
    this.dickY = [-10, -10.5, -11, -11.5, -12, -12, -11.8, -11.5, -11.2, -11, -10.8, -10.5, -10, -9.5, -9, -8, -8.5, -7, -6, -5.5, -5, -4, -3.5, -3, -2, 0, 0, -0.5, -0, 5, 0, 2, 3, 4, 4, 5, 5, 4, 2, -10, -10.5, -11, -11.5, -12, -12, -11.8, -11.5, -11.2, -11, -10.8, -10.5, -10, -9.5, -9, -8, -8.5, -7, -6, -5.5, -5, -4, -3.5, -3, -2, 0, 0, -0.5, -0, 5, 0, 2, 3, 4, 4, 5, 5, 4, 2];


    //Funktion zum zurückgeben des X-Arrays
    this.loadX = function (shape) {
        switch (shape) {
            case "heart":
                return this.heartX;
                break;

            case "dick":
                return this.dickX;
                break;
            default:
                break;
        }
    }

    //Funktion zum zurückgeben des Y-Arrays
    this.loadY = function (shape) {
        switch (shape) {
            case "heart":
                return this.heartY;
                break;
            case "dick":
                return this.dickY;
                break;
            default:
                break;
        }
    }

    //Funktion zum zurückgeben der Partikelanzahl.
    this.load_Part = function (shape) {
        switch (shape) {
            case "heart":
                return this.heart_part;
                break;
            case "dick":
                return this.dick_part;
                break;
            default:
                break;
        }
    }
}