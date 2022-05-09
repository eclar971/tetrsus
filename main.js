const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const moves = {
  ["a"]: (p) => ({ ...p, x: p.x - 1 }),
  ["d"]: (p) => ({ ...p, x: p.x + 1 }),
  ["s"]: (p) => ({ ...p, y: p.y + 1 }),
  [" "]: (p) => ({ ...p, y: p.y + 1 }),
};
// Calculate size of canvas from constants.
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

// Scale blocks
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
function resetGame() {
  account.score = 0;
  account.lines = 0;
  account.level = 0;
  board = this.getEmptyBoard();
}
let accountValues = {
  score: 0,
  lines: 0,
  level: 0
};
function updateAccount(key, value) {
  let element = document.getElementById(key);
  if (element) {
    element.innerHTML = value;
  }
}
let account = new Proxy(accountValues, {
  set: (target, key, value) => {
    target[key] = value;
    updateAccount(key, value);
    return true;
  },
});
function play() {
  document.getElementById("startButton").onclick = stop;
  let board = new Board();
  board.reset();
  let piece = new Piece(ctx);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  piece.draw();
  board.piece = piece;
  board.piece.draw();
  console.table(board.grid);
  counter = 1000
  var myFunction = function () {
    counter = 1000;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    board.drawBoard();

    let p = moves["s"](board.piece);

    if (board.valid(p)) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      board.drawBoard();
      // If the move is valid, move the piece.
      board.piece.move(p);

      // Clear old position before drawing

      board.piece.draw();
    } else {
      board.freeze();
      board.clearLines();
      board.draw();
      let piece = new Piece(ctx);
      piece.draw();
      board.piece = piece;
      board.piece.draw();
      ///board.isFull()
      console.table(board.grid);
    }
    setTimeout(myFunction, counter);
  };
  setTimeout(myFunction, counter);
  document.addEventListener("keydown", (event) => {
    if (event.key == "w") {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      board.drawBoard();
      let p = board.piece;
      board.rotate(p);
      while (p.x < 0) {
        p.x++;
      }
      while (p.x + p.shape.length > 10) {
        p.x -= 1;
      }
      board.piece.draw();
    } else if (event.key == " ") {
      let p = moves[event.key](board.piece);
      while (board.valid(p)) {
        account.score += POINTS.HARD_DROP;
        board.piece.move(p);
        p = moves["s"](board.piece);
      }
      // Clear old position before drawing.
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      board.drawBoard();
      board.piece.draw();
    } else if (moves[event.key]) {
      // Stop the event from bubbling.
      event.preventDefault();

      // Get new state of piece
      let p = moves[event.key](board.piece);

      if (board.valid(p)) {
        if (event.key === "s") {
          account.score += POINTS.SOFT_DROP;
        }
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        board.drawBoard();
        // If the move is valid, move the piece.
        board.piece.move(p);

        // Clear old position before drawing

        board.piece.draw();
      }
    }
  });
}
document.getElementById("startButton").addEventListener(
  "click",
  () => {
    console.log("only once!");
  },
  { once: true }
);
