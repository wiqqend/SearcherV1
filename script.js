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
        
        for (let y = 0; y < this.height; y++) {
            this.cells[y] = [];
            
            for (let x = 0; x < this.width; x++) {
                this.cells[y][x] = new Cell(x, y);
                }
            }
    }
    getCell(x, y) { // returns the cell at (x, y) or null if out of bounds
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) 
            return null;
        return this.cells[y][x];
  }
    
    
    reset() { // resets visited/path/parent state of all cells
        for (let y = 0; y < this.height; y++)
            for (let x = 0; x < this.width; x++)
                this.cells[y][x].reset();
    }
    clearWalls() { // removes all walls from the grid
        for (let y = 0; y < this.height; y++)
            for (let x = 0; x < this.width; x++)
                this.cells[y][x].isWall = false;
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


    reconstructPath(goalCell) { //
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
            self.makeGrid();
    });
    }
    this.makeGrid();
    
    }
    readInputs() {
        return {
            w:  Math.min(parseInt(document.getElementById('gridWidth').value)  || 20, 60),
            h:  Math.min(parseInt(document.getElementById('gridHeight').value) || 10, 40),
            sx: parseInt(document.getElementById('startX').value) || 0,
            sy: parseInt(document.getElementById('startY').value) || 0,
            gx: parseInt(document.getElementById('goalX').value)  || 9,
            gy: parseInt(document.getElementById('goalY').value)  || 9,
            };
  }

    makeGrid() {
        const { w, h, sx, sy, gx, gy } = this.readInputs();

        if (sx < 0 || sx >= w || sy < 0 || sy >= h) 
            return;
        if (gx < 0 || gx >= w || gy < 0 || gy >= h) 
            return;
        if (sx === gx && sy === gy) 
            return;
        const old = this.grid;
        this.grid = new Grid(w, h);
        if (old && old.width === w && old.height === h)
            for (let y = 0; y < h; y++)
                for (let x = 0; x < w; x++)
                    if (old.cells[y][x].isWall) 
                        this.grid.cells[y][x].isWall = true;

        this.grid.getCell(sx, sy).isStart = true;
        this.grid.getCell(gx, gy).isGoal  = true;
        this.renderGrid();    
    }
    renderGrid(){
        this.tableEl.innerHTML = '';    
        for (let y = 0; y < this.grid.height; y++) {
            const row = document.createElement('tr');
        for (let x = 0; x < this.grid.width; x++) {
            const td = document.createElement('td');
            this.applyClass(td, this.grid.getCell(x, y));
            td.dataset.x = x;
            td.dataset.y = y;
            const self = this;
            td.addEventListener('click', function() {
                self.addWall(parseInt(this.dataset.x), parseInt(this.dataset.y));
            });
            
            td.addEventListener('mouseleave', function() {
                self.renderGrid();
            });
            row.appendChild(td);
        }
        this.tableEl.appendChild(row);
    }
    }
    applyClass(td, cell) {
        td.className = '';
        if (cell.isStart)   td.className = 'start';
        else if (cell.isGoal)    td.className = 'goal';
        else if (cell.isPath)    td.className = 'path';
        else if (cell.isVisited)    td.className = 'visited';
        else if (cell.isWall)    td.className = 'wall';
    }
    clearGridWalls() {
        this.grid.clearWalls();
        this.grid.reset();
        this.renderGrid();
    }

    addWall(x, y) {
        this.grid.getCell(x, y).toggleWall();
        this.applyClass(this.tableEl.rows[y].cells[x], this.grid.getCell(x, y));
    }

    startAlgorithm() {}

}

const ui = new UIController();
