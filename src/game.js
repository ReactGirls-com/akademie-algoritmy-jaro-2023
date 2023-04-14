const cellSize = 32;
const rows = window.innerHeight / cellSize;
const cols = window.innerWidth / cellSize;

function setup() {
  createCanvas(cols * cellSize, rows * cellSize);
}

function draw() {
  background(220);
}
