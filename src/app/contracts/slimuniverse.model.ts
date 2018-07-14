import { Cell } from "./cell.model";

export class SlimUniverse {
    min: Cell;
    max: Cell;

    constructor(minCell, maxCell) {
        this.min = minCell;
        this.max = maxCell;
    }
}
