const cellSize = 32;
const rows = window.innerHeight / cellSize;
const cols = window.innerWidth / cellSize;

let explosionSound;

function setup() {
  createCanvas(cols * cellSize, rows * cellSize);

  // Load assets
  explosionSound = loadSound("sound/explosion.mp3");
}

function draw() {
  background(220);

  // Draw grid
  fill(61, 84, 62);
  for (let iy = 0; iy < rows; iy++) {
    for (let ix = 0; ix < cols; ix++) {
      rect(ix * cellSize, iy * cellSize, cellSize);
    }
  }

  // Bombs
  detonateBombs();
  drawBombs();

  // Handle user input and draw player
  movePlayer();
  drawPlayer();
}
