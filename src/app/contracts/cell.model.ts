
export class Cell {
    private isAlive: boolean;
    private x: number;
    private y: number;
    private neighbours = [];

    constructor(x, y, isAlive=false) {
        this.x = x;
        this.y = y;
        this.isAlive = isAlive;
    }

    getIsAlive() {
        return this.isAlive;
    }

    changeCellState() {
        this.isAlive =  !this.isAlive;
    }

    //getneighbours

}
