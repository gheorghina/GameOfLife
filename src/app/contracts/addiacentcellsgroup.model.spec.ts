import { TestBed, async } from '@angular/core/testing';
import { AddiacentCellsGroup } from './addiacentcellsgroup.model';
import { Cell } from './cell.model';

describe('AddiacentCellsGroup', () => {   

    it('should compute correctly the limits', async(() => { 
    
        var slimUniverse = new AddiacentCellsGroup(20);
        slimUniverse.addCell(new Cell(3, 3, true));
        slimUniverse.addCell(new Cell(4, 1, true));
        slimUniverse.addCell(new Cell(4, 2, true));
        slimUniverse.addCell(new Cell(4, 3, true));
        slimUniverse.addCell(new Cell(5, 2, true));

        expect(slimUniverse.getMinX()).toBe(2);
        expect(slimUniverse.getMinY()).toBe(0);
        expect(slimUniverse.getMaxX()).toBe(6);
        expect(slimUniverse.getMaxY()).toBe(4);
    }));
});