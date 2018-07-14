import { Position } from './position.model';

export class Cell {
    private isAlive: boolean;
    x: number;
    y: number;
    private neighbours;

    constructor(x, y, isAlive = false) {
        this.x = x;
        this.y = y;
        this.isAlive = isAlive;

        this.neighbours = [new Position(this.x - 1, this.y - 1),
        new Position(this.x - 1, this.y), new Position(this.x - 1, this.y + 1), new Position(this.x, this.y - 1),
        new Position(this.x, this.y + 1), new Position(this.x + 1, this.y - 1), new Position(this.x + 1, this.y),
        new Position(this.x + 1, this.y + 1)];
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
    }

    private getAliveNeighboursCount(oldGeneration) {

        let count = 0;

        for (var i = 0; i < oldGeneration.length; i++) {
            for(var n=0; n < this.neighbours.length; n++){
                if (this.neighbours[n].x == oldGeneration[i].x && this.neighbours[n].y == oldGeneration[i].y) {
                    count++;
                }   
            }          
        }       

        return count;
    }

}