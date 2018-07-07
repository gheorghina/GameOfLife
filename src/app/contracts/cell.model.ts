
export class Cell {
    private isAlive: boolean;
    private x: number;
    private y: number;
    private neighbours = [];

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isAlive = false;
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
