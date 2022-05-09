class Piece {
  randomizeTetrominoType(noOfTypes) {
    return Math.floor(Math.random() * noOfTypes);
  }
  constructor(ctx) {
    const typeId = this.randomizeTetrominoType(COLORS.length);
    this.ctx = ctx;
    this.shape = SHAPES[typeId];
    this.color = COLORS[SHAPES[typeId][0][1] - 1];
    

    this.x = 3;
    this.y = 0;
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        // this.x, this.y gives the left upper position of the shape
        // x, y gives the position of the block in the shape
        // this.x + x is then the position of the block on the board
        if (value > 0) {
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
        }
      });
    });
  }
  move(p) {
    this.x = p.x;
    this.y = p.y;
  }
}
