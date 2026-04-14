
class grid {
    constructor(width, height, cells=[[]]) {
        this.width = width;
        this.height = height;
        this.cells = cells;
    }
    buildGrid() {

    }
    getCell(x, y) {

    }
    resetGrid() {

    }
    getneighbors(cell) {

    }
}

class cell{
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


}


class BFS extends searchAlgorithm{


}

class UI {


}