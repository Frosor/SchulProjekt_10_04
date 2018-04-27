
$(function () {

    var BlockID;
    var tot;
    var win;
    var gewonnen = false;
    var verloren = false;
    var Enemys = [];
    var playerX = 0;
    var playerY = 0;
    var playerPOS;
    var hindernisse = 40;
    var randomB;
    var ziel;
    var zielFarbe;
    var Spielfeld;
    var ZielID;
    var Zeit = 10000;;
    $("#10_Sekunde").prop("disabled", true);
    $("#10_Sekunde").css("background-color", "black");
    $("#10_Sekunde").css("color", "white");
    $("#gewonnen").hide();
    $("#verloren").hide();


    //erstellt leeres Spielfeld mit Spieler wenn Seite geladen wird
    $(function erstellSpielfeld() {
        $("#spielfeld").prepend('<div id="player"></div>');

        for (var i = 0; i < 100; i++) {
            BlockID = "block" + i;
            if (!Spielfeld) {
                Spielfeld = '<div class="grid-item" id="' + BlockID + '"></div>';
            } else
                Spielfeld += '<div class="grid-item" id="' + BlockID + '"></div>';
        }
        $("#spielfeld").prepend(Spielfeld);
    });

    $("#3_Sekunde").click(function () {
        Zeit = 3000;
        $(this).prop("disabled", true);
        $("#10_Sekunde").prop("disabled", false);
        $("#5_Sekunde").prop("disabled", false);
        $(this).css("background-color", "black");
        $(this).css("color", "white");
        $("#10_Sekunde").css("background-color", "transparent");
        $("#5_Sekunde").css("background-color", "transparent");
        $("#10_Sekunde").css("color", "black");
        $("#5_Sekunde").css("color", "black");
    });
    $("#5_Sekunde").click(function () {
        Zeit = 5000;
        $(this).prop("disabled", true);
        $("#10_Sekunde").prop("disabled", false);
        $("#3_Sekunde").prop("disabled", false);
        $(this).css("background-color", "black");
        $(this).css("color", "white");
        $("#10_Sekunde").css("background-color", "transparent");
        $("#3_Sekunde").css("background-color", "transparent");
        $("#10_Sekunde").css("color", "black");
        $("#3_Sekunde").css("color", "black");
    });
    $("#10_Sekunde").click(function () {
        Zeit = 10000;
        $(this).prop("disabled", true);
        $("#3_Sekunde").prop("disabled", false);
        $("#5_Sekunde").prop("disabled", false);
        $(this).css("background-color", "black");
        $(this).css("color", "white");
        $("#3_Sekunde").css("background-color", "transparent");
        $("#5_Sekunde").css("background-color", "transparent");
        $("#3_Sekunde").css("color", "black");
        $("#5_Sekunde").css("color", "black");
    });




    $("#Start").click(function () {

        $(this).prop("disabled", true);
        $("#3_Sekunde").prop("disabled", true);
        $("#5_Sekunde").prop("disabled", true);
        $("#10_Sekunde").prop("disabled", true);

        //erstellt zufällig generiertes Labyrinth nachdem auf Bereit gedrückt wird

        $(function randomLabyrinth() {
            for (var j = 0; j < hindernisse; j++) {
                randomB = Math.floor((Math.random() * 99) + 1);
                Block = "#block" + randomB;
                $(Block).css("background-color", "rgb(255, 255, 0)");
            }
            do {
                ZielID = Math.floor(Math.random() * (99 - 40 + 1) + 40);
                ziel = "#block" + ZielID;
                zielFarbe = $(ziel).css('background-color');
            } while (zielFarbe == "rgb(255,255,0)");

            $(ziel).css("background-color", "rgb(0, 255, 0)");

            //verhindert dass Spieler unmittelbar eingesperrt wird

        });

        $(function betterLab() {
            for (var k = 1; k < 40; k++) {

                var zahl = k + 9;
                var zahl1 = k + (9 * k);
                var zahl2 = k + 10;
                var zahl3 = k + 19;

                var farbe1 = $("#block" + k).css('background-color');
                var farbe2 = $("#block" + zahl).css('background-color');
                var farbe3 = $("#block" + zahl1).css('background-color');
                var farbe4 = $("#block" + zahl2).css('background-color');
                var farbe5 = $("#block" + zahl3).css('background-color');

                if (farbe1 == farbe4 && farbe4 == farbe5 && farbe5 == farbe3) {
                    var r = Math.floor((Math.random() * 4) + 1);
                    switch (r) {
                        case 1:
                            $("#block" + k).css("background-color", "grey");
                            break;
                        case 2:
                            $("#block" + zahl2).css("background-color", "grey");
                            break;
                        case 3:
                            $("#block" + zahl1).css("background-color", "grey");
                            break;
                        case 4:
                            $("#block" + zahl3).css("background-color", "grey");
                            break;
                    }

                }
                if (farbe1 == farbe2 && farbe2 == farbe3) {
                    var r = Math.floor((Math.random() * 3) + 1);
                    switch (r) {
                        case 1:
                            $("#block" + k).css("background-color", "grey");
                            break;
                        case 2:
                            $("#block" + zahl).css("background-color", "grey");
                            break;
                        case 3:
                            $("#block" + zahl1).css("background-color", "grey");
                            break;
                    }

                }
                if (farbe1 == farbe2) {
                    var r = Math.floor((Math.random() * 2) + 1);
                    switch (r) {
                        case 1:
                            $("#block" + k).css("background-color", "grey");
                            break;
                        case 2:
                            $("#block" + zahl).css("background-color", "grey");
                            break;
                    }
                }
            }

            //verhindert dass Ziel unmittelbar eingesperrt wird

            var zielFarbe0 = ZielID - 10;
            var zielFarbe1 = ZielID + 10;
            var zielFarbe2 = ZielID + 1;
            var zielFarbe3 = ZielID - 1;

            var zielFarbeB0 = "#block" + zielFarbe0;
            var zielFarbeB1 = "#block" + zielFarbe1;
            var zielFarbeB2 = "#block" + zielFarbe2;
            var zielFarbeB3 = "#block" + zielFarbe3;

            zielFarbe0 = $("#block" + zielFarbe0).css('background-color');
            zielFarbe1 = $("#block" + zielFarbe1).css('background-color');
            zielFarbe2 = $("#block" + zielFarbe2).css('background-color');
            zielFarbe3 = $("#block" + zielFarbe3).css('background-color');
            if (zielFarbe0 == zielFarbe3 || zielFarbe0 == zielFarbe2 || zielFarbe1 == zielFarbe3 || zielFarbe1 == zielFarbe2 || zielFarbe2 == zielFarbe3) {
                var r1 = Math.floor((Math.random() * 4) + 1);
                switch (r1) {
                    case 1:
                        $(zielFarbeB0).css("background-color", "grey");
                        break;
                    case 2:
                        $(zielFarbeB1).css("background-color", "grey");
                        break;
                    case 3:
                        $(zielFarbeB2).css("background-color", "grey");
                        break;
                    case 4:
                        $(zielFarbeB3).css("background-color", "grey");
                        break;
                }
            }
            if (zielFarbe0 == zielFarbe1 && zielFarbe1 == zielFarbe2) {
                var r1 = Math.floor((Math.random() * 3) + 1);
                switch (r1) {
                    case 1:
                        $(zielFarbeB0).css("background-color", "grey");
                        break;
                    case 2:
                        $(zielFarbeB1).css("background-color", "grey");
                        break;
                    case 3:
                        $(zielFarbeB2).css("background-color", "grey");
                        break;
                }

            }
            if (zielFarbe0 == zielFarbe1 && zielFarbe1 == zielFarbe2 && zielFarbe2 == zielFarbe3) {
                var r1 = Math.floor((Math.random() * 4) + 1);
                switch (r1) {
                    case 1:
                        $(zielFarbeB0).css("background-color", "grey");
                        break;
                    case 2:
                        $(zielFarbeB1).css("background-color", "grey");
                        break;
                    case 3:
                        $(zielFarbeB2).css("background-color", "grey");
                        break;
                    case 4:
                        $(zielFarbeB3).css("background-color", "grey");
                        break;
                }

            }

        });

        //Bewegungs und Animier Muster, wird erst nach 10 sek. freigegeben

        setTimeout(function warteSpieler() {

            setInterval(function checkKey(e) {

                document.onkeydown = checkKey;

                if (gewonnen == false && verloren == false) {
                    if (e.keyCode == '38' && playerX > 0) {
                        // hoch Pfeil
                        $("#player").animate({ top: '-=51px' }, 0);
                        playerX--;
                    }
                    else if (e.keyCode == '40' && playerX < 9) {
                        // runter Pfeil
                        $("#player").animate({ top: '+=51px' }, 0);
                        playerX++;

                    }
                    else if (e.keyCode == '37' && playerY > 0) {
                        // links Pfeil
                        $("#player").animate({ left: '-=51px' }, 0);
                        playerY--;

                    }
                    else if (e.keyCode == '39' && playerY < 9) {
                        // rechts Pfeil
                        $("#player").animate({ left: '+=51px' }, 0);
                        playerY++;
                    }
                }

            }, 10);



            $(function getHindernisse() {
                for (var i = 0; i < 100; i++) {
                    BlockID = "#block" + i;
                    tot = $(BlockID).css('background-color');
                    if (tot == "rgb(255, 255, 0)") {
                        Enemys.push(i);
                    }
                    if (tot == "rgb(0, 255, 0)") {
                        win = i;
                    }
                }
            });

            //kontrolliert ob Spieler gewonnen oder verloren hat

            setInterval(function checkwin() {
                if (verloren == false || gewonnen == false) {
                    for (var j in Enemys) {
                        if (playerX != 0) {
                            playerPOS = "" + playerX + playerY;
                        } else
                            playerPOS = playerY;
                        if (playerPOS == Enemys[j] && verloren == false) {
                            verloren = true;
                        }
                        if (playerPOS == win && gewonnen == false) {
                            gewonnen = true;
                        }
                    }
                }
                if (gewonnen == true) {
                    $("#gewonnen").show();
                } if (verloren == true) {
                    $("#verloren").show();
                }
                console.clear();
                //Wenn Spieler gewonnen oder verloren hat, wird Start wieder freigegeben und Spielfeld zurückgesetzt
            }, 100);

            setTimeout(function clearGame() {
                for (var i = 0; i < 100; i++) {
                    BlockID = "#block" + i;
                    $(BlockID).css("background-color", "grey");
                }
            }, 100);
        }, Zeit);

    });

    //lädt Seite neu wenn alert geschlossen wird




    $("#gewonnenButton").click(function () { location.reload(); });
    $("#verlorenButton").click(function () { location.reload(); });



});