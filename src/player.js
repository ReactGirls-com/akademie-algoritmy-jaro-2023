const player1 = {
  x: Math.floor(Math.random() * cols) * cellSize,
  y: Math.floor(Math.random() * rows) * cellSize,
  isMoving: false,
  isAlive: true,
};

function movePlayer() {
  let isMoving = false;
  const speed = Math.floor(deltaTime * 0.2);

  let deltaX = 0;
  let deltaY = 0;

  if (keyIsDown(RIGHT_ARROW)) {
    deltaX = 1;
    isMoving = true;
  } else if (keyIsDown(LEFT_ARROW)) {
    deltaX = -1;
    isMoving = true;
  }

  if (keyIsDown(UP_ARROW)) {
    deltaY = -1;
    isMoving = true;
  } else if (keyIsDown(DOWN_ARROW)) {
    deltaY = 1;
    isMoving = true;
  }

  // 32 == SPACE
  if (keyIsDown(32)) {
    if (!bombs.length || bombs[bombs.length - 1].placedAt < millis() - 1000) {
      placeBomb(player1.x, player1.y);
    }
  }

  const destination = positionToCellIdx({
    x: player1.x + deltaX,
    y: player1.y + deltaY,
  });
  console.log("dest:", destination);
  if (isCollidingWithObstacle(destination)) {
    return;
  }

  player1.isMoving = isMoving;
  player1.x += deltaX * speed;
  player1.y += deltaY * speed;

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
  textSize(cellSize);

  if (player1.isAlive) {
    text("🤡", player1.x, player1.y + damping + offsetY);
  } else {
    text("💀", player1.x, player1.y + damping + offsetY);
  }
}
