function makeEnemy(x, y) {
  return {
    x,
    y,
    lastMove: millis(),
    isAlive: true,
  };
}

function drawEnemies() {
  for (const enemy of enemies) {
    text("🥶", enemy.x + offsetX, enemy.y + offsetY);
  }
}
