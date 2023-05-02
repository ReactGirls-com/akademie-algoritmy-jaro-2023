const cellSize = 50;
const offsetY = Math.floor(cellSize * 0.875); // Y offset for emojis
const offsetX = Math.floor(cellSize * -0.0093); // X offset for emojis
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
  frameRate(30);
  createCanvas(cols * cellSize, rows * cellSize);

  for (let iy = 0; iy < rows; iy++) {
    const row = [];
    for (let ix = 0; ix < cols; ix++) {
      if (Math.random() > 0.9) {
        row.push(2);
      } else if (Math.random() > 0.95) {
        row.push(3);
      } else {
        row.push(0);
      }
    }
    grid.push(row);
  }
  const player = positionToCellIdx(player1);
  grid[player.yi][player.xi] = 0;

  // Load assets
  explosionSound = loadSound("sound/explosion.mp3");

  // p5 is going to call draw() repeatedly now
}

function draw() {
  background(220);

  // Draw grid
  fill(61, 84, 62);
  textSize(cellSize);
  for (let iy = 0; iy < rows; iy++) {
    for (let ix = 0; ix < cols; ix++) {
      rect(ix * cellSize, iy * cellSize, cellSize);
      if (grid[iy][ix] === 2) {
        text("🌳", ix * cellSize, iy * cellSize + offsetY);
      } else if (grid[iy][ix] === 3) {
        text("🪨", ix * cellSize, iy * cellSize + offsetY);
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
