/* exported preload, setup, draw, placeTile */

/* global generateGrid drawGrid */

let s1 = function(p)
{

let seed1 = 0;
let tilesetImage1;
let currentGrid1 = [];
let numRows1, numCols1;

p.preload = function() {
  tilesetImage1 = p.loadImage(
    "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
  );
}

function reseed1() {
  seed1 = (seed1 | 0) + 1109;
  p.randomSeed(seed1);
  p.noiseSeed(seed1);
  p.select("#seedReport1").html("seed " + seed1);
  regenerateGrid1();
}

function regenerateGrid1() {
  p.select("#asciiBox1").value(gridToString1(generateGrid1(p, numCols1, numRows1)));
  reparseGrid1();
}

function reparseGrid1() {
  currentGrid1 = stringToGrid1(p.select("#asciiBox1").value());
}

function gridToString1(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid1(str) {
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
  numCols1 = p.select("#asciiBox1").attribute("rows") | 0;
  numRows1 = p.select("#asciiBox1").attribute("cols") | 0;

  p.createCanvas(16 * numCols1, 16 * numRows1).parent("canvasContainer1");
  p.select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  p.select("#reseedButton1").mousePressed(reseed1);
  p.select("#asciiBox1").input(reparseGrid1);

  reseed1();
}


p.draw = function() {
  p.randomSeed(seed1);
  drawGrid1(p, currentGrid1);
}

function placeTile1(i, j, ti, tj) {
  p.image(tilesetImage1, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}
window.placeTile1 = placeTile1;

};

new p5(s1);