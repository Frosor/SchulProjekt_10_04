$(function () {
    var Spielfeld;
    var randEnemy, lastRand;
    var Enemys = [];
    var block, timer, newi;
    var rechterRand = 90, linkerRand = 1, obererRand = 7, untererRand = 0 ,playerPOS = 86, playerPOSx = 0,playerPOSy = 5; points = 0;
    //umstellen um spawn interval zu verändern
    var timeout = 500;
    //umstellen um Standard Gegner farbe zu ändern
    var enemyColor = "rgb(0, 0, 255)";
    var kleinesSpielfeld = [1, 9, 10, 18, 19, 27, 28, 36, 37, 45, 46, 54, 55, 63, 64, 72, 73, 81, 82, 90];
    var way, farbe, player, newpos;
    var blockright, blockleft, farbeleft, farberight;
    var counter = 0, opcounter;
    var ROB = false, stage2 = false, stage3 = false, blink = false, verloren = false;

    //holt sich id von farb blöcken
    $(".col").click(function () {
        color = $(this).attr('id');
        personalEnemyColor();
    });

    //ändert je nach id, Farbe von Gegnern
    function personalEnemyColor() {
        switch (color) {
            case ("g"):
                enemyColor = "rgb(255, 255, 0)";
                break;
            case ("b"):
                enemyColor = "rgb(0, 0, 255)";
                break;
            case ("gr"):
                enemyColor = "rgb(0, 255, 0)";
                break;
            case ("p"):
                enemyColor = "rgb(255, 51, 153)";
                break;
            case ("s"):
                enemyColor = "rgb(0, 0, 0)";
                break;
            case ("rb"):
                enemyColor = "rgb(9, 63, 109)";
                break;
            case ("rhb"):
                enemyColor = "rgb(1, 125, 195)";
                break;
            case ("fe"):
                enemyColor = "rgb(227, 0, 27)";
                break;
        }
    }

    //erstellt leeres Spielfeld beim laden von Seite
    $(function erstellSpielfeld() {
        for (var i = 1; i < 91; i++) {
            BlockID = "block" + i;
            if (!Spielfeld) {
                Spielfeld = '<div class="grid-item" id="' + BlockID + '"></div>';
            } else
                Spielfeld += '<div class="grid-item" id="' + BlockID + '"></div>';
        }
        $("#spielfeld").prepend(Spielfeld);
    });

    $("#startb").click(function () {

        //setzt den Spieler in die Mitte von Spielfeld
        $("#block86").css("background-color", "rgb(255,0,0)");
        //verhindert das Startknopf mehrfach gedrückt wird
        $(this).prop('disabled', true);
        //versteckt farbauswahl um Glitch zu verhindern
        $(".col").hide(); $("#hcol").hide();

        //Bewegungspattern nach links und rechts || verhindert das bewegen in Gegner hinein || 
        document.onkeydown = function checkKey(e) {
            getPlayer();
            blockright = player + 1;
            farberight = $("#block" + blockright).css('background-color');
            blockleft = player - 1;
            farbeleft = $("#block" + blockleft).css('background-color');
            if (verloren == false) {
                if (e.keyCode == '37' && playerPOSy > linkerRand && farbeleft != enemyColor) {
                    // links Pfeil
                    $("#block" + player).css("background-color", "grey");
                    newpos = --player;
                    $("#block" + newpos).css("background-color", "rgb(255,0,0)");
                    playerPOSy--;
                    playerPOS--;
                }
                else if (e.keyCode == '39' && playerPOSy < rechterRand && farberight != enemyColor) {
                    // rechts Pfeil
                    $("#block" + player).css("background-color", "grey");
                    newpos = ++player;
                    $("#block" + newpos).css("background-color", "rgb(255,0,0)");
                    playerPOSy++;
                    playerPOS++;
                }
                else if (e.keyCode == '38' && playerPOSx < obererRand) {
                    // oben Pfeil
                    $("#block" + player).css("background-color", "grey");
                    newpos = player-9;
                    $("#block" + newpos).css("background-color", "rgb(255,0,0)");
                    playerPOS = playerPOS - 9;
                    playerPOSx++;
                }
                else if (e.keyCode == '40' && playerPOSx > untererRand) {
                    // unten Pfeil
                    $("#block" + player).css("background-color", "grey");
                    newpos = player+9;
                    $("#block" + newpos).css("background-color", "rgb(255,0,0)");
                   playerPOS = playerPOS + 9;
                    playerPOSx--;
                }
            }
        }

        //holt sich alle im Spielfeld aktuell befindenen Gegner
        function getHindernisse() {
            Enemys = [];
            for (var i = 1; i < 91; i++) {
                block = $("#block" + i).css('background-color');
                if (block == enemyColor) Enemys.push(i);
            }
        }

        //holt sich aktuelle Position von Spieler
        function getPlayer() {
            for (var i = 0; i < 91; i++) {
                farbe = $("#block" + i).css('background-color');
                if (farbe == "rgb(255, 0, 0)") { player = i; }
            }
        }

        //spawnt Gegner mit 1 Block breite
        function spawnEnemy() {
            if (ROB == false) {
                do {
                    randEnemy = Math.floor(Math.random() * (9 - 1 + 1) + 1);
                    if (stage3 == true) randEnemy = Math.floor(Math.random() * (8 - 2 + 1) + 2);
                } while (randEnemy == lastRand);
                lastRand = randEnemy;
                $("#block" + randEnemy).css("background-color", enemyColor);
            }
            else ROB = false;
        }

        //spawnt Gegner mit 2 Blöcken breite
        function spawnBetterEnemy() {
            if (ROB == false) {
                betterRandEnemy1 = Math.floor(Math.random() * (9 - 1 + 1) + 1);
                if (stage3 == true) betterRandEnemy1 = Math.floor(Math.random() * (7 - 3 + 1) + 3);
                betterRandEnemy2 = betterRandEnemy1 + 1;

                $("#block" + betterRandEnemy1).css("background-color", enemyColor);
                $("#block" + betterRandEnemy2).css("background-color", enemyColor);
            }
            else ROB = false;
        }

        //spawnt Gegner mit breite von 3 Blöcken
        function spawnEvenBetterEnemy() {
            if (ROB == false) {
                betterRandEnemy1 = Math.floor(Math.random() * (9 - 1 + 1) + 1);
                if (stage3 == true) betterRandEnemy1 = Math.floor(Math.random() * (7 - 3 + 1) + 3);
                betterRandEnemy2 = betterRandEnemy1 + 1;
                betterRandEnemy3 = betterRandEnemy1 - 1;

                $("#block" + betterRandEnemy1).css("background-color", enemyColor);
                $("#block" + betterRandEnemy2).css("background-color", enemyColor);
                $("#block" + betterRandEnemy3).css("background-color", enemyColor);
            } else ROB = false;
        }

        //spawnt ROB || Row of Blocks 
        function spawnROB() {
            if (stage3 == true) {
                range1 = 2;
                range2 = 9;
            }
            else {
                range1 = 1;
                range2 = 10;
            }
            for (var i = range1; i < range2; i++) {
                $("#block" + i).css("background-color", enemyColor);
                var ii = i + 9;
                $("#block" + ii).css("background-color", "grey");
            }
            way = Math.floor(Math.random() * (9 - 1 + 1) + 1);
            if (stage3 == true) way = Math.floor(Math.random() * (8 - 2 + 1) + 2);
            $("#block" + way).css("background-color", "grey");
            ROB = true;
        }

        //aktiviert Stufe 2
        setInterval(function stageTwo() {
            stage2 = true;
        }, 30000);

        //aktiviert Stufe 3
        setInterval(function stageThree() {
            stage3 = true;
            opcounter = 1;
        }, 20000);

        (function () {
            timer = function main() {

                //überprüft ob Spieler noch am Leben ist und spawnt verschiedene Gegner
                if (verloren == false && stage2 == false) {
                    randy = Math.floor(Math.random() * (21 - 1 + 1) + 1);
                    if (randy % 3 == 0) spawnBetterEnemy();
                    else if (randy % 7 == 0) spawnEvenBetterEnemy();
                    else spawnEnemy();
                }

                //aktiviert zweite Stage || Es wird nur noch ROB gespawnt
                if (stage2 == true && verloren == false) {
                    counter++;
                    if (counter % 5 == 0) spawnROB();
                    if (counter % 34 == 0) stage2 = false;
                }

console.log(playerPOS);

                //aktiviert dritte Stage || Spielfeld wird verkleinert
                if (stage3 == true && verloren == false) {
                    resizeGame();
                    normalSize();
                }
                animateEnemy();

                //erhöht Punkte
                points += 10;
                $("#scoreboard").html("<h3>Score: " + points + "<h3>");

                //beschleunigt die spawnrate 
                if (timeout >= 100) {
                    timeout = timeout * .999;
                }
                setTimeout(timer, timeout);
            };
            timer();
        })();

        //setzt Spielfeld auf normale Größe zurück
        function normalSize() {
            if (opcounter % 21 == 0) {
                stage3 = false;
                blink = false;
                linkerRand = 82;
                rechterRand = 90;
                for (var t = 0; t < kleinesSpielfeld.length; t++) {
                    $("#block" + kleinesSpielfeld[t]).css("background-color", "grey");
                }
            }
        }

        //verkleinert das Spielfeld
        function resizeGame() {
            opcounter++;
            for (var i = 0; i < kleinesSpielfeld.length; i++) {
                if (opcounter % 2 == 0 && blink == false) $("#block" + kleinesSpielfeld[i]).css("opacity", 1.0);
                else if (opcounter % 11 == 0) {
                    blink = true;
                    $("#block" + kleinesSpielfeld[i]).css("background-color", "black");
                    if (playerPOS == 82) {
                        $("#block" + playerPOS).css("background-color", "black");
                        ++playerPOS;
                        $("#block" + playerPOS).css("background-color", "rgb(255,0,0)");
                    }
                    if (playerPOS == 90) {
                        $("#block" + playerPOS).css("background-color", "black");
                        --playerPOS;
                        $("#block" + playerPOS).css("background-color", "rgb(255,0,0)");
                    }
                    linkerRand = 83;
                    rechterRand = 89;
                }
                else if (opcounter % 2 != 0 && blink == false) $("#block" + kleinesSpielfeld[i]).css("opacity", 0.5);
            }
        }

        //animiert alle Gegner 
        function animateEnemy() {
            getHindernisse();
            for (var i = 0; i < Enemys.length; i++) {
                newi = Enemys[i] + 9;
                $("#block" + Enemys[i]).css("background-color", "grey");
                $("#block" + newi).css("background-color", enemyColor);
            }
        }

        //leert Spielfeld 
        function emptyGame() {
            for (var i = 1; i < 91; i++) {
                $("#block" + i).css("background-color", "grey");
            }
        }

        //prüft ob Spieler tot ist
        setInterval(function checkDeath() {
            getHindernisse();
            for (var i = 0; i < Enemys.length; i++) {
                if (playerPOS == Enemys[i] && verloren == false) verloren = true;
            }
        }, 1);

    });

    //wenn Spieler tot ist lade Seite neu
    setInterval(function newgame() {
        if (verloren == true) {
            location.reload();
        }
    }, 100);
});