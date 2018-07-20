import { TestBed, async } from '@angular/core/testing';
import { UniverseComponent } from './universe.component';
import { Cell } from '../contracts/cell.model';


describe('Universe', () => {

  it('should create the UniverseComponent', async(() => {
      var universe = new UniverseComponent();
      expect(universe).toBeTruthy();
  }));

  it('Single group of addiacent cells count shall be 5', async(() => {
    var universe = new UniverseComponent(); 

    universe.setCell(3,3);
    universe.setCell(4,1);
    universe.setCell(4,2);
    universe.setCell(4,3);
    universe.setCell(5,2);
     
    let result = universe.getAddiacentGroups();
    
    expect(result.length).toBe(1);
    expect(result[0].cellsGroup.length).toBe(5);
    expect(result[0].getMinX()).toBe(2);
    expect(result[0].getMinY()).toBe(0);
    expect(result[0].getMaxX()).toBe(6);
    expect(result[0].getMaxY()).toBe(4);
  }));

  it('Groups of addiacent cells count shall be 2', async(() => {
    var universe = new UniverseComponent();
    universe.setCell(3,3);
    universe.setCell(4,1);
    universe.setCell(4,2);
    universe.setCell(4,3);
    universe.setCell(5,2);
    universe.setCell(7,7);
    universe.setCell(8,6);
    universe.setCell(8,7);
    universe.setCell(9,7); 
     
    let result = universe.getAddiacentGroups();
    
    expect(result.length).toBe(2);
    expect(result[0].cellsGroup.length).toBe(4);
    expect(result[0].getMinX()).toBe(6);
    expect(result[0].getMinY()).toBe(5);
    expect(result[0].getMaxX()).toBe(10);
    expect(result[0].getMaxY()).toBe(8);
    expect(result[1].cellsGroup.length).toBe(5);
    expect(result[1].getMinX()).toBe(2);
    expect(result[1].getMinY()).toBe(0);
    expect(result[1].getMaxX()).toBe(6);
    expect(result[1].getMaxY()).toBe(4);
  }));


  it('Universe with 1 single active cell should evolve to a univers with no active cell', async(() => {
    var universe = new UniverseComponent();
    universe.setCell(0,0);
    universe.evolve();

    let result = universe.seenCellInGeneration['0-0'];

    expect(result).toBeFalsy();
  }));

  it('Universe with disabled cell & 3 active neighbors should be reborned', async(() => {
    var universe = new UniverseComponent();

    universe.setCell(0,0);
    universe.setCell(0,2);
    universe.setCell(2,0);

    universe.evolve();

    let result = universe.seenCellInGeneration['1-1'];

    expect(result).toBeTruthy();
  }));

  it('Universe with active cell & 4 active neighbors should evolve to a univers with the active cell disabled', async(() => {
    var universe = new UniverseComponent();

    universe.setCell(1,1);
    universe.setCell(0,0);
    universe.setCell(0,2);
    universe.setCell(2,0);
    universe.setCell(2,2);

    universe.evolve();

    let result = universe.seenCellInGeneration['1-1'];

    expect(result).toBeFalsy();
  }));

  it('Universe with active cell & 2 active neighbors should be kept alive', async(() => {
    var universe = new UniverseComponent();

    universe.setCell(1,1);
    universe.setCell(0,0);
    universe.setCell(2,0);

    universe.evolve();

    let result1 = universe.seenCellInGeneration['1-1'];
    let result2 = universe.seenCellInGeneration['1-0'];
    let result3 = universe.seenCellInGeneration['0-0'];

    expect(result1).toBeTruthy();
    expect(result2).toBeTruthy();
    expect(result3).toBeFalsy();
  }));

  it('Universe with active cell & 3 active neighbors should be kept alive', async(() => {
    var universe = new UniverseComponent();

    universe.setCell(1,1);
    universe.setCell(0,0);
    universe.setCell(0,2);
    universe.setCell(2,0);

    universe.evolve();

    let result = universe.seenCellInGeneration['1-1'];

    expect(result).toBeTruthy();
  }));  

});

