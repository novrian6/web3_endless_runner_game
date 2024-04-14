//Developer: Nova Novriansyah
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x: 50,
    y: canvas.height - 50, // Set player initially on the floor
    width: 50,
    height: 50,
    jumping: false,
    jumpHeight: 40,
    gravity: 2,
    velocityY: 0
};

const obstacle = {
    x: canvas.width,
    y: canvas.height - 50,
    width: 20,
    height: 50,
    speed: 4
};

let score = 0;
let isGameOver = false;

function drawPlayer() {
    ctx.fillStyle = "#f00";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacle() {
    ctx.fillStyle = "#000";
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function drawScore() {
    ctx.fillStyle = "#000";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

function drawObstacleSpeed() {
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Obstacle Speed: " + obstacle.speed, canvas.width - 200, 30);
}

function drawGameOver() {
    ctx.fillStyle = "#000";
    ctx.font = "36px Arial";
    ctx.fillText("Game Over!", canvas.width / 2 - 100, canvas.height / 2);
}

function update() {
    if (!isGameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawPlayer();
        drawObstacle();
        drawScore();
        drawObstacleSpeed();

        if (player.jumping) {
            player.velocityY -= player.gravity;
            player.y -= player.velocityY;

            if (player.y >= canvas.height - player.height) {
                player.y = canvas.height - player.height;
                player.jumping = false;
                player.velocityY = 0;
            }
        }

        obstacle.x -= obstacle.speed;

        if (obstacle.x + obstacle.width < 0) {
            obstacle.x = canvas.width;
            score += obstacle.speed;
            obstacle.speed += 2;
        }

        if (checkCollision(player, obstacle)) {
            gameOver();
        }

        requestAnimationFrame(update);
    } else {
        drawGameOver();
    }
}

function checkCollision(player, obstacle) {
    if (player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y) {
        return true;
    }
    return false;
}

function gameOver() {
    isGameOver = true;
    obstacle.x = canvas.width;
    obstacle.speed = 4;
    score = 0;
    document.getElementById("gameOver").classList.remove("hidden");
}

function restartGame() {
    isGameOver = false;
    player.y = canvas.height - 50; // Reset player position to floor level
    obstacle.x = canvas.width;
    obstacle.speed = 4;
    score = 0;
    document.getElementById("gameOver").classList.add("hidden");
    update();
}

function jump() {
    if (!player.jumping) {
        player.jumping = true;
        player.velocityY = Math.min(player.jumpHeight, obstacle.speed * 10);
    }
}

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        jump();
    }
});

update();
