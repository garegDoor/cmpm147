// sketch.js - purpose and description here
// Author: Gabe Ahrens
// Date: 2/20/2025

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
// Globals
let myInstance;
let canvasContainer;
let centerHorz;
let centerVert;

let lineLength = 75;
let theta = 10;

let ls;
let ls2;
let ls3;

class LSystem 
{
		constructor()
		{
				this.steps = 0;
			
				// input
				this.axiom = "F";
			
				// rules for replacing characters
				//this.ruleF = "F[+F][-F]";
				this.ruleF = "F[++FC][--FC]";
				//this.ruleF = "F[+F--F]";
				//this.ruleF = "F[+F-F]"
				//this.ruleF = "F[C]-F"
			
				this.ruleC = "C";
			
				this.rulePlus = "+";
			
				this.ruleMinus = "-";
			
				this.rulePush = "[";
			
				this.rulePop = "]";
			
				this.reset();
		}
	
		simulate(gen)
		{
				while (this.getAge() < gen)
				{
						this.iterate();		
				}
		}
	
		reset()
		{
				this.production = this.axiom;
				this.generations = 0;
		}
	
		getAge()
		{	
				return this.generations;
		}
	
		iterate()
		{
				let newProduction = "";
				
				for (let i = 0; i < this.production.length; i++)
				{
						let step = this.production.charAt(i);
					
						switch (step)
						{
								case 'F':
										newProduction = newProduction + this.ruleF;
										break;		
								
								case 'C':
										newProduction = newProduction + this.ruleC;
										break;
								
								case '-':
										newProduction = newProduction + this.ruleMinus;
										break;
								
								case '+':
										newProduction = newProduction + this.rulePlus;
										break;
								
								case '[':
										newProduction = newProduction + this.rulePush;
										break;
								
								case ']':
										newProduction = newProduction + this.rulePop;
										break;
								
							default:
										print("Error in iterate: switch statement default case");
										break;
						}	
				}
			
				this.generations++;
				this.production = newProduction;
		}
	
		render()
		{
				for (let i = 0; i < this.production.length; i++)
				{
						let step = this.production.charAt(i);		
						
						let val = i * 255/this.production.length;
						stroke(val, val, val);
						fill(0, 255 - val, 0);
					
						switch (step)
						{
								case 'F':
										line(0, 0, 0, -lineLength);
										translate(0, -lineLength);
										break;
								
								case 'C':
										noStroke();
										circle(0, 0, 30);
										break;
								
								case '-':
										rotate(-theta);
										break;
								
								case '+':
										rotate(theta);
										break;
								
								case '[':
										push();
										break;
								
								case ']':
										pop();
										break;
								
								default:
										print("Error in render: switch statement default case");
										break;
						}
				}
		}
}


function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(round(canvasContainer.width()), round(canvasContainer.height()));
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height() + 1000);
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  //noiseSeed(random()*Number.MAX_SAFE_INTEGER);

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
  

  //let canvas = createCanvas(500, 500);

  background(220);
  strokeWeight(3);

  angleMode(DEGREES);

  ls = new LSystem();
  ls2 = new LSystem();
  ls3 = new LSystem();

  ls.simulate(6);

  lineLength = lineLength/2;

  ls2.simulate(4);

  lineLength = lineLength/2;

  ls3.simulate(2);
}

function draw() {
  // push();
  // translate(width/2, height);
  // line(0, 0, 0, -50);
  // translate(0, -50);
  // rotate(QUARTER_PI);
  // line(0, 0, 0, -50);
  // translate(0, -50);
  // push();
  // rotate(QUARTER_PI);
  // line(0, 0, 0, -50);
  // translate(0, -50);
  // pop();
  // rotate(-QUARTER_PI);
  // line(0, 0, 0, -50);
  // pop();

  background(220);
  theta = 30 * mouseY/360;
  lineLength = 50 + mouseX/10;

  //translate(-canvasContainer.width() / 2, 0);

  push();
  translate(width/2, height);
  ls.render();
  pop();

  push();
  translate(width/4, height);
  ls2.render();
  pop();

  push();
  translate(width/2 + width/4, height);
  ls2.render();
  pop();

  push();
  translate(width/8, height);
  ls3.render();
  pop();

  push();
  translate(width/2 + width/4 + width/8, height);
  ls3.render();
  pop();
}

