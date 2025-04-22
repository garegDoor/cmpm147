/* exported generateGrid, drawGrid */
/* global placeTile */

function generateGrid1(p, numCols, numRows) {
    let grid = [];
    let numSideRooms = 4;
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        row.push("_");
      }
      grid.push(row);
    }
    
    let left = p.floor(p.random(numRows/2 - numRows/4, numRows/2));
    let top = p.floor(p.random(numCols/2 - numCols/4, numCols/2));
    let width = p.floor(p.random(4, 8));
    let height = p.floor(p.random(4, 8));
    
    
    // Generate initial room in center
    for (let y = top; y < top + height; y++)
    {
      for (let x = left; x < left + width; x++)
      {
        grid[y][x] = '.';
      }
    }
    
    let upDone = false, rightDone = false, downDone = false, leftDone = false;
    
    // Generate smaller rooms
    for (let n = 0; n < numSideRooms; n++)
    {
      let pathLen = p.floor(p.random(3, 8));
      
      let direction = p.floor(p.random(0, 5));
      
      let sX, sY, h, w, chest;
      
      switch (direction)
      {
      case 0:
        //up
        if (upDone)
          break;
        sX = p.floor(left + (width/2));
        sY = top - 1;
  
        // door
        grid[sY][sX] = '~';
  
        // path
        for (let p = 1; p <= pathLen; p++)
        {
          if (p == pathLen)
          {
            grid[sY - p + 1][sX] = '~';
          }
          else
          {
            grid[sY - p][sX] = '|';    
          }
  
        }
  
        h = p.floor(p.random(3, 6));
        w = p.floor(p.random(3, 6));
  
        chest = [p.floor(p.random(1, h - 1)),p.floor(p.random(1, w - 1))];
  
        // room
        for (let ry = 0; ry < h; ry++)
        {
          for (let rx = 0; rx < w; rx++)
          {
            if (ry == chest[0] && rx == chest[1])
            {
              grid[sY - pathLen - ry][sX - rx + p.floor(width/2 - 1)] = '*';
            }
            else
            {
              grid[sY - pathLen - ry][sX - rx + p.floor(width/2 - 1)] = '.';    
            }  
          }
        }
        upDone = true;
        break;
  
      case 1:
        //right
        if (rightDone)
          break;
        sX = left + width;
        sY = p.floor(top + height/2);
  
        // door
        grid[sY][sX] = '~';
  
        // path
        for (let p = 1; p <= pathLen; p++)
        {
          if (p == pathLen)
          {
            grid[sY][sX + p - 1] = '~';
          }
          else
          {
            grid[sY][sX + p] = '|';    
          }
        }
  
        h = p.floor(p.random(3, 6));
        w = p.floor(p.random(3, 6));
  
        chest = [p.floor(p.random(1, h - 1)),p.floor(p.random(1, w - 1))];
  
        // room
        for (let ry = 0; ry < h; ry++)
        {
          for (let rx = 0; rx < w; rx++)
          {
            if (ry == chest[0] && rx == chest[1])
            {
              grid[sY - ry + p.floor(height/2 - 1)][sX + pathLen + rx] = '*';
            }
            else
            {
              grid[sY - ry + p.floor(height/2 - 1)][sX + pathLen + rx] = '.';    
            }  
          }
        }
        rightDone = true;
        break;
  
      case 2:
        //down
        if (downDone)
          break;
        sX = p.floor(left + (width/2));
        sY = top + height;
        
        // door
        grid[sY][sX] = '~';
          
        // path
        for (let p = 1; p <= pathLen; p++)
        {
          if (p == pathLen)
          {
            grid[sY + p - 1][sX] = '~';
          }
          else
          {
            grid[sY + p][sX] = '|';    
          }
        }
        
        h = p.floor(p.random(3, 6));
        w = p.floor(p.random(3, 6));
  
        chest = [p.floor(p.random(1, h - 1)),p.floor(p.random(1, w - 1))];
        
        // room
        for (let ry = 0; ry < h; ry++)
        {
          for (let rx = 0; rx < w; rx++)
          {
            if (ry == chest[0] && rx == chest[1])
            {
              grid[sY + pathLen + ry][sX - rx + p.floor(width/2 - 1)] = '*';
            }
            else
            {
              grid[sY + pathLen + ry][sX - rx + p.floor(width/2 - 1)] = '.';    
            }  
          }
        }
          
        downDone = true;
        break;
  
      case 3:
        //left
        if (leftDone)
          break;
        sX = left - 1;
        sY = p.floor(top + height/2);
          
        // door
        grid[sY][sX] = '~';
          
        // path
        for (let p = 1; p <= pathLen; p++)
        {
          if (p == pathLen)
          {
            grid[sY][sX - p + 1] = '~';
          }
          else
          {
            grid[sY][sX - p] = '|';    
          }
        }
        
        // room
        h = p.floor(p.random(3, 6));
        w = p.floor(p.random(3, 6));
  
        chest = [p.floor(p.random(1, h - 1)),p.floor(p.random(1, w - 1))];
  
        // room
        for (let ry = 0; ry < h; ry++)
        {
          for (let rx = 0; rx < w; rx++)
          {
            if (ry == chest[0] && rx == chest[1])
            {
              grid[sY - ry + p.floor(height/2 - 1)][sX - pathLen - rx] = '*';
            }
            else
            {
              grid[sY - ry + p.floor(height/2 - 1)][sX - pathLen - rx] = '.';    
            }  
          }
        }
        
        leftDone = true;
        break;
      }
    }
    
    
    return grid;
  }
  
  function drawGrid1(p, grid) {
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
        if (gridCheck(grid, i, j, '.')) // room floor
        {
          placeTile1(i, j, (p.random(4) | 0) + 21, 21);        
        }
        else if (gridCheck(grid, i, j, '*')) // chest
        {
          placeTile1(i, j, 5, 28);
        }
        else if (gridCheck(grid, i, j, '~')) // door
        {
          placeTile1(i, j, 5, 26);
        }
        else if (gridCheck(grid, i, j, '|')) // path
        {
          placeTile1(i, j, p.random(4) | 0, 10);    
        }
        else
        {
          drawContext(grid, i, j, '.', 25, 21); // room boundaries
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
  
  const lookup1 = [
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
    const [tioffset, tjoffset] = lookup1[code];
    
    //console.log("test2");
    placeTile1(i, j, ti + tioffset, tj + tjoffset);
  }
  
  