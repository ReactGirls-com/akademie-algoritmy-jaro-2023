let bombs = [];
let explosions = [];

function placeBomb(x, y) {
  const bomb = { x, y, placedAt: millis() };
  bombs.push(bomb);
}

function drawBombs() {
  for (const bomb of bombs) {
    text("💣", bomb.x, bomb.y + 28);
  }
  drawExplosions();
  cleanupExplosions();
}

function detonateBombs() {
  const allBombs = bombs;
  const newBombs = [];
  for (const bomb of allBombs) {
    if (bomb.placedAt < millis() - 3000) {
      explosionSound.play();
      addExplosion(bomb.x, bomb.y);
      // todo: add more explosions around the bomb
    } else {
      newBombs.push(bomb);
    }
  }
  bombs = newBombs;
}

function addExplosion(x, y) {
  const explosion = {
    x,
    y,
    placedAt: millis(),
  };
  explosions.push(explosion);
}

function drawExplosions() {
  for (const explosion of explosions) {
    text("💥", explosion.x, explosion.y + 28);
  }
}

function cleanupExplosions() {
  const newExplosions = [];
  for (const ex of explosions) {
    if (ex.placedAt < millis() - 1000) {
      // should remove
    } else {
      // keep it in there
      newExplosions.push(ex);
    }
  }
  explosions = newExplosions;
}

// const pole = [0,1,2,3,4,5,6,7,8,9];

// for (let i = 0; i < 10; i++) {
//   const item = pole[i];
//   console.log(item)
// }

// for (const item of pole) {
//   console.log(item)
// }

// let i = 0;
// while (i < pole.length) {
//   const item = pole[i];
//   console.log(item)
//   i++;
// }
