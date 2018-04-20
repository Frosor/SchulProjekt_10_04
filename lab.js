
$(function () {
    var playerX = 0;
    var playerY = 0;
    var playerPOS;
    var Enemys = [];
    var gewonnen = false;
    var verloren = false;
    var isAlive = true;
    
$(function erstellSpielfeld() {
    var player = '<div id="player"></div>';
    $("#spielfeld").prepend(player); 
    var Spielfeld;
    var BlockID;
    for(var i = 0; i < 100; i++) {
        BlockID = "block" + i;
        if(!Spielfeld) {
        Spielfeld = '<div class="grid-item" id="' + BlockID + '"></div>';
        }else
        Spielfeld += '<div class="grid-item" id="' + BlockID + '"></div>';
    }
  $("#spielfeld").prepend(Spielfeld); 

});
    $("#Start").click( function () {
        $("#Start").prop("disabled", true);
        
$(function randomLabyrinth() {
    for (var j = 0; j < 20; j++) {
    var randomB = Math.floor((Math.random() * 99)+1);
    var Block = "#block" + randomB;
    $(Block).css("background-color", "rgb(255, 255, 0)");
    }
    do{
    var ziel = "#block" + Math.floor((Math.random() * 99)+1);
    var zielFarbe = $(ziel).css('background-color');
    }while( zielFarbe == "rgb(255,255,0)") 
    
    $(ziel).css("background-color", "rgb(0, 255, 0)");
    
    var colorBlock1 = $('#block1').css('background-color');
    var colorBlock10 = $('#block10').css('background-color');
    if(colorBlock1 == colorBlock10) {
    if(Math.floor((Math.random() * 2)+1) % 2 == 0) {
        $('#block1').css("background-color", "grey");
    }else  
        $('#block10').css("background-color", "grey");         
    }

    });
    
    document.onkeydown = checkKey;

function checkKey(e) {
   if(gewonnen == false && verloren == false){
    if (e.keyCode == '38' && playerX > 0) {
        // up arrow
        $("#player").animate({top: '-=51px'});
        playerX--;  
    }
    else if (e.keyCode == '40' && playerX < 9) {
        // down arrow
        if(isAlive == true){
            $("#player").animate({top: '+=51px'});
            playerX++;
        };
       
    }
    else if (e.keyCode == '37' && playerY > 0) {
       // left arrow
       $("#player").animate({left: '-=51px'});
        playerY--;
        
    }
    else if (e.keyCode == '39' && playerY < 9) {
       // right arrow
       $("#player").animate({left: '+=51px'});
        playerY++;
    }
   }
   if(verloren == false){
    $(function checkTod() {
    var BlockID;
    var tot;
    var win;
    for(var i = 0; i < 100; i++) {
    BlockID = "#block" + i;
    tot = $(BlockID).css('background-color');
    if(tot == "rgb(255, 255, 0)") {
        Enemys.push(i);
    }
    if(tot == "rgb(0, 255, 0)"){
        win = i;
    }
    }
    for(var j in Enemys) {
        if(playerX != 0) {
    playerPOS = "" + playerX + playerY;
        }else
            playerPOS = playerY;

    if(playerPOS == Enemys[j]) {
       verloren = true;
        $( "button" ).remove( "#Start" );

    }
    if(playerPOS == win) {
        gewonnen = true;
        alert("gewonnen!");
        win++;
        $("#Start").prop("disabled", false);
    }
    }
if(verloren == true) {
    $("#buttonleiste").prepend('<button type="button " id="newtry" class="btn col-2 btn-dark float-right mr-5">Neuer Versuch!</button>');

}

    
    $("#newtry").one("click", function () { 
    $("#newtry").prop("disabled", true);
    var BlockID1;
    verloren = false;
    playerX = 0;
    playerY = 0;
    playerPOS = 0;
    $( "div" ).remove( "#player" );
    console.log("#block" + win);
    console.log(win);
    console.log(playerPOS)
    
    var player = '<div id="player"></div>';
    $("#spielfeld").append(player); 
    for(var j in Enemys) {
        var Grey = "#block" + Enemys[j];
        $(Grey).css("background-color", "grey");
        }  
        $("#block" + win).css("background-color", "grey"); 
        Enemys = [];
    });  

    
});
   }

}

    });
 
    
});