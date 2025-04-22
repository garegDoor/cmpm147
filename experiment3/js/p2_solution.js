/* exported generateGrid, drawGrid */
/* global placeTile */

function generateGrid(p, numCols, numRows) {
    let grid = [];
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        row.push("_");
      }
      grid.push(row);
    }
    
    for (let i = 0; i < numRows; i++)
    {
      for (let j = 0; j < numCols; j++)
      {
        if (p.noise(i/25, j/25) > 0.75)
        {
          grid[j][i] = '~';    
        }
        else if (p.noise(i/25, j/25) >= 0.55)
        {
          grid[j][i] = '.';
        }
        else if (p.noise(i/25, j/25) >= 0.4)
        {
          grid[j][i] = '|'
        }
        else
        {
          grid[j][i] = '*';    
        }
            
      }
    }
    
    return grid;
  }
  
  function drawGrid(p, grid) {
    p.background(128);
  
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[i].length; j++) {
        // if (grid[i][j] == '_') {
        //   placeTile(i, j, floor(random(0,4)), 9);
        // }
        // else if (grid[i][j] == '.')
        // {
        //   placeTile(i, j, floor(random(21, 25)), floor(random(21, 25)));
        // }
        if (gridCheck(grid, i, j, '.')) // plains
        {
          placeTile(i, j, (p.random(4) | 0), 0);        
        }
        else if (gridCheck(grid, i, j, '*')) // water
        {
          placeTile(i, j, (p.random(4) | 0), 13);
        }
        else if (gridCheck(grid, i, j, '|')) // beach
        {
          placeTile(i, j, (p.random(4) | 0), (p.random(18, 19) | 0));
        }
        else if (gridCheck(grid, i, j, '~')) // trees
        {
          placeTile(i, j, 16, 1);    
        }
        else
        {
          drawContext(grid, i, j, '.', 4, 0); // room boundaries
        }
        
        // Shadows
        if (p.noise(j/25, i/25) < 0.4)
        {
          p.fill(255, 255, 255, 0.25/p.sin((((p.millis()%2500)/p.noise(j/25,i/25))/1000)) * 250);
          //fill(255, 255, 255, 200 * noise(j/((sin(millis()/500)*20), i/((sin(millis()/500)*20)))));
          p.noStroke();
          p.rect(16 * j, 16 * i, 16, 16);    
        }
        
      }
    }
    
    //test
    //placeTile(0, 0, 1, 1);
  }
  
  function gridCheck(grid, i, j, target)
  {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length)
      return false;
    
    return grid[i][j] == target;
  }
  
  function gridCode(grid, i, j, target)
  {
    //let nwBit = gridCheck(grid, i-1, j-1, target);
    let nBit = gridCheck(grid, i, j-1, target);
    //let neBit = gridCheck(grid, i+1, j-1, target);
    let wBit = gridCheck(grid, i-1, j, target);
    let eBit = gridCheck(grid, i+1, j, target);
    //let swBit = gridCheck(grid, i-1, j+1, target);
    let sBit = gridCheck(grid, i, j+1, target);
    //let seBit = gridCheck(grid, i+1, j+1, target);
    
    //let output = (nwBit<<0)+(nBit<<1)+(neBit<<2)+(wBit<<3)+(eBit<<4)+(swBit<<5)+(sBit<<6)+(seBit<<7);
    let output = (nBit<<0)+(sBit<<1)+(eBit<<2)+(wBit<<3);
    //console.log(output);
    return (output);
  }
  
  const lookup = [
    [1,1], //background
    [0,1], // right side
    [2,1], // left side
    [0,1], // overlap top bottom
    [1,2], // top
    [0,2], // overlap top right
    [2,2], // overlap top left
    [0,0],
    [1,0], // bottom
    [0,0],
    [2,0], // overlap botoom left
    [0,0],
    [1,0], // overlap up down
    [0,0],
    [0,0],
    [0,0]
  ];
  
  function drawContext(grid, i, j, target, ti, tj)
  {
    //console.log("test");
    let code = gridCode(grid, i, j, target);
    const [tioffset, tjoffset] = lookup[code];
    
    //console.log("test2");
    placeTile(i, j, ti + tioffset, tj + tjoffset);
  }
  
  