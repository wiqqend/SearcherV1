


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
        if (x<0 || x>= this.width || y<0 || y>= this.height) 
            return null;
        return this.cells[y][x];
    }
    reset() {
        this.cells.flat().forEach(cell => cell.reset());
    }
    
    getneighbors(cell) {
        return [[0,-1] [0,1],[-1,0],[1,0]].map((dx,dy) => this.getCell(cell.x+dx, cell.y+dy)).filter(neighbor => neighbor && !neighbor.isWall);
    }
    reset() {
        this.cells.flat().forEach(cell => cell.reset());
        
    }
    clearWalls() {
        this.cells.flat().forEach(cell => {cell.isWall = false;});
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
class UI {
    constructor() {
        this.grid = null;
        this.tableElement = document.getElementById("grid");
        this.statusElement = document.getElementById("status");
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

Grid.buildGrid();