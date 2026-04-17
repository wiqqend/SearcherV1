


class Grid {
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.cells = [];
        this.buildGrid();
    }
    buildGrid() {
        this.cells = [];
        
        for (let y = 0; y < this.height; y++) {
            this.cells[y] = [];
            
            for (let x = 0; x < this.width; x++) {
                this.cells[y][x] = new Cell(x, y);
                }
            }
    }
    getCell(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) 
            return null;
        return this.cells[y][x];
  }
    
    getNeighbors(cell) {
        const dirs = [[0,-1],[0,1],[-1,0],[1,0]];
        const neighbors = [];
        for (let i = 0; i < dirs.length; i++) {
            const neighbor = this.getCell(cell.x + dirs[i][0], cell.y + dirs[i][1]);
        
            if (neighbor && !neighbor.isWall) 
            neighbors.push(neighbor);
    }
    return neighbors;
  }
    reset() {
        for (let y = 0; y < this.height; y++)
            for (let x = 0; x < this.width; x++)
                this.cells[y][x].reset();
    }
    clearWalls() {
        for (let y = 0; y < this.height; y++)
            for (let x = 0; x < this.width; x++)
                this.cells[y][x].isWall = false;
    }
}

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
 
  // Toggle cell between wall and empty
  toggleWall() {
    if (!this.isStart && !this.isGoal) this.isWall = !this.isWall;
  }
 
  // Reset visited/path/parent state 
  reset() {
    this.isVisited = false;
    this.isPath = false;
    this.parent = null;
  }
}
class searchAlgorithm{
    constructor(grid, startCell, goalCell, visited=[], queue=[]) {
        this.grid = grid;
        this.startCell = startCell;
        this.goalCell = goalCell;
        this.visited = visited;
        this.queue = queue;
    }

    run() {

    }

    newpath(goalCell) {

    }

    newGoal(goalCell) {

    }

}


class BFS extends searchAlgorithm{
    constructor(queue = []) {
        super(queue);
    }
    pathfindingBFS() {

    }
    newpath(goalCell) {

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
            td.addEventListener('mouseenter', function() {
                self.highlightNeighbors(parseInt(this.dataset.x), parseInt(this.dataset.y));
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
        if      (cell.isStart)   td.className = 'start';
        else if (cell.isGoal)    td.className = 'goal';
        else if (cell.isPath)    td.className = 'path';
        else if (cell.isVisited) td.className = 'visited';
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

    startAlgorithm() {
        const { sx, sy, gx, gy } = this.readInputs();
        const startCell = this.grid.getCell(sx, sy);
        const goalCell  = this.grid.getCell(gx, gy);
        if (!startCell || !goalCell) 
            return;
 
        this.grid.reset();
 
        const algo = new BFS(this.grid, startCell, goalCell);
        algo.run(); 
    
        this.renderGrid(); // re-render to show result instantly
  }

    createPath(goalCell) {

    }
}

const ui = new UIController();