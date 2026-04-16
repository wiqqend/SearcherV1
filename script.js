


class Grid {
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.cells = [];
        this.buildGrid();
    }
    buildGrid() { // creates a table of cell objects based on the width and height of the grid (given by user input)
        this.cells = [];
        for (let y = 0; y < this.height; y++) {
            this.cells[y] = [];
            for (let x=0; x < this.width; x++) {
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
class Cell{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isWall = false;
        this.isStart = false;
        this.isGoal = false;
        this.isVisited = false;
        this.isPath = false;
        this.parent = null;
        this.g = 0;
        this.h= 0;

    }
    toggleWall() {
        if (!this.isStart && !this.isGoal) 
            this.isWall = !this.isWall;}
    
    
    reset(){
        this.isVisited = false;
        this.isPath = false;
        this.parent = null;
        this.g = 0;
        this.h = 0;
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
    constructor(grid, algorithm, selectedAlgorithm) {
        this.grid = grid;
        this.algorithm = algorithm;
        this.selectedAlgorithm = selectedAlgorithm;
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