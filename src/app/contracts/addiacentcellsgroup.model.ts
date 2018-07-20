
export class AddiacentCellsGroup {
    cellsGroup = [];
    seenCells = [];
    private universeSize;
    private minX;
    private minY;
    private maxX = 0;
    private maxY = 0;

    constructor(universeSize) {
        this.universeSize = universeSize;
    }

    addCell(cell) {

        if (cell == undefined || this.seenCells[this.getKey(cell.x, cell.y)]) {
            return;
        }

        this.cellsGroup.push(cell);
        this.updateLimits(cell);
        this.seenCells[this.getKey(cell.x, cell.y)] = true;
    }

    getMinX() {
        return (this.minX > 0) ? (this.minX - 1) : this.minX;
    }

    getMinY() {
        return (this.minY > 0) ? (this.minY - 1) : this.minY;
    }

    getMaxX() {
        return (this.maxX < this.universeSize) ? (this.maxX + 1) : this.maxX;
    }

    getMaxY() {
        return (this.maxY < this.universeSize) ? (this.maxY + 1) : this.maxY;
    }

    private updateLimits(newCell) {

        this.minX = (this.minX === undefined) ? this.cellsGroup[0].x : this.minX;
        this.minY = (this.minY === undefined) ? this.cellsGroup[0].y : this.minY;

        this.minX = Math.min(newCell.x, this.minX);
        this.minY = Math.min(newCell.y, this.minY);
        this.maxX = Math.max(newCell.x, this.maxX);
        this.maxY = Math.max(newCell.y, this.maxY);
    }

    private getKey(x, y){
        return x + '-' + y;
    }
}
