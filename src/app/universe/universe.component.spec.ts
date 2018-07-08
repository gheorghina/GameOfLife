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
    universe.generation[0][0].changeCellState();
    universe.evolve();

    expect(universe.generation[0][0].getIsAlive()).toBeFalsy();
  }));

  it('Universe with disabled cell & 3 active neighbors should be reborned', async(() => {
    var universe = new UniverseComponent();
    
    universe.generation[0][0].changeCellState();
    universe.generation[0][2].changeCellState();
    universe.generation[2][0].changeCellState();

    universe.evolve();

    expect(universe.generation[1][1].getIsAlive()).toBeTruthy();
  }));

  it('Universe with active cell & 4 active neighbors should evolve to a univers with the active cell disabled', async(() => {
    var universe = new UniverseComponent();

    universe.generation[1][1].changeCellState();
    universe.generation[0][0].changeCellState();
    universe.generation[0][2].changeCellState();
    universe.generation[2][0].changeCellState();
    universe.generation[2][2].changeCellState();

    universe.evolve();

    expect(universe.generation[1][1].getIsAlive()).toBeFalsy();
  }));

  it('Universe with active cell & 2 active neighbors should be kept alive', async(() => {
    var universe = new UniverseComponent();

    universe.generation[1][1].changeCellState();
    universe.generation[0][0].changeCellState();
    universe.generation[0][2].changeCellState();

    universe.evolve();

    expect(universe.generation[1][1].getIsAlive()).toBeTruthy();
  }));

  it('Universe with active cell & 3 active neighbors should be kept alive', async(() => {
    var universe = new UniverseComponent();

    universe.generation[1][1].changeCellState();
    universe.generation[0][0].changeCellState();
    universe.generation[0][2].changeCellState();
    universe.generation[2][0].changeCellState();

    universe.evolve();

    expect(universe.generation[1][1].getIsAlive()).toBeTruthy();
  }));  

});

export class OldGeneration {
  universe: UniverseComponent;

  constructor() {
    this.universe = new UniverseComponent();
  }

  getUniverseWithSingleCellActive() {
      this.universe.generation[0][0].changeCellState();

      return this.universe;
  }  
}

