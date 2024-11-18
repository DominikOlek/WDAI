//              Gettery

const canvas = document.getElementById("canva");
const popout = document.getElementById("popout");
const result = document.getElementById("wynik");
const best = document.getElementById("best");
const ctx = canva.getContext("2d");

//              Wczytanie plików
const heart = new Image();
heart.src = "images/full_heart.png";

const noheart = new Image();
noheart.src = "images/empty_heart.png";

const aim = new Image();
aim.src = "images/aim.png";


const zombie = new Image();
zombie.src = "images/walkingdead.png";

let audio = new Audio('images/sad-music.mp3');

//          Globalne zmienne i sta³e

const numColumns = 10;
const numRows = 1;
const mouseSize = 100;


var frameWidth;
var frameHeight;
var zombies;
var currentKey;
var score = 0;
var hearts;
var life;
var timeBetween;
var stepGenerate;
var hightscore = 0;
var mouseX;
var mouseY;



//          Cykl canvy

function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stepGenerate++;
    if (stepGenerate > timeBetween) {
        zombies.set(currentKey++, new Zombie());
        timeBetween = 100 + Math.random() * 500;
        stepGenerate = 0;
        zombies = sortDictByValue(zombies);
    }
    //console.log(zombies.size);
    zombies.forEach((o, k) => {
        if (o.isGone()) {
            zombies.delete(k);
            o = null;
            hearts[life - 1].gone();
            life -= 1;
        } else {
            o.draw();
        }
    });
    hearts.forEach((h) => { h.draw(); });
    writeScore();
    if (life == 0) {
        end();
        return;
    }
    drawAIM();
    requestAnimationFrame(step);
}

function writeScore() {
    ctx.font = '100px Arial'; // Czcionka i rozmiar
    ctx.fillStyle = 'white';
    ctx.fillText(score.toString().padStart(5, '0'),canvas.width-300,100);
}

//          Alfa i Omega

function end() {
    hightscore = Math.max(hightscore, score);
    best.textContent = hightscore;
    canvas.removeEventListener("click", shot);
    canvas.removeEventListener("mousemove", move);
    canvas.style.setProperty("cursor", "default");
    audio.play();
    result.textContent = score;
    popout.style.setProperty("display", "block");
}

function start() {
    audio.pause();
    audio.currentTime = 0;
    popout.style.setProperty("display","none");
    zombies = new Map();
    currentKey = 0;
    score = 0;

    hearts = [];
    life = 3;

    timeBetween = 0;
    stepGenerate = 1;

    let size = 100;
    let margin = 30;
    for (let i = 0; i < life; i++) {
        hearts.push(new Health(margin + ((size + margin) * i), margin, size));
    }

    canvas.addEventListener("click", shot);
    canvas.addEventListener("mousemove", move);
    requestAnimationFrame(step);
}

//          Check
zombie.onload = function () {
    frameWidth = zombie.width / numColumns;
    frameHeight = zombie.height / numRows;
};




//      Eventy

function drawAIM() {
    ctx.drawImage(aim, mouseX, mouseY, mouseSize, mouseSize);
}

function move(e) {
    mouseX = e.clientX - canvas.offsetLeft - mouseSize / 2;
    mouseY = e.clientY - canvas.offsetTop - mouseSize / 2;
}

function getMousePosition(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x, y];
}

function shot(e) {
    let tuple = [Number, Number];
    tuple = getMousePosition(e);
    let czy = true;
    for (let g of zombies) {
        if (g[1].colider(tuple[0], tuple[1])) {
            zombies.delete(g[0]);
            g[1] = null;
            czy = false;
            break;
        }
    }
    if (czy) score -= 5
    else score += 20;
}


//          Klasy
class Health {
    posX;
    posY;
    isGood = true;
    size;
    constructor(posX,posY,size) {
        this.posX = posX;
        this.posY = posY;
        this.size = size;
    }

    draw() {
        if (this.isGood) {
            ctx.drawImage(heart, this.posX, this.posY, this.size, this.size);
        } else {
            ctx.drawImage(noheart, this.posX, this.posY, this.size, this.size);
        }
    }

    gone() {
        this.isGood = false;
    }
}
class Zombie {
    currentFrame = 0;
    lengthofAnimation = 30;
    delayCnt = 0;
    posX;
    posY;
    sizeX;
    sizeY;
    column;
    row;
    constructor() {
        this.lengthofAnimation = 10 + (Math.random() * this.lengthofAnimation);
        this.posX = canvas.width+ (Math.random() * 10);
        this.posY = canvas.height-frameHeight- (Math.random() * 80);
        let prop = 0.5+Math.random();
        this.sizeX = prop*frameWidth ;
        this.sizeY = prop*frameHeight ;
    }

    draw() {
        this.delayCnt++;
        if (this.delayCnt > this.lengthofAnimation) {
            this.delayCnt = 0;
            this.currentFrame++;

            let maxFrame = numColumns * numRows - 1;
            if (this.currentFrame > maxFrame) {
                this.currentFrame = 0;
            }
            this.column = this.currentFrame % numColumns;
            this.row = Math.floor(this.currentFrame / numColumns);

            this.posX -= (this.lengthofAnimation/10);
        }
        this.posX -= this.lengthofAnimation / 60;
        ctx.drawImage(zombie, this.column * frameWidth, this.row * frameHeight, frameWidth, frameHeight, this.posX, this.posY, this.sizeX, this.sizeY);
    }

    isGone() {
        return this.posX <= -this.sizeX;
    }

    colider(x, y) {
        if (x > this.posX+(this.sizeX/4) && y > this.posY && x < this.posX + this.sizeX && y < this.posY + this.sizeY) {
            return true;
        }
    }
}

//          Uruchomienia i inne

start();

function sortDictByValue(dict) {
    return new Map([...dict.entries()].sort((a, b) => (a[1].posY + a[1].sizeY) - (b[1].posY + b[1].sizeY)));
}
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
