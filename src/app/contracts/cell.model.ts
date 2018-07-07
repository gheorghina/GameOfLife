
export class Cell {
    isAlive: boolean;
    x: number;
    y: number;
    neighbours = [];

    constructor(x, y, isAlive=false) {
        this.x = x;
        this.y = y;
        this.isAlive = isAlive;
    }

    getIsAlive() {
        return this.isAlive;
    }

    //temp
    setIsAlive(value) {
        this.isAlive = true;
    }

    changeCellState() {
        this.isAlive =  !this.isAlive;
    }

    //getneighbours

}
