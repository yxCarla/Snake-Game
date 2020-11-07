var play = document.getElementById('play');

play.addEventListener('click', startGame);

function startGame() {
    main();
    gen_food();
}

const board_border = 'black';
const board_background = "white";
const snake_col = 'rgb(173, 192, 211)';
const snake_border = 'lightslategray';

let snake = [{x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200},];

let score = 0;
// food 
let food_x;
let food_y;
let dx = 10;
// Vertical velocity
let dy = 0;
// changing direction boolean for snake movement
let changing_direction = false;

const gameCanvas = document.getElementById("gameCanvas");
const gameCanvas_ctx = gameCanvas.getContext("2d");

document.addEventListener('keydown', change_direction);

// main function called repeatedly to keep the game running
function main() {
    if (has_game_ended()) return;

    changing_direction = false;

    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        main();
    }, 100)
}

    // draw a border around the canvas
function clearCanvas() {
      //  Select the colour to fill the drawing
    gameCanvas_ctx.fillStyle = board_background;
      //  Select the colour for the border of the canvas
    gameCanvas_ctx.strokeStyle = board_border;
      // Draw a "filled" rectangle to cover the entire canvas
    gameCanvas_ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
      // Draw a "border" around the entire canvas
    gameCanvas_ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

function drawSnake() {  
    snake.forEach(drawSnakePart);
}

function drawFood() {
    gameCanvas_ctx.fillStyle = 'rgb(238, 65, 65)';
    gameCanvas_ctx.strokeStyle = 'rgb(174, 4, 4)';
    gameCanvas_ctx.fillRect(food_x, food_y, 10, 10);
    gameCanvas_ctx.strokeRect(food_x, food_y, 10, 10);
}

function drawSnakePart(snakePart) {  
    gameCanvas_ctx.fillStyle = 'rgb(173, 192, 211)';  
    gameCanvas_ctx.strokeStyle = 'lightslategray';
    gameCanvas_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
    gameCanvas_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function moveSnake() {
    // Create the new Snake's head
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    // Add the new head to the beginning of snake body
    snake.unshift(head);
    const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
    if (has_eaten_food) {
      // Increase score
        score += 5;
      // Display score on screen
        document.getElementById('score').innerHTML = 'Score: ' + score;
      // Generate new food location
        gen_food();
    } else {
      // Remove the last part of snake body
        snake.pop();
    }
}

function random_food(min, max) {
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function gen_food() {
    
    // Generate a random number the food x-coordinate
    food_x = random_food(0, gameCanvas.width - 10);
    // Generate a random number for the food y-coordinate
    food_y = random_food(0, gameCanvas.height - 10);
    // if the new food location is where the snake currently is, generate a new food location
    snake.forEach(function has_snake_eaten_food(part) {
        const has_eaten = part.x == food_x && part.y == food_y;
        if (has_eaten) gen_food();
    });
}

function has_game_ended() {
    
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameCanvas.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameCanvas.height - 10;

    if (hitBottomWall) {
        play.style.display = 'block';
        alert('Your score was' + ' ' + score + '!' + ' ' + 'Refresh the screen to play again!');
    }

    if (hitLeftWall) {
        play.style.display = 'block';
        alert('Your score was' + ' ' + score + '!' + ' ' + 'Refresh the screen to play again!');
    }

    if (hitRightWall) {
        play.style.display = 'block';
        alert('Your score was' + ' ' + score + '!' + ' ' + 'Refresh the screen to play again!');
    }
    
    if (hitTopWall) {
        play.style.display = 'block';
        alert('Your score was' + ' ' + score + '!' + ' ' + 'Refresh the screen to play again!');
    }

    
    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
    
}

function change_direction(event) {  
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    if (changing_direction) return;
        changing_direction = true;

    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;  
    const goingLeft = dx === -10;

        if (keyPressed === LEFT_KEY && !goingRight) {    
            dx = -10;
            dy = 0;  
        }

        if (keyPressed === UP_KEY && !goingDown) {    
            dx = 0;
            dy = -10;
        }

        if (keyPressed === RIGHT_KEY && !goingLeft) {    
            dx = 10;
            dy = 0;
        }

        if (keyPressed === DOWN_KEY && !goingUp) {    
            dx = 0;
            dy = 10;
        }
}