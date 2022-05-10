class Board {
  // Reset the board when we start a new game.
  reset() {
    this.grid = this.getEmptyBoard();
  }

  // Get matrix filled with zeros.
  getEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }
  insideWalls(x) {
    return x >= 0 && x < 10;
  }
  aboveFloor(y) {
    return y < 20;
  }
  isEmpty(value) {
    return value <= 0;
  }
  isColliding(x, y) {
    if (y < 20) {
      return this.grid[y][x] === 0;
    }
  }
  getLinesClearedPoints(lines, level) {
    return (level + 1) * lines * POINTS[lines];
  }
  clearLines() {
    let lines = 0;
    this.grid.forEach((row, y) => {
      if (row.every((value) => value !== 0)) {
        lines++; // Increase for cleared line
        this.grid.splice(y, 1);
        this.grid.unshift(Array(COLS).fill(0));
      }
    });
    if (lines > 0) {
      // Calculate points from cleared lines and level.

      account.score += this.getLinesClearedPoints(lines, account.level);
      account.lines += lines;

      // If we have reached the lines for next level
      if (account.lines >= LINES_PER_LEVEL) {
        // Goto next level
        account.level++;

        // Remove lines so we start working for the next level
        account.lines -= LINES_PER_LEVEL;

        // Increase speed of game.
      }
    }
  }
  getLineClearPoints(lines) {
    return lines === 1
      ? Points.SINGLE
      : lines === 2
      ? Points.DOUBLE
      : lines === 3
      ? Points.TRIPLE
      : lines === 4
      ? Points.TETRIS
      : 0;
  }
  isFull() {
    var full = false;
    this.grid[0].forEach((items) => {
       if (items != 0){
         full = true
       }
    })
    return(full)
  }
  valid(p) {
    return p.shape.every((row, dy) => {
      return row.every((value, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return (
          this.isEmpty(value) ||
          (this.insideWalls(x) && this.aboveFloor(y) && this.isColliding(x, y))
        );
      });
    });
  }
  rotate(p) {
    // Consider all squares one by one
    for (let x = 0; x < p.shape[0].length / 2; x++) {
      // Consider elements in group
      // of 4 in current square
      for (let y = x; y < p.shape[0].length - x - 1; y++) {
        // Store current cell in
        // temp variable
        let temp = p.shape[x][y];

        // Move values from right to top
        p.shape[x][y] = p.shape[y][p.shape[0].length - 1 - x];

        // Move values from bottom to right
        p.shape[y][p.shape[0].length - 1 - x] =
          p.shape[p.shape[0].length - 1 - x][p.shape[0].length - 1 - y];

        // Move values from left to bottom
        p.shape[p.shape[0].length - 1 - x][p.shape[0].length - 1 - y] =
          p.shape[p.shape[0].length - 1 - y][x];

        // Assign temp to left
        p.shape[p.shape[0].length - 1 - y][x] = temp;
      }
    }
  }
  freeze() {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.grid[y + this.piece.y][x + this.piece.x] = value;
        }
      });
    });
  }
  drawBoard() {
    this.grid.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.piece.ctx.fillStyle = COLORS[value - 1];
          this.piece.ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }
  draw() {
    this.piece.draw();
    this.drawBoard();
  }
}
