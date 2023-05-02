const player1 = {
  x: Math.floor(Math.random() * cols) * cellSize,
  y: Math.floor(Math.random() * rows) * cellSize,
  isMoving: false,
  isAlive: true,
};

/**
 * This function is called 60 times/second
 * It should move player based on user input
 * But only if there's no collision
 */
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

  const destinationLeftTop = positionToCellIdx({
    x: player1.x + deltaX * speed,
    y: player1.y + deltaY * speed,
  });
  const destinationRightTop = positionToCellIdx({
    x: player1.x + cellSize - 1 + deltaX * speed,
    y: player1.y + deltaY * speed,
  });
  const destinationRightBottom = positionToCellIdx({
    x: player1.x + cellSize - 1 + deltaX * speed,
    y: player1.y + cellSize - 1 + deltaY * speed,
  });
  const destinationLeftBottom = positionToCellIdx({
    x: player1.x + deltaX * speed,
    y: player1.y + cellSize - 1 + deltaY * speed,
  });

  if (
    isCollidingWithObstacle(destinationLeftTop) ||
    isCollidingWithObstacle(destinationRightTop) ||
    isCollidingWithObstacle(destinationRightBottom) ||
    isCollidingWithObstacle(destinationLeftBottom)
  ) {
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
