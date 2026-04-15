


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
    constructor(x, y, isWall=false, isStart=false, isEnd=false, isVisited=false,ispath=false) {
        this.x = x;
        this.y = y;
        this.isWall = isWall;
        this.isStart = isStart;
        this.isEnd = isEnd;
        this.isVisited = isVisited;
        this.isPath = ispath;
    }
    toggleWall() {

    }
    
    reset(){

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