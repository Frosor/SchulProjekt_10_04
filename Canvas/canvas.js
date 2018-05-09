
$(document).ready(function(){
var c = document.getElementById("canvas01");
var score = document.getElementById("score");
var ctx = c.getContext("2d");
var scr = score.getContext("2d");
var playerY = c.height/2;
var playerX = 40;
var pos = 1650;
var pipes = [];
var lowerPipeHeight = [];
var upperPipesHeight = [];
var death = false;
var upperPipe;
var playerYNew;
var score = 0;
var lücke = 150;
var pipeWidth = 50;
var playerWidth = 50;
var jumpHeight = 65
var fallspeed = 0.95;
var maxHöhePipes = 700;
var minHöhePipes = 100;

function main() {      
    if(death == false) {
        if(playerY >= 950) death=true; 
    checkCollision();
    ctx.clearRect(0, 0, c.width, c.height);
    scr.clearRect(0, 0, c.width, c.height);
    drawPipes();
    movePipes();
    drawPlayer();
    scr.font = "30px Arial";
    scr.strokeText(score,10,35);
    }
   else ctx.clearRect(0, 0, c.width, c.height);
}

function drawPipes(){
    for(var i = 0; i < pipes.length; i++) { 

        ctx.beginPath();
        ctx.rect(pipes[i], 0, pipeWidth, upperPipesHeight[i]);
        ctx.rect(pipes[i], c.height - lowerPipeHeight[i], pipeWidth, lowerPipeHeight[i]);      
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.stroke();
    }  
}

function movePipes(){
    for(var x = 0; x < pipes.length; x++){
        pipes[x] = pipes[x] -2; 
        if(pipes[x] <= 0) {
            score++;
            upperPipesHeight.splice(0,1);
            lowerPipeHeight.splice(0,1);
            pipes.splice(0,1)      
    }
}
}

function generatePipes() {
    var rand = Math.floor(Math.random() * (maxHöhePipes - minHöhePipes) ) + minHöhePipes;
    lowerPipeHeight.push(rand);
    upperPipe = c.height - rand - lücke;
    upperPipesHeight.push(upperPipe);
    pipes.push(pos);
    pos = pos + 300;
 }

 function drawPlayer(){
    ctx.beginPath();
    ctx.rect(playerX, playerY, playerWidth, playerWidth);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();
   }

   document.onkeydown = function checkKey(e) {
        if(e.keyCode == '32' && playerY >= 50 ) playerY += -jumpHeight;
    }  

setInterval(function(){
    playerY += fallspeed;   
}, 1);

function checkCollision() {
    var playerXNew = playerX + (playerWidth*2);
    playerYNew = c.height - playerY - playerWidth;
    for(var i = 0; i < pipes.length; i++) {
        if(pipes[i] <= playerXNew && pipes[i] + pipeWidth <= playerXNew && playerYNew <= lowerPipeHeight[i] || pipes[i] <= playerXNew && pipes[i] + pipeWidth <= playerXNew && playerY<= upperPipesHeight[i]) death = true;        
        }
    }

setInterval(main, 10);
setInterval(generatePipes, 1000);
});