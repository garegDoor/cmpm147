/* exported p4_inspirations, p4_initialize, p4_render, p4_mutate */

let cells = [];
let cellSize = 5;
let canvasSize = 1000;

let rowLen;
let numRows;

class Cell {
	constructor(x, y)
	{
		this.x = x;
		this.y = y;
		
		this.color = 'white';
		
		this.alive = floor(random(0, 2));
		
		
		this.neighbors = 0;
	}
	
	update()
	{
		
		if (this.alive == 0)
		{
			// Birth
			if (this.neighbors == 3)
				this.alive = 1;
		} 
		else
		{
			// Death by Isolation
			if (this.neighbors < 2)
			{
				this.alive = 0;		
			} // Death by Overcrowding
			else if (this.neighbors > 3)
			{
				this.alive = 0;		
			} // Survival
		}
	}
	
	resetNeighbors()
	{
		this.neighbors = 0;
	}
	
	countNeighbors() 
	{
		this.resetNeighbors();
		let x1 = this.x - 1;
		let x2 = this.x + 1;
		let y1 = this.y - 1;
		let y2 = this.y + 1;
		
		if (x1 == -1)
			x1 = rowLen - 1;
		
		if (x2 == rowLen)
			x2 = 0;
		
		if (y1 == -1)
			y1 = numRows - 1;
		
		if (y2 == numRows)
			y2 = 0;
		
		// check row above
		if (cells[y1][x1].alive)
			this.neighbors++;
		
		if (cells[y1][this.x].alive)
			this.neighbors++;
		
		if (cells[y1][x2].alive)
			this.neighbors++;
		
		// check same row as cell
		if (cells[this.y][x1].alive)
		{
			this.neighbors++;
			//this.color = 'magenta';
		}
			
		
		if (cells[this.y][x2].alive)
		{
			this.neighbors++;
			//this.color = 'purple';
		}
			
		
		// check row below
		if (cells[y2][x1].alive)
		{
			this.neighbors++;
			//this.color = 'blue';
		}
			
		
		if (cells[y2][this.x].alive)
		{
			this.neighbors++;
			//this.color = 'red';
		}
		
		if (cells[y2][x2].alive)
		{
			this.neighbors++;
			//this.color = 'green';
		}
			
	}
	
	render()
	{
		if (!this.alive)
			return;
		
		fill(this.color);
		noStroke();
		rect(this.x * cellSize, this.y * cellSize, cellSize, cellSize);
		//fill('black');
		//text(this.neighbors, this.x * cellSize + 10, this.y * cellSize + 10);
	}
}


function getInspirations() {
  return [
    {
      name: "Jeff the Slug",
      assetUrl: "img/jeff-the-slug.jpg",
      credit: "Jeff the Slug, a picture from my camera role, Gabe Ahrens, 2025"
    },
    {
      name: "Grace",
      assetUrl: "img/grace.jpg",
      credit: "Grace Herman, my girlfriend, 2025"
    },
    {
      name: "Cat",
      assetUrl: "img/cat.jpg",
      credit: "Cat, a picture from my camera role, Gabe Ahrens, 2025"
    }
  ];
}

function initDesign(inspiration) {
  // set the canvas size based on the container
  let canvasContainer = $('.image-container'); // Select the container using jQuery
  let canvasWidth = canvasContainer.width(); // Get the width of the container
  let aspectRatio = inspiration.image.height / inspiration.image.width;
  let canvasHeight = canvasWidth * aspectRatio; // Calculate the height based on the aspect ratio
  resizeCanvas(canvasWidth, canvasHeight);
  $(".caption").text(inspiration.credit); // Set the caption text

  // add the original image to #original
  const imgHTML = `<img src="${inspiration.assetUrl}" style="width:${canvasWidth}px;">`
  $('#original').empty();
  $('#original').append(imgHTML);

  
  let design = {
    bg: 0,
    cells: []
  }
  
  rowLen = floor(width/cellSize);
  numRows = floor(height/cellSize);

  for (let j = 0; j < numRows; j++)
  {
    design.cells[j] = [];
    for (let i = 0; i < rowLen; i++)
    {
      let newCell = new Cell(i, j);
      design.cells[j][i] = newCell;
      //console.log("Cell " + i + " x " + j +  " neighbors: " + design.cells[j][i].neighbors);
    }
  }

  cells = design.cells;
  bestCells = design.cells;

  
  
  return design;
}

function renderDesign(design, inspiration) {
  
  background(design.bg);
  noStroke();
  for (let j = 0; j < design.cells.length; j++)
  {
    for (let i = 0; i < design.cells[j].length; i++)
    {
      design.cells[j][i].render();
    }
  }
}

function mutateDesign(design, inspiration, rate) {
  //design.bg = mut(design.bg, 0, 255, rate);
  
  for (let j = 0; j < design.cells.length; j++)
  {
    for (let i = 0; i < design.cells[j].length; i++)
    {
      
      const cell = design.cells[j][i];
      if (!(cell instanceof Cell))
      {
        console.error('Not a cell at ['+j+']['+i+']: ', cell);
        console.log("Type of cell:", typeof cell);
      }
      else{
        cell.countNeighbors();
      }
    }
  }

  for (let j = 0; j < design.cells.length; j++)
  {
    for (let i = 0; i < design.cells[j].length; i++)
    {
      design.cells[j][i].update();
    }
  }
}


function mut(num, min, max, rate) {
    return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
}

function rehydrateCells(parsedCells)
{
  const hydrated = [];

  for (let j = 0; j < parsedCells.length; j++)
  {
    hydrated[j] = [];
    for (let i = 0; i < parsedCells[j].length; i++)
    {
      const data = parsedCells[j][i];
      const cell = new Cell(data.x, data.y);
      cell.alive = data.alive;
      cell.color = data.color;
      cell.neighbors = data.neighbors;
      hydrated[j][i] = cell;
    }
  }

  return hydrated;
}
