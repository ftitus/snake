// Wait for the DOM to load before starting the game
document.addEventListener("DOMContentLoaded", () => {
  // Get references to the game canvas and buttons
  const canvas = document.getElementById("gameCanvas");
  const startButton = document.getElementById("startButton");
  const resetButton = document.getElementById("resetButton");
  const ctx = canvas.getContext("2d");

  // Set up initial game variables
  let snake = [{ x: 10, y: 10 }]; // Snake starting position
  let direction = "right"; // Initial movement direction
  let food = {}; // Food position
  let score = 0; // Player score

  // Function to draw the snake and food on the canvas
  function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx.fillStyle = "green";
    snake.forEach(({ x, y }) => {
      ctx.fillRect(x * 20, y * 20, 20, 20);
    });

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

    // Draw the score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
  }

  // Function to update the game state
  function update() {
    // Move the snake
    const head = { ...snake[0] };
    switch (direction) {
      case "up":
        head.y--;
        break;
      case "down":
        head.y++;
        break;
      case "left":
        head.x--;
        break;
      case "right":
        head.x++;
        break;
    }
    snake.unshift(head);

    // Check if the snake ate the food
    if (head.x === food.x && head.y === food.y) {
      // Increase the score and generate new food
      score++;
      generateFood();
    } else {
      // Remove the tail segment if the snake didn't eat
      snake.pop();
    }

    // Check for game over conditions
    if (
      head.x < 0 ||
      head.x >= canvas.width / 20 ||
      head.y < 0 ||
      head.y >= canvas.height / 20 ||
      snake.some(
        (segment, index) =>
          index !== 0 && segment.x === head.x && segment.y === head.y
      )
    ) {
      gameOver();
    }
  }

  // Function to generate new food at a random position
  function generateFood() {
    food = {
      x: Math.floor(Math.random() * (canvas.width / 20)),
      y: Math.floor(Math.random() * (canvas.height / 20)),
    };
  }

  // Function to handle key presses and update the snake's direction
  function handleKeyPress(event) {
    switch (event.key) {
      case "ArrowUp":
        if (direction !== "down") {
          direction = "up";
        }
        break;
      case "ArrowDown":
        if (direction !== "up") {
          direction = "down";
        }
        break;
      case "ArrowLeft":
        if (direction !== "right") {
          direction = "left";
        }
        break;
      case "ArrowRight":
        if (direction !== "left") {
          direction = "right";
        }
        break;
    }
  }

  // Function to start the game
  function startGame() {
    // Reset game variables
    snake = [{ x: 10, y: 10 }];
    direction = "right";
    score = 0;
    generateFood();

    // Start the game loop
    gameLoop = setInterval(() => {
      update();
      draw();
    }, 100);
  }

  // Function to end the game and display a game over message
  function gameOver() {
    clearInterval(gameLoop);
    alert(`Game Over! Your score: ${score}`);
  }

  // Add event listeners for button clicks and key presses
  startButton.addEventListener("click", startGame);
  resetButton.addEventListener("click", gameOver);
  document.addEventListener("keydown", handleKeyPress);

  // Draw the initial game state
  draw();
});
