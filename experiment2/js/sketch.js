// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

let cloversPerRow = 65;
let spacing = 65;

class CloverField {
		constructor()
		{
			this.clovers = [];
			this.baseColor = color(32, 121, 32);
		}
	
		generateField()
		{
			let numClovers = 1400;
			for (let i = 0; i < numClovers; i++)
			{
				this.clovers[i] = new Clover((i % (cloversPerRow)) * spacing, floor(i / (cloversPerRow)) * spacing, this.baseColor, random(0, PI));
			}
		}
	
		render()
		{
			for (let c = 0; c < this.clovers.length; c++)
			{
				this.clovers[c].render();
			}
		}
}

class Clover {
	constructor(x, y, color, rotation)
	{
		this.x = x;
		this.y = y;
		this.color = color
		this.rotation = rotation;
	}
	
	render()
	{
		angleMode(RADIANS);
		fill(32, 121 + this.rotation/2 * sin(millis()/2500) * 50, 32);
		stroke('lightgreen');
		push();
		translate(this.x, this.y);
		rotate(this.rotation + sin(millis()/2500)/2);
		scale(0.75, 0.75, 0.5);
		push();
		translate(20, 20);
		cloverLeaf();
		pop();
		rotate(4 * PI/6);
		push();
		translate(20, 25);
		cloverLeaf();
		pop();
		rotate(4 * PI/6);
		push();
		translate(23, 20);
		cloverLeaf();
		pop();
		pop();
	}
}


function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  background(100, 200, 100);
	//canvasSize = min(width,height)*0.9;
	//generate();
	//c = new Clover(width/2, height/2, 'darkgreen');
	//c.render();
	
	cF = new CloverField();
	cF.generateField();
	//cF.render();
	
	//cTest = new Clover(width/2, height/2, 'darkgreen',  0);
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(100, 200, 100);
	cF.render();
}

function cloverLeaf() {
  strokeWeight(3);
  angleMode(RADIANS);
  arc(0, 0, 80, 50, 0, PI/4);
  arc(0, 0, 50, 80, PI/4, PI/2);
  arc(0, 0, 80, 50, -PI + PI/4, 0);
  arc(0, 0, 50, 80, -3 * PI/2, PI * 2 - 3 * PI/4);
}