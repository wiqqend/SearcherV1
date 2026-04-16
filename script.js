


class Grid {
    constructor(width, height, cells=[[]]) {
        this.width = width;
        this.height = height;
        this.cells = cells;
    }
    buildGrid() { // creates a table of cell objects based on the width and height of the grid (given by user input)
        var height = this.height;
        var width = this.width;
        var cells = [];
        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                row.push(new Cell(j, i));
            }
            cells.push(row);
        }
        this.cells = cells;

    }
    getCell(x, y) {

    }
    resetGrid() {

    }
    getneighbors(cell) {

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