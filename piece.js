class Piece {
  randomizeTetrominoType(noOfTypes) {
    return Math.floor(Math.random() * noOfTypes);
  }
  constructor(ctx) {
    const typeId = this.randomizeTetrominoType(COLORS.length);
    this.ctx = ctx;
    this.shape = SHAPES[typeId];
    let shapeNum = [].concat(...this.shape).filter(item => item !== 0)[0]
    this.color = COLORS[shapeNum - 1];
    

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
          this.ctx.globalAlpha = .6
          this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
          this.ctx.globalAlpha = 1
          this.ctx.fillRect(this.x + x + .1, this.y + y + .1, .8, .8);
        }
      });
    });
  }
  move(p) {
    this.x = p.x;
    this.y = p.y;
  }
}
