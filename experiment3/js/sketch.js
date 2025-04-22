/* exported preload, setup, draw, placeTile */

/* global generateGrid drawGrid */

let s = function(p)
{

let seed = 0;
let tilesetImage;
let currentGrid = [];
let numRows, numCols;

p.preload = function() {
  tilesetImage = p.loadImage(
    "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
  );
}

function reseed() {
  seed = (seed | 0) + 1109;
  p.randomSeed(seed);
  p.noiseSeed(seed);
  p.select("#seedReport").html("seed " + seed);
  regenerateGrid();
}

function regenerateGrid() {
  p.select("#asciiBox").value(gridToString(generateGrid(p, numCols, numRows)));
  reparseGrid();
}

function reparseGrid() {
  currentGrid = stringToGrid(p.select("#asciiBox").value());
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
}

p.setup = function() {
  numCols = p.select("#asciiBox").attribute("rows") | 0;
  numRows = p.select("#asciiBox").attribute("cols") | 0;

  p.createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
  p.select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  p.select("#reseedButton").mousePressed(reseed);
  p.select("#asciiBox").input(reparseGrid);

  reseed();
}


p.draw = function() {
  p.randomSeed(seed);
  drawGrid(p, currentGrid);
}

function placeTile(i, j, ti, tj) {
  p.image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}
window.placeTile = placeTile;
};

new p5(s);
