$(function () {
    var Spielfeld;
    var randEnemy, lastRand;
    var Enemys = [];
    var block;
    var timer;
    var newi;
    var rechterRand = 90, linkerRand = 82;
    var playerPOS = 82;
    var verloren = false;
    var timeout = 500;
    var enemyColor = "rgb(0, 0, 255)";
    var points = 0;
    var scores = [];
    var kleinesSpielfeld = [1, 9, 10, 18, 19, 27, 28, 36, 37, 45, 46, 54, 55, 63, 64, 72, 73, 81, 82, 90];
    var way;
    var farbe;
    var player;
    var newpos, Spielfeld1;
    var blockright, blockleft, farbeleft, farberight;
    var counter = 0;
    var ROB = false, stage2 = false, stage3 = false;
    $(".col").click(function () {
        color = $(this).attr('id');
        personalEnemyColor();
    });

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
        }
    }

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
        $("#block82").css("background-color", "rgb(255,0,0)");
        $(this).prop('disabled', true);
        $(".col").hide();
        $("#hcol").hide();
        document.onkeydown = function checkKey(e) {
            getPlayer();
            blockright = player + 1;
            farberight = $("#block" + blockright).css('background-color');
            blockleft = player - 1;
            farbeleft = $("#block" + blockleft).css('background-color');
            if (verloren == false) {
                if (e.keyCode == '37' && playerPOS > linkerRand && farbeleft != enemyColor) {
                    // links Pfeil
                    $("#block" + player).css("background-color", "grey");
                    newpos = --player;
                    $("#block" + newpos).css("background-color", "rgb(255,0,0)");
                    playerPOS--;
                }
                else if (e.keyCode == '39' && playerPOS < rechterRand && farberight != enemyColor) {
                    // rechts Pfeil
                    $("#block" + player).css("background-color", "grey");
                    newpos = ++player;
                    $("#block" + newpos).css("background-color", "rgb(255,0,0)");
                    playerPOS++;
                }
            }
        }

        function getHindernisse() {
            Enemys = [];
            for (var i = 1; i < 91; i++) {
                block = $("#block" + i).css('background-color');
                if (block == enemyColor) Enemys.push(i);
            }
        }

        function getPlayer() {
            for (var i = 82; i < 91; i++) {
                farbe = $("#block" + i).css('background-color');
                if (farbe == "rgb(255, 0, 0)") { player = i; }
            }
        }

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

        setInterval(function stageTwo() {
            stage2 = true;
        }, 30000);

        setInterval(function stageThree() {
            getHindernisse();
            for (var i = 0; i < kleinesSpielfeld.length; i++) $("#block" + kleinesSpielfeld[i]).css("background-color", "black");
            stage3 = true;
            linkerRand = 83;
            rechterRand = 89;
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

        }, 50000);

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


        (function () {
            timer = function spawn() {

                if (verloren == false && stage2 == false) {

                    randy = Math.floor(Math.random() * (21 - 1 + 1) + 1);
                    if (randy % 3 == 0) spawnBetterEnemy();
                    else if (randy % 7 == 0) spawnEvenBetterEnemy();
                    else if (randy % 21 == 0 || randy % 20 == 0) spawnROB();
                    else spawnEnemy();
                    if (timeout >= 100) {
                        timeout = timeout * .999;
                    }
                    points += 10;
                    $("#scoreboard").html("<h3>Score: " + points + "<h3>");

                }
                if (stage2 == true && verloren == false) {
                    counter++;
                    if (counter % 5 == 0) spawnROB();
                    if (counter % 41 == 0) stage2 = false;
                }
                if (stage3 == true && verloren == false) {
                    counter++;
                    if (counter % 41 == 0) {
                        stage3 = false;
                        linkerRand = 82;
                        rechterRand = 90;
                        for (var t = 0; t < kleinesSpielfeld.length; t++) {
                            $("#block" + kleinesSpielfeld[t]).css("background-color", "grey");
                        }
                    }
                }
                if (verloren == true) timeout = 500;
                animateEnemy();
                setTimeout(timer, timeout);
            };
            timer();
        })();


        function animateEnemy() {
            getHindernisse();
            for (var i = 0; i < Enemys.length; i++) {
                newi = Enemys[i] + 9;
                $("#block" + Enemys[i]).css("background-color", "grey");
                $("#block" + newi).css("background-color", enemyColor);
            }
        }

        function emptyGame() {
            for (var i = 1; i < 91; i++) {
                $("#block" + i).css("background-color", "grey");
            }
        }

        setInterval(function checkDeath() {
            getHindernisse();
            for (var i = 0; i < Enemys.length; i++) {
                if (playerPOS == Enemys[i] && verloren == false) {

                    verloren = true;
                    emptyGame();
                    $("#player").remove();
                }
            }
        }, 1);

    });
    setInterval(function newgame() {
        if (verloren == true) {
            location.reload();
        }
    }, 100);
});