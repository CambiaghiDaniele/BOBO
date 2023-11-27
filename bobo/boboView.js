var canvas = document.getElementById('map');
var ctx = canvas.getContext('2d');

document.addEventListener("mousemove", getMousePosition);

const data = {
    "player" : {
        "movementToX" : window.innerWidth / 2,
        "movementToY" : window.innerHeight / 2,
        "size" : 25,
        "health" : 0,
        "type" : [
            {
                "offsetX" : 0,
                "angle" : 0,
                "width" : 20,
                "height" : 55
            }
        ]
    },
    "playerBullets" : [
        {
            "x" : 0,
            "y" : 0,
            "size" : 0,
        },
        {
            "x" : 0,
            "y" : 0,
            "size" : 0,
        }
    ],
    "enemies" : [
        {
            "x" : 0,
            "y" : 0,
            "size" : 0,
            "type" : 0,
            "health" : 0,
        },
        {
            "x" : 0,
            "y" : 0,
            "size" : 0,
            "type" : 0,
            "health" : 0,
        }
    ],
    "enemiesBullets" : [
        {
            "x" : 0,
            "y" : 0,
            "size" : 0,
        },
        {
            "x" : 0,
            "y" : 0,
            "size" : 0,
        }
    ]
};

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

//funzione che prende le coodinate del cursore nella finestra e le assegna all'oggetto mousePosition
function getMousePosition(event){
    mousePosition.mouseX = event.clientX;
    mousePosition.mouseY = event.clientY;
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