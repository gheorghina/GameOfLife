import { TestBed, async } from '@angular/core/testing';
import { Cell } from './cell.model';

describe('Cell', () => {

  it('should create the cell', async(() => {
    var cell =  new Cell(0,0, true);     
    expect(cell).toBeTruthy();
    expect(cell).toBeTruthy();
  }));

  it('should change the cell state', async(() => {
    var cell =  new Cell(0,0, false); 

    cell.changeCellState();

    expect(cell.getIsAlive()).toBeTruthy();
  }));


});
