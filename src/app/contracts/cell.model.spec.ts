import { TestBed, async } from '@angular/core/testing';
import { Cell } from './cell.model';

describe('Cell', () => {

    it('should create the cell', async(() => {
        var cell = new Cell(0, 0, true);
        expect(cell).toBeTruthy();
    }));

    it('should change the cell state', async(() => {
        var cell = new Cell(0, 0, false);

        cell.changeCellState();

        expect(cell.getIsAlive()).toBeTruthy();
    }));

    it('if dead with 3 alive neighbours should be reborned', async(() => {
        var universe = new OldGeneration().getOldGenerationForRproduction();
        let cell = universe[0][0];

        cell.evolveFrom(universe); 

        expect(cell.getIsAlive()).toBeTruthy();
    }));

    it('with 2 alive neighbours should be kept alive', async(() => {        
        var universe = new OldGeneration().getOldGenerationWith2AliveNeighbours();
        let cell = universe[0][0];

        cell.evolveFrom(universe);

        expect(cell.getIsAlive()).toBeTruthy();
    }));

    it('with 3 alive neighbours should be kept alive', async(() => {
        var universe = new OldGeneration().getOldGenerationWith3AliveNeighbours();
        let cell = universe[0][0];

        cell.evolveFrom(universe);

        expect(cell.getIsAlive()).toBeTruthy();
    }));

    
    it('with less than 2 alive neighbours should die', async(() => {
        var universe = new OldGeneration().getOldGenerationWithLessThan2AliveNeighbours();
        let cell = universe[0][0];

        cell.evolveFrom(universe); 

        expect(cell.getIsAlive()).toBeFalsy();
    }));

    it('with more than 3 alive neighbours should die', async(() => {
        var universe = new OldGeneration().getOldGenerationWithMoreThan3AliveNeighbours();
        let cell = universe[1][1];

        cell.evolveFrom(universe); 

        expect(cell.getIsAlive()).toBeFalsy();
    }));

});

export class OldGeneration {
    generation = [];
    size = 3;

    constructor() {
        for (let row = 0; row < this.size; row++) {
            this.generation[row] = [];
            for (let column = 0; column < this.size; column++) {
                this.generation[row][column] = new Cell(0, 0, false);
            }
        }
    }

    getOldGenerationForRproduction() {
        let oldGeneration = this.generation.slice();

        oldGeneration[0][0].changeCellState();
        oldGeneration[0][1].changeCellState();
        oldGeneration[1][0].changeCellState();
        oldGeneration[1][1].changeCellState();

        return oldGeneration;
    }

    getOldGenerationWith2AliveNeighbours() {
        let oldGeneration = this.generation.slice();

        oldGeneration[0][0].changeCellState();
        oldGeneration[1][0].changeCellState();
        oldGeneration[1][1].changeCellState();

        return oldGeneration;
    }

    getOldGenerationWith3AliveNeighbours() {
        let oldGeneration = this.generation.slice();

        oldGeneration[0][0].changeCellState();
        oldGeneration[0][1].changeCellState();
        oldGeneration[1][0].changeCellState();
        oldGeneration[1][1].changeCellState();

        return oldGeneration;
    }

    getOldGenerationWithLessThan2AliveNeighbours() {
        let oldGeneration = this.generation.slice();

        oldGeneration[0][0].changeCellState();
        oldGeneration[0][1].changeCellState();

        return oldGeneration;
    }

    getOldGenerationWithMoreThan3AliveNeighbours() {
        let oldGeneration = this.generation.slice();

        oldGeneration[1][1].changeCellState();
        oldGeneration[0][0].changeCellState();
        oldGeneration[0][2].changeCellState();
        oldGeneration[2][0].changeCellState();
        oldGeneration[2][2].changeCellState();

        return oldGeneration;
    }
}
