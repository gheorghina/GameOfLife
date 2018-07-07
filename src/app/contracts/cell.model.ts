import { Position } from '../contracts/position.model';

export class Cell {
    private isAlive: boolean;
    private x: number;
    private y: number;
    private neighbours = [new Position(this.x - 1, this.y - 1),
    new Position(this.x - 1, this.y), new Position(this.x - 1, this.y + 1), new Position(this.x, this.y - 1),
    new Position(this.x, this.y + 1), new Position(this.x + 1, this.y - 1), new Position(this.x + 1, this.y + 1),
    new Position(this.x + 1, this.y + 1)];

    constructor(x, y, isAlive = false) {
        this.x = x;
        this.y = y;
        this.isAlive = isAlive;
    }

    getIsAlive() {
        return this.isAlive;
    }

    changeCellState() {
        this.isAlive = !this.isAlive;
    }

    evolveFrom(oldGeneration) {
        var oldAliveNeighboursCount = this.getAliveNeighboursCount(oldGeneration);
        this.evolveState(oldAliveNeighboursCount);
    }

    private evolveState(oldAliveNeighboursCount) {
        if (!this.isAlive && oldAliveNeighboursCount == 3) {
            this.isAlive = true;
            return;
        }

        if (this.isAlive && (oldAliveNeighboursCount < 2 || oldAliveNeighboursCount > 3)) {
            this.isAlive = false;
            return;
        }

        if (this.isAlive && (oldAliveNeighboursCount == 2 || oldAliveNeighboursCount == 3)) {
            this.isAlive = true;
        }
    }

    private getAliveNeighboursCount(oldGeneration) {

        let count = 0;
        for (var i = 0; i < this.neighbours.length; i++) {
            var item = this.neighbours[i];
            if (!isNaN(item.x) && !isNaN(item.y) && item.x !== undefined && item.y !== undefined) {
                if (oldGeneration[item.x][item.y].isAlive) {
                    count++;
                }
            }
        }

        console.log(count);
        return count;
    }

}