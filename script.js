class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isWall = false;
    this.isStart = false;
    this.isGoal = false;
    this.isVisited = false;
    this.isPath = false;
    this.parent = null;
  }
 
  // toggle cell between wall and empty
  toggleWall() {
    if (!this.isStart && !this.isGoal) 
        this.isWall = !this.isWall;
  }
 
  // reset visited/path/parent state 
  reset() {
    this.isVisited = false; 
    this.isPath = false;
    this.parent = null;
  }
}
class Grid {
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.cells = [];
        this.buildGrid();
    }
    buildGrid() { // creates the 2d array of cells
        this.cells = [];
        
        for (let y = 0; y < this.height; y++) {         // for each row
            this.cells[y] = [];                         // create the row array                 
            
            for (let x = 0; x < this.width; x++) {      // for each column
                this.cells[y][x] = new Cell(x, y);      // create a new cell and add it to the row
                }
            }
    }
    getCell(x, y) { // returns the cell at (x, y) or null if out of bounds
        if (x < 0 || x >= this.width || y < 0 || y >= this.height)      // check bounds
            return null;
        return this.cells[y][x];  // return the cell at (x, y) --> opposite order because cells is an array of rows (y) which are arrays of cells (x)
  }
    
    
    reset() { // resets visited/path/parent state of all cells
        for (let y = 0; y < this.height; y++)                // for each row
            for (let x = 0; x < this.width; x++)            // for each column
                this.cells[y][x].reset();                  // reset the cell at (x, y)
    }
    clearWalls() { // removes all walls from the grid
        for (let y = 0; y < this.height; y++)         // for each row
            for (let x = 0; x < this.width; x++)     // for each column
                this.cells[y][x].isWall = false;    // clear the wall state of the cell at (x, y)
    }
}

class searchAlgorithm { // base class for search algorithms
    constructor(grid, startCell, goalCell) {
        this.grid = grid;
        this.startCell = startCell;
        this.goalCell = goalCell;
        this.visited = [];
        this.pathCells = [];
  }


    reconstructPath(goalCell) { 
        const path = [];
        let current = goalCell;
        while (current) {
            path.unshift(current);
            current = current.parent;
        }
        return path;
        
  }

}
class BFS extends searchAlgorithm {
    run() {
        this.grid.reset();
        const queue = [this.startCell]; // fifo queue ?
        this.startCell.isVisited = true;
        this.visited = [];
        let found = false;
 
        while (queue.length) {
            const currentcell = queue.shift();
 
        if (currentcell === this.goalCell) {
            break;
      }
        for (const dir of [[0, -1], [1, 0], [0, 1], [-1, 0]]) {
            const nextX = currentcell.x + dir[0];
            const nextY = currentcell.y + dir[1];
            const nextCell = this.grid.getCell(nextX, nextY);   
        }
        
    }
 
    return { visited: this.visited, path: this.reconstructPath(this.goalCell) };
  }
}
class UIController {
    constructor() {
        this.grid = null;
        this.tableEl = document.getElementById('grid-table');
    
    const inputIds = ['gridWidth', 'gridHeight', 'startX', 'startY', 'goalX', 'goalY'];
    const self = this;
    for (let i = 0; i < inputIds.length; i++) {
        document.getElementById(inputIds[i]).addEventListener('input', function() {
            self.makeGrid();        // regenerate grid on input change based on inputID values
    });
    }
    this.makeGrid();
    
    }
    readInputs() {
        return {
            w:  Math.min(parseInt(document.getElementById('gridWidth').value)),
            h:  Math.min(parseInt(document.getElementById('gridHeight').value)),
            sx: parseInt(document.getElementById('startX').value),
            sy: parseInt(document.getElementById('startY').value),
            gx: parseInt(document.getElementById('goalX').value),
            gy: parseInt(document.getElementById('goalY').value)
            };
  }

    makeGrid() {
        const { w, h, sx, sy, gx, gy } = this.readInputs(); // read input values for grid dimensions and start/goal positions

        if (sx < 0 || sx >= w || sy < 0 || sy >= h) // validate start position
            return;
        if (gx < 0 || gx >= w || gy < 0 || gy >= h) // validate goal position
            return;
        if (sx === gx && sy === gy) 
            return;
        const old = this.grid;
        this.grid = new Grid(w, h); //
        if (old && old.width === w && old.height === h) // if grid dimensions are unchanged, copy wall states from old grid to new grid
            for (let y = 0; y < h; y++) 
                for (let x = 0; x < w; x++)
                    if (old.cells[y][x].isWall) // if the cell was a wall in the old grid, make it a wall in the new grid 
                        this.grid.cells[y][x].isWall = true;

        this.grid.getCell(sx, sy).isStart = true; // set the start cell based on input values
        this.grid.getCell(gx, gy).isGoal  = true; // set the goal cell based on input values
        this.renderGrid();    //render in ui
    }
    renderGrid(){
        this.tableEl.innerHTML = '';    // clear existing grid in UI
        for (let y = 0; y < this.grid.height; y++) { 
            const row = document.createElement('tr'); // create a new table row for each grid row
        for (let x = 0; x < this.grid.width; x++) {
            const td = document.createElement('td');  // create a new table cell for each grid cell
            this.applyClass(td, this.grid.getCell(x, y));
            td.dataset.x = x;
            td.dataset.y = y;
            const self = this;
            td.addEventListener('click', function() { 
                self.addWall(parseInt(this.dataset.x), parseInt(this.dataset.y)); // toggle wall state of the clicked cell
            });
            
            row.appendChild(td);
        }
        this.tableEl.appendChild(row);
    }
    }
    applyClass(td, cell) { // sets the colors using css based on the classnames
        td.className = '';
        if (cell.isStart)   td.className = 'start';
        else if (cell.isGoal)    td.className = 'goal';
        else if (cell.isPath)    td.className = 'path';
        else if (cell.isVisited)    td.className = 'visited';
        else if (cell.isWall)    td.className = 'wall';
    }
    clearGridWalls() { //reset grid
        this.grid.clearWalls();
        this.grid.reset();
        this.renderGrid();
    }

    addWall(x, y) { // toggle wall state of the cell at (x, y) and update the UI
        this.grid.getCell(x, y).toggleWall();
        this.applyClass(this.tableEl.rows[y].cells[x], this.grid.getCell(x, y));
    }

    startAlgorithm() {}

}

const ui = new UIController(); // init
