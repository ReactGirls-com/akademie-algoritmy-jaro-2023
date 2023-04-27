const player1 = {
  x: Math.floor(Math.random() * cols) * cellSize,
  y: Math.floor(Math.random() * rows) * cellSize,
  isMoving: false,
  isAlive: true,
};

function movePlayer() {
  let isMoving = false;
  if (keyIsDown(RIGHT_ARROW)) {
    player1.x++;
    isMoving = true;
  } else if (keyIsDown(LEFT_ARROW)) {
    player1.x--;
    isMoving = true;
  }

  if (keyIsDown(UP_ARROW)) {
    player1.y--;
    isMoving = true;
  } else if (keyIsDown(DOWN_ARROW)) {
    player1.y++;
    isMoving = true;
  }

  // 32 == SPACE
  if (keyIsDown(32)) {
    if (!bombs.length || bombs[bombs.length - 1].placedAt < millis() - 1000) {
      placeBomb(player1.x, player1.y);
    }
  }

  player1.isMoving = isMoving;

  if (
    player1.x < 0 ||
    player1.x > width ||
    player1.y < 0 ||
    player1.y > height
  ) {
    player1.isAlive = false;
  }
}

function drawPlayer() {
  let damping = 0;
  if (player1.isMoving && player1.isAlive) {
    damping = Math.abs(Math.sin(millis() / 50)) * 3; // 0 - 3
  }
  textSize(32);

  if (player1.isAlive) {
    text("🥸", player1.x, player1.y + damping + 28);
  } else {
    text("💀", player1.x, player1.y + damping + 28);
  }
}
