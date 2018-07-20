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
        let oldGeneration = new OldGeneration();
        var universe = oldGeneration.getOldGenerationForReproduction();
        let cell = oldGeneration.cellOfPair(universe, 0, 0);

        cell.evolveFrom(universe);

        expect(cell.getIsAlive()).toBeTruthy();
    }));

    it('with 2 alive neighbours should be kept alive', async(() => {
        let oldGeneration = new OldGeneration();
        var universe = oldGeneration.getOldGenerationWith2AliveNeighbours();
        let cell = oldGeneration.cellOfPair(universe, 1, 1);

        cell.evolveFrom(universe);

        expect(cell.getIsAlive()).toBeTruthy();
    }));

    it('with 3 alive neighbours should be kept alive', async(() => {
        let oldGeneration = new OldGeneration();
        var universe = oldGeneration.getOldGenerationWith3AliveNeighbours();
        let cell = oldGeneration.cellOfPair(universe, 0, 0);

        cell.evolveFrom(universe);

        expect(cell.getIsAlive()).toBeTruthy();
    }));


    it('with less than 2 alive neighbours should die', async(() => {
        let oldGeneration = new OldGeneration();
        var universe = oldGeneration.getOldGenerationWithLessThan2AliveNeighbours();
        let cell = oldGeneration.cellOfPair(universe, 0, 0);

        cell.evolveFrom(universe);

        expect(cell.getIsAlive()).toBeFalsy();
    }));

    it('with more than 3 alive neighbours should die', async(() => {
        let oldGeneration = new OldGeneration();
        var universe = oldGeneration.getOldGenerationWithMoreThan3AliveNeighbours();
        let cell = oldGeneration.cellOfPair(universe, 1, 1);

        cell.evolveFrom(universe);

        expect(cell.getIsAlive()).toBeFalsy();
    }));

});

export class OldGeneration {
    size = 3;

    constructor() {
    }

    cellOfPair(generation, x, y) {
        for (let i = 0; i < generation.length; i++) {
            if (generation[i].x == x && generation[i].y == y) {
                return generation[i];
            }
        }
        return new Cell(x, y);
    }

    getOldGenerationForReproduction() {

        let generation = [];

        generation.push(new Cell(1, 1, true));
        generation.push(new Cell(0, 0, true));
        generation.push(new Cell(0, 1, true));
        generation.push(new Cell(1, 0, true));        

        return generation;
    }

    getOldGenerationWith2AliveNeighbours() {
        let generation = [];

        generation.push(new Cell(0, 0, true));
        generation.push(new Cell(1, 1, true));
        generation.push(new Cell(2, 0, true));

        return generation;
    }

    getOldGenerationWith3AliveNeighbours() {
        let generation = [];

        generation.push(new Cell(0, 0, true));
        generation.push(new Cell(0, 1, true));
        generation.push(new Cell(1, 0, true));
        generation.push(new Cell(1, 1, true));

        return generation;
    }

    getOldGenerationWithLessThan2AliveNeighbours() {
        let generation = [];

        generation.push(new Cell(0, 0, true));
        generation.push(new Cell(0, 1, true));

        return generation;
    }

    getOldGenerationWithMoreThan3AliveNeighbours() {
        let generation = [];

        generation.push(new Cell(1, 1, true));
        generation.push(new Cell(0, 0, true));
        generation.push(new Cell(0, 2, true));
        generation.push(new Cell(2, 0, true));
        generation.push(new Cell(2, 2, true));

        return generation;
    }
}
