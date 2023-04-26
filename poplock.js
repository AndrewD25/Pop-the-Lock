/* Andrew Deal - PM Period */
"use strict";

// Set up lives
let lives = 5;
const lifeContainer = document.getElementById("lifeContainer");
for (let i = 0; i < 5; i++) {
    let life = document.createElement('img');
    life.setAttribute("class", "lifeHeart");
    life.setAttribute("id", "life" + (i));
    life.setAttribute("src", "heart.png");
    lifeContainer.appendChild(life);
};

// Object and Variable Creation 
let speed = 1;
let score = 0;
let scoreHead = document.getElementById("score");

const border = { // Unfilled rectangle
    height: 50,
    width: 280
};

const key = { //Unfilled square
    x: 10,
    height: 50,
    width: 50
};

const lock = { //Filled circle
    x: 35,
    r: 25 //radius
};

// Functions
function drawGame() {
    //Find canvas in HTML doc
    const c = document.getElementById("myCanvas");
    const ctx = c.getContext("2d");

    //Clear canvas
    ctx.clearRect(0, 0, c.width, c.height);

    //Draw Rects
    ctx.beginPath();
    ctx.strokeStyle = "rgb(0, 0, 50)";
    const borderHeight = c.height/2 - border.height/2;
    ctx.rect(c.width/2 - border.width/2, borderHeight, border.width, border.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "yellow";
    ctx.arc(lock.x, borderHeight + lock.r, lock.r, 0, Math.PI * 2, false);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.rect(key.x, borderHeight, key.width, key.height);
    ctx.stroke();
}

function sleep(ms) {
    return new Promise((resolve=>setTimeout(resolve,ms)));
};

function newLock() {
    lock.x = Math.floor(Math.random() * (265 - 35 + 1)) + 35;
};

function checkTouching() {
    if ((lock.x - lock.r < key.x && key.x < lock.x + lock.r) || (lock.x + lock.r > key.x + key.width && key.x + key.width > lock.x - lock.r)) { //Square is touching circle
        score++;
        speed += score/100;
        console.log(speed);
        newLock();
    } else { //Square is not touching circle
        lives--;
        document.getElementById("life" + lives).setAttribute("src", "brokenHeart.png") //break life indexed heart
    };
};

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        checkTouching();
    };
});

// Run Game
newLock()
lives = 5;
let moveRight = true; //used to control key motion
setInterval(() => {
    drawGame();
    if (key.x + key.width >= 290) {
        moveRight = false;
    } else if (key.x <= 10) {
        moveRight = true;
    }
    if (moveRight && key.x + key.width + speed <= 290) {
        key.x += speed;
    } else if (moveRight) {
        key.x = 290 - key.width;
    } else if (!moveRight && key.x - speed >- 10) {
        key.x -= speed;
    } else {
        key.x = 10;
    }
    scoreHead.textContent = "Score: " + score;
    if (lives === 0) {
        location.reload();
    }
}, 1);
