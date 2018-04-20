
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
    var nextRound = false;
    var timeout;

    //erstellt leeres Spielfeld mit Spieler wenn Seite geladen wird
    $("#newtry").hide();
    var BlockID;
    var Spielfeld;
    $(function erstellSpielfeld() {
        var player = '<div id="player"></div>';
        $("#spielfeld").prepend(player);

        for (var i = 0; i < 100; i++) {
            BlockID = "block" + i;
            if (!Spielfeld) {
                Spielfeld = '<div class="grid-item" id="' + BlockID + '"></div>';
            } else
                Spielfeld += '<div class="grid-item" id="' + BlockID + '"></div>';
        }
        $("#spielfeld").prepend(Spielfeld);
    });





    $("#Start").click(function () {

        $(this).prop("disabled", true);

        //erstellt zufällig generiertes Labyrinth nachdem auf Bereit gedrückt wird

        $(function randomLabyrinth() {
            for (var j = 0; j < 20; j++) {
                var randomB = Math.floor((Math.random() * 99) + 1);
                var Block = "#block" + randomB;
                $(Block).css("background-color", "rgb(255, 255, 0)");
            }
            do {
                var ziel = "#block" + Math.floor((Math.random() * 99) + 1);
                var zielFarbe = $(ziel).css('background-color');
            } while (zielFarbe == "rgb(255,255,0)")

            $(ziel).css("background-color", "rgb(0, 255, 0)");

            var colorBlock1 = $('#block1').css('background-color');
            var colorBlock10 = $('#block10').css('background-color');
            if (colorBlock1 == colorBlock10) {
                if (Math.floor((Math.random() * 2) + 1) % 2 == 0) {
                    $('#block1').css("background-color", "grey");
                } else
                    $('#block10').css("background-color", "grey");
            }

        });





        //Bewegungs und Animier Muster, wird erst nach 10 sek. freigegeben

        timeout = setTimeout(function warteSpieler() {

            setInterval(function checkKey(e) {
                document.onkeydown = checkKey;

                if (gewonnen == false && verloren == false && checkKey) {
                    if (e.keyCode == '38' && playerX > 0) {
                        // up arrow
                        $("#player").animate({ top: '-=51px' }, 0);
                        playerX--;
                    }
                    else if (e.keyCode == '40' && playerX < 9) {
                        // down arrow
                        $("#player").animate({ top: '+=51px' }, 0);
                        playerX++;

                    }
                    else if (e.keyCode == '37' && playerY > 0) {
                        // left arrow
                        $("#player").animate({ left: '-=51px' }, 0);
                        playerY--;

                    }
                    else if (e.keyCode == '39' && playerY < 9) {
                        // right arrow
                        $("#player").animate({ left: '+=51px' }, 0);
                        playerY++;
                    }
                }



            }, 10);

            //kontrolliert ob Spieler gewonnen oder verloren hat

            setInterval(function checkwin() {
                if (verloren == false || gewonnen == false) {


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
                    for (var j in Enemys) {
                        if (playerX != 0) {
                            playerPOS = "" + playerX + playerY;
                        } else
                            playerPOS = playerY;
                        if (playerPOS == Enemys[j] && verloren == false) {
                            verloren = true;
                            alert("verloren");
                        }
                        if (playerPOS == win && gewonnen == false) {
                            gewonnen = true;
                            alert("gewonnen");
                        }
                    }
                }

                //Wenn Spieler gewonnen oder verloren hat, wird Start wieder freigegeben und Spielfeld zurückgesetzt
                if (verloren == true || gewonnen == true) {
                    clearTimeout(timeout);
                    $("#Start").html('Neuer Versuch');
                    $("#Start").prop("disabled", false);
                    gewonnen = false;
                    verloren = false;
                    playerX = 0;
                    playerY = 0;
                    playerPOS = 0;
                    for (var j in Enemys) {
                        var Grey = "#block" + Enemys[j];
                        $(Grey).css("background-color", "grey");
                    }
                    $("#block" + win).css("background-color", "grey");

                    Enemys = [];
                    $("#player").css({ top: 1, left: 0, position: 'relative' });
                }
                console.clear();
            }, 100);

            setTimeout(function clearGame() {
                for (var i = 0; i < 100; i++) {
                    BlockID = "#block" + i;
                    $(BlockID).css("background-color", "grey");
                }
            }, 100);
        }, 10000);

    });

});