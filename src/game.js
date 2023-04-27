const cellSize = 32;
const rows = window.innerHeight / cellSize;
const cols = window.innerWidth / cellSize;
const grid = [];
// const grid = [
//   [0, 0, 0, 2, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 2, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 2, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
// ];

let explosionSound;

function setup() {
  createCanvas(cols * cellSize, rows * cellSize);

  for (let iy = 0; iy < rows; iy++) {
    const row = [];
    for (let ix = 0; ix < cols; ix++) {
      if (Math.random() > 0.9) {
        row.push(2);
      } else {
        row.push(0);
      }
    }
    grid.push(row);
  }

  // Load assets
  explosionSound = loadSound("sound/explosion.mp3");

  // p5 is going to call draw() repeatedly now
}

function draw() {
  background(220);

  // Draw grid
  fill(61, 84, 62);
  for (let iy = 0; iy < rows; iy++) {
    for (let ix = 0; ix < cols; ix++) {
      rect(ix * cellSize, iy * cellSize, cellSize);
      if (grid[iy][ix] === 2) {
        text("🌳", ix * cellSize, iy * cellSize + 28);
      }
    }
  }

  // Bombs
  detonateBombs();
  drawBombs();

  // Handle user input and draw player
  movePlayer();
  drawPlayer();
}
