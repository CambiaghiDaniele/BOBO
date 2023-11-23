var canvas = document.getElementById('map');
var ctx = canvas.getContext('2d');

document.addEventListener("mousemove", getMousePosition);

const data = ...;

//player variables
var barrelRotation;

//player bullets variables
//bullets structure: [bullet1:{bulletX, bulletY, bulletSize}, ...]
var bullets = [];

//enemy variables
//enemies structure: [enemy1:{enemyX, enemyY, enemySize, enemyType, enemyHealth}, ...]
var enemies = [];

//enemy bullets variables
//bullets structure: [enemyBullet1:{enemyBulletX, enemyBulletY, enemyBulletSize}, ...]
var enemyBullets = [];

//destructable variables
//destructables structure: [desctructable1:{desctrutableX, desctrutableY, desctrutableType, desctrutableHealth}]
var destructables = [];

//others
var mousePosition = {mouseX : undefined, mouseY : undefined};

//player function
function drawPlayer(){
    drawPlayerCannon();
    drawPlayerBody();
}

function drawPlayerBody(){
    ctx.beginPath();
    ctx.arc(data.player.playerX, data.player.playerY, data.player.playerSize, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}
function drawPlayerBarrel(){

}
function rotateBarrelToCursor(){

}

//funzione che restituisce l'angolo in radianti della posizione del mouse rispetto al centro della finestera
function getMouseAngle(){
    //formula per trovare il coefficiente di una retta avente due punti (con il primo punto che è la posizione del mouse e il secondo che è il centro dello schermo)
    let lineCoefficent = (mousePosition.mouseY - (window.innerHeight / 2)) / (mousePosition.mouseX - (window.innerWidth / 2));
    //se il risultato è infinito la la retta è verticale e in base al segno dell'infinito restituisce un angolo di 90 o 270 gradi
    if(lineCoefficent === Infinity){
        return (Math.PI * 3) / 2;
    }else if(lineCoefficent === -Infinity){
        return Math.PI / 2;
    }
    //se il coefficiente è un numero finito allora la funzione Math.atan lo converte in radianti
    return Math.atan(lineCoefficent);
}

//funzione che prende le coodinate del cursore nella finestra e le assegna all'oggetto mousePosition
function getMousePosition(event){
    mousePosition.mouseX = event.clientX;
    mousePosition.mouseY = event.clientY;
}
function draw(){
    
}

setInterval(draw(), 10);
