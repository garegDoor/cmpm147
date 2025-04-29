let seed;
let worldKey = "wall";

let rockMaxWidth = 150;
let rockMaxHeight = 75;

let cushion = 10;

let colWidth = rockMaxWidth + cushion;
let rowHeight = rockMaxHeight + cushion;

let rowXOffsets = [];

let camera_pos;
let camera_velocity;

let num_cols_per_screen, num_rows_per_screen;

var textbox;

function worldSeedChanged(key) {
	seed = XXH.h32(key, 0);
	noiseSeed(seed);
	randomSeed(seed);
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

function setup() {
	// place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  //myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();

  let label = createP();
  label.position(50, canvasContainer.height() + 70);
  label.html("World key: ");
  //label.parent("container");
  
  textbox = createInput(worldKey);
  textbox.position(125, canvasContainer.height() + 85);
	textbox.input(() => {
    updateWorldSeed(textbox.value());
  });
	//canvas = createCanvas(900, 900);
	//canvas.position(0, 200);
	background(40);
	
	worldSeedChanged(worldKey);
	
	camera_pos = new p5.Vector(0, 0);
	camera_velocity = new p5.Vector(0, 0);
	
	num_cols_per_screen = canvas.width/colWidth;
	num_rows_per_screen = canvas.height/rowHeight + 2;
	
	//translate(0, rockMaxHeight);
	
	initializeRowXOffsets();
	
	generateRocks(0, 0);
}

function initializeRowXOffsets()
{
	rowXOffsets = [];
	for (n = 0; n < num_rows_per_screen; n++)
	{
		rowXOffsets.push(0);		
	}
}

function generateRocks()
{
	for (let r = 0; r < num_rows_per_screen; r++)
	{
		while (rowXOffsets[r] < (camera_pos.x + width))
		{
			generateColOfRocks();
		}
	}
}

function generateColOfRocks()
{
		push();
		for (let j = 0; j < num_rows_per_screen; j++)
		{
			push();
			translate(rowXOffsets[j], -rockMaxHeight);
			createRock(0, 0);		
			translate(rockMaxWidth + 10, 0);
			rowXOffsets[j] += rockMaxWidth + 10;
			rockMaxWidth = floor(random(100, 176));
			pop();
			translate(0, rockMaxHeight);
		}
		pop();
}
		

function updateWorldSeed(newKey)
{
	worldSeedChanged(newKey);
	//camera_pos = new p5.Vector(0, 0);
	camera_velocity = new p5.Vector(0, 0);
	initializeRowXOffsets();
	background(40);
	generateRocks();
}

function createRock(x, y)
{
	push();
	
	translate(x, y);
	noStroke();
	let color = random(60, 180);
	fill(color + random(0, 20), color + random(0, 10), color);
	
	let verts = [];
	
	// setup initial quad
	let topLeft = createVector(random(0, rockMaxWidth/8), random(0, rockMaxHeight/8));
	let topRight = createVector(random(rockMaxWidth - rockMaxWidth/8, rockMaxWidth), random(0, rockMaxHeight/8));
	let botLeft = createVector(random(0, rockMaxWidth/8), random(rockMaxHeight - rockMaxHeight/8, rockMaxHeight));
	let botRight = createVector(random(rockMaxWidth - rockMaxWidth/8, rockMaxWidth), random(rockMaxHeight - rockMaxHeight/8, rockMaxHeight));
	
	// subdivide edges with more points
	let top = newVert(topLeft.x, topLeft.y, topRight.x, topRight.y);
	let right = newVert(topRight.x, topRight.y, botRight.x, botRight.y);
	let bot = newVert(botRight.x, botRight.y, botLeft.x, botLeft.y);
	let left = newVert(botLeft.x, botLeft.y, topLeft.x, topLeft.y);
	
	// add all vertices to verts[]
	verts.push(topLeft);
	verts.push(top);
	verts.push(topRight);
	verts.push(right);
	verts.push(botRight);
	verts.push(bot);
	verts.push(botLeft);
	verts.push(left);
	
	push();
	
	beginShape();
	/*vertex(-1 * rWPos, 0);
	vertex(0, rHPos);
	vertex(rWPos, 0);
	vertex(0, -1 * rHPos);*/
	for (let v = 0; v < verts.length; v++)
	{
		//print(verts[v].x + " " + verts[v].y);
		vertex(verts[v].x, verts[v].y);
	}
	endShape(CLOSE);
	
	pop();
	
	pop();
	/*
	stroke('blue');
	strokeWeight(5);
	point(topLeft.x, topLeft.y);
	point(top.x, top.y);
	point(topRight.x, topRight.y);
	*/
}

// takes vertices 1 & 2 and outputs a new vertice that is some offset in-between both of them in o
function newVert(x1, y1, x2, y2) {
	let betweenVec = createVector(x2 - x1, y2 - y1);
	let mag = betweenVec.mag();
	//print("mag: " + mag);
	let iVec = createVector((betweenVec.x)/(mag), (betweenVec.y)/(mag));
	let tanVec = createVector(iVec.y, iVec.x);
	
	let dist = random(mag/4, 3 * mag/4);
	//print(dist);
	let midPoint = createVector(iVec.x * dist + x1, iVec.y * dist + y1);
	
	let coinFlip = floor(random(0,2));
	let offsetDir;
	if (coinFlip <= 1)
	{
			offsetDir = 1;
	}
	else
	{
			offsetDir = -1;
	}
	let offset = random(mag/32, mag/8);
	let newPoint = createVector(midPoint.x + (offsetDir * offset * tanVec.x), midPoint.y + (offsetDir * offset * tanVec.y));
	
	return newPoint;
}

function keyPressed()
{
	if (key == 'd')
	{
		//print("pressed d");
		camera_pos.x += 10;		
	}
	else if (key == 'a')
	{
		//print("pressed a");
		if (camera_pos.x >= 10)
		{
			camera_pos.x -= 10;
		}
	}
}

function draw() {
	//print(camera_pos);
	// Keyboard controls!
  if (keyIsDown(RIGHT_ARROW)) {
    camera_pos.x += 5;
  }
	if (keyIsDown(LEFT_ARROW)) {
    camera_pos.x -= 5;
  }
	translate(-camera_pos.x, 0);
	updateWorldSeed(textbox.value());
}