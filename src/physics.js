function isCollidingWithObstacle(destination) {
  const xi = destination.xi;
  const yi = destination.yi;
  const content = grid[yi][xi];
  if (content === 0) {
    return false;
  }
  return true;
}
