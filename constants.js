const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const SBlock = [
  [0, 7, 7],
  [7, 7, 0],
  [0, 0, 0],
];
const ZBlock = [
  [6, 6, 0],
  [0, 6, 6],
  [0, 0, 0],
];
const LBlock = [
  [0, 3, 0],
  [0, 3, 0],
  [0, 3, 3],
];
const JBlock = [
  [0, 4, 0],
  [0, 4, 0],
  [4, 4, 0],
];
const SquareBlock = [
  [2, 2],
  [2, 2],
];
const IBlock = [
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0],
  [0, 1, 0, 0]
];
const TBlock = [
  [5, 5, 5],
  [0, 5, 0],
  [0, 0, 0],
];
const COLORS = [  
  'cyan',
  'blue',
  'orange',
  'yellow',
  'green',
  'purple',
  'red'
];
const SHAPES = [SBlock, ZBlock, LBlock, JBlock, SquareBlock, IBlock, TBlock];
const POINTS = {
  1: 100,
  2: 300,
  3: 500,
  4: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2
}
Object.freeze(POINTS);

const LINES_PER_LEVEL = 10;

const LEVEL = {
  0: 800,
  1: 720,
  2: 630,
  3: 550,
}

Object.freeze(LEVEL);