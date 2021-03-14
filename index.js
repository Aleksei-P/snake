const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const map = new Image();
map.src = "map.png";

const food = new Image();
food.src = "Food3.png";


let sizeSector = 17;

let score = 0;

function foodOnMapFunc(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min) * sizeSector;
}

let foodOnMap = {
    x: foodOnMapFunc(2, 36),
    y: foodOnMapFunc(2, 36)
}
/*
let foodOnMap = {
    x: Math.floor((Math.random() * 36)) * sizeSector,
    y: Math.floor((Math.random() * 36)) * sizeSector
}
*/

let snake = [];
snake[0] = {
    x: 20 * sizeSector,
    y: 20 * sizeSector
}

document.addEventListener("keydown", move);
let side;

function move(evt) {
    if(evt.keyCode == 37 && side != "right")
    side = "left";
    else if (evt.keyCode == 38 && side != "down")
    side = "up";
    else if (evt.keyCode == 39 && side != "left")
    side = "right";
    else if (evt.keyCode == 40 && side != "up")
    side = "down";
}

function eatTail (head, arr) {
    for(let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
        ctx.fillStyle = "DarkOrchid	";
        ctx.font = "50px Arial";
        ctx.fillText(score + " " + "уровень!", sizeSector * 3, sizeSector * 8);
        clearInterval(gameMap); }
    }
}

function drawGame() {
    ctx.drawImage(map, 0, 0); //функция прорисовки карты

    ctx.drawImage(food, foodOnMap.x, foodOnMap.y);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "Maroon" : "SaddleBrown";
        ctx.fillRect(snake[i].x, snake[i].y, sizeSector, sizeSector);
    }

    

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snakeX == foodOnMap.x && snakeY == foodOnMap.y) {
        score++;
        foodOnMap = {
            x: foodOnMapFunc(2, 36),
            y: foodOnMapFunc(2, 36)
        };
    }
        else {
            snake.pop();
        }
        
        function resetGame() {
            clearInterval(gameMap);
        }

        if (snakeX < sizeSector || snakeX > sizeSector * 38 
            || snakeY < sizeSector || snakeY > sizeSector * 38) {
                ctx.fillStyle = "DarkOrchid	";
                ctx.font = "50px Arial";
                ctx.fillText(score + " " + "Уровень", sizeSector * 3, sizeSector * 8);
                resetGame() };
       
        if (side == "left")
        snakeX -= sizeSector;
        if (side == "right")
        snakeX += sizeSector;
         if (side == "up")
        snakeY -= sizeSector;
         if (side == "down")
        snakeY += sizeSector;

        let head = {
            x: snakeX,
            y: snakeY
        }

        eatTail(head, snake);

        snake.unshift(head)
    }

let gameMap = setInterval(drawGame, 110); //интервал прорисовки