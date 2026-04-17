


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
    }
    readInput() {

    }

    makegrid() {

    }

    cleargridwalls() {

    }

    addwalls(x,y) {
    
    }

    startalgorithm() {

    }

    createPath(goalCell) {

    }
}

const ui = new UIController();