import { TestBed, async } from '@angular/core/testing';
import { UniverseComponent } from './universe.component';
import { Cell } from './../contracts/cell.model';


describe('Universe', () => {

  it('should create the UniverseComponent', async(() => {
      var universe = new UniverseComponent();
      expect(universe).toBeTruthy();
  }));

  it('Universe with 1 single active cell should evolve to a univers with no active cell', async(() => {
    var universe = new UniverseComponent();
    universe.slimGeneration.push(new Cell(0, 0, true)); 
    universe.evolve();

    let result = universe.indexOfPair(universe.slimGeneration, 0,0);

    expect(result).toBe(-1);
  }));

  it('Universe with disabled cell & 3 active neighbors should be reborned', async(() => {
    var universe = new UniverseComponent();

    universe.slimGeneration.push(new Cell(0, 0, true));
    universe.slimGeneration.push(new Cell(0, 2, true));
    universe.slimGeneration.push(new Cell(2, 0, true));

    universe.evolve();

    let result = universe.indexOfPair(universe.slimGeneration, 1,1);

    expect(result).toBeGreaterThanOrEqual(0);
  }));

  it('Universe with active cell & 4 active neighbors should evolve to a univers with the active cell disabled', async(() => {
    var universe = new UniverseComponent();

    universe.slimGeneration.push(new Cell(1, 1, true));
    universe.slimGeneration.push(new Cell(0, 0, true));
    universe.slimGeneration.push(new Cell(0, 2, true));
    universe.slimGeneration.push(new Cell(2, 0, true));
    universe.slimGeneration.push(new Cell(2, 2, true));

    universe.evolve();

    let result = universe.indexOfPair(universe.slimGeneration, 1,1);

    expect(result).toBe(-1);
  }));

  it('Universe with active cell & 2 active neighbors should be kept alive', async(() => {
    var universe = new UniverseComponent();

    universe.slimGeneration.push(new Cell(1, 1, true));
    universe.slimGeneration.push(new Cell(0, 0, true));
    universe.slimGeneration.push(new Cell(2, 0, true));

    universe.evolve();

    let result1 = universe.indexOfPair(universe.slimGeneration, 1,1);
    let result2 = universe.indexOfPair(universe.slimGeneration, 1,0);
    let result3 = universe.indexOfPair(universe.slimGeneration, 0,0);

    expect(result1).toBeGreaterThanOrEqual(0);
    expect(result2).toBeGreaterThanOrEqual(0);
    expect(result3).toBe(-1);
  }));

  it('Universe with active cell & 3 active neighbors should be kept alive', async(() => {
    var universe = new UniverseComponent();

    universe.slimGeneration.push(new Cell(1, 1, true));
    universe.slimGeneration.push(new Cell(0, 0, true));
    universe.slimGeneration.push(new Cell(0, 2, true));
    universe.slimGeneration.push(new Cell(2, 0, true));

    universe.evolve();

    let result = universe.indexOfPair(universe.slimGeneration, 1,1);

    expect(result).toBeGreaterThanOrEqual(0);
  }));  

});

