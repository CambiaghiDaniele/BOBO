var canvas = document.getElementById('map');
var ctx = canvas.getContext('2d');

document.addEventListener("mousemove", getMousePosition);
document.addEventListener("keydown", getKeyPressed());
document.addEventListener("keyup", getKeyReleased());
document.addEventListener("mousedown", getMousePressed());
document.addEventListener("mouseup", getMouseReleased());

const data = {
    "player" : {
        "size" : 25,
        "health" : 0,
        "type" : [
            {
                "offsetX" : 0,
                "angle" : 0,
                "width" : 25,
                "height" : 60
            }
        ],
    },
    "playerBullets" : [
        {
            "posX" : 0,
            "posY" : 0,
            "size" : 0,
        },
        {
            "posX" : 0,
            "posY" : 0,
            "size" : 0,
        }
    ],
    "enemies" : [
        {
            "posX" : 0,
            "posY" : 0,
            "size" : 25,
            "health" : 0,
            "type" : [
                {
                    "offsetX" : 0,
                    "angle" : 0,
                    "width" : 25,
                    "height" : 60
                }
            ],
        },
        {
            "posX" : 0,
            "posY" : 0,
            "size" : 0,
            "health" : 0,
            "type" : [
                {
                    "offsetX" : 0,
                    "angle" : 0,
                    "width" : 1,
                    "height" : 5
                }
            ],
        }
    ],
    "enemiesBullets" : [
        {
            "posX" : 0,
            "posY" : 0,
            "size" : 0,
        },
        {
            "posX" : 0,
            "posY" : 0,
            "size" : 0,
        }
    ],
    "destructible" : [
        {
            "posX" : 0,
            "posY" : 0,
            "health" : 0,
            "type" : {
                "shape" : "shape",
                "size" : 0,
            }
        },
        {
            "posX" : 0,
            "posY" : 0,
            "health" : 0,
            "type" : {
                "shape" : "shape",
                "size" : 0,
            }
        }
    ]
};

//player variables
let barrelRotation;
let wKeyPressed = false;
let aKeyPressed = false;
let sKeyPressed = false;
let dKeyPressed = false;
let shooting = false;

//others
var mousePosition = {mouseX : undefined, mouseY : undefined};

//player function
function drawPlayer(){
    drawPlayerBarrel();
    drawPlayerBody();
}

function drawPlayerBody(){
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, data.player.size, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}
function drawPlayerBarrel() {
    data.player.type.forEach(barrel => {
        ctx.save();
        ctx.fillStyle = "grey";
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(barrel.angle + getMouseAngle() - (Math.PI / 2));
        ctx.fillRect(-barrel.width / 2 + barrel.offsetX, 0, barrel.width, barrel.height);
        ctx.restore(); 
    });
}
function getMouseAngle(){
    return Math.atan2(mousePosition.mouseY - canvas.height / 2, mousePosition.mouseX - canvas.width / 2);
}

//enemies functions

//destructible functions
/*
function drawDestructible(){

}
*/

//funzione che prende le coodinate del cursore nella finestra e le assegna all'oggetto mousePosition
function getMousePosition(event){
    mousePosition.mouseX = event.clientX;
    mousePosition.mouseY = event.clientY;
}

function getKeyPressed(event){
    if(event == "KeyW"){
        wKeyPressed = true;
    }else if(event == "KeyA"){
        aKeyPressed = true;
    }else if(event == "KeyS"){
        sKeyPressed = true;
    }else if(event == "KeyD"){
        dKeyPressed = true;
    }
}
function getKeyReleased(event){
    if(event == "KeyW"){
        wKeyPressed = false;
    }else if(event == "KeyA"){
        aKeyPressed = false;
    }else if(event == "KeyS"){
        sKeyPressed = false;
    }else if(event == "KeyD"){
        dKeyPressed = false;
    }
}
function getMousePressed(){
    shooting = true;
}
function getMouseReleased(){
    shooting = false;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function adaptCanvasToWindow(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
function draw(){
    adaptCanvasToWindow();
    clearCanvas();
    drawPlayer();
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);