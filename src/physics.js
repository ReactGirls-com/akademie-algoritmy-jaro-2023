function isCollidingWithObstacle(destination) {
  const xi = destination.xi;
  const yi = destination.yi;
  if (yi < 0 || xi < 0 || yi >= grid.length || xi >= grid[0].length) {
    return true;
  }
  const content = grid[yi][xi];
  if (content === 0) {
    return false;
  }
  return true;
}
