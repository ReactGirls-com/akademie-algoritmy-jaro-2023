let bombs = [];

function placeBomb(x, y) {
  const bomb = { x, y, placedAt: millis() };
  bombs.push(bomb);
}

function drawBombs() {
  for (const bomb of bombs) {
    text("💣", bomb.x, bomb.y + 28);
  }
}

function detonateBombs() {
  const newBombs = [];
  for (const bomb of bombs) {
    if (bomb && bomb.placedAt < millis() - 3000) {
      explosionSound.play();
    } else {
      newBombs.push(bomb);
    }
  }
  bombs = newBombs;
}
