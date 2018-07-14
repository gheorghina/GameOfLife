import { Component } from '@angular/core';
import { Cell } from '../contracts/cell.model';
import { AddiacentCellsGroup } from '../contracts/addiacentcellsgroup.model';

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.css']
})

export class UniverseComponent {
  gosperglidergun = [];
  universeSize = 40;
  universeNumbers = [];
  cellSize = 10;
  private generation = [];
  seenCellInGeneration = [];
  generationSize = this.generateContainerSize(this.universeSize);

  constructor() {
    this.initializeUniverse(this.universeSize);
  }

  initializeUniverse(givenSize) {
    this.init(givenSize);
  }

  setGosperGliderGunState(fileData) {
    this.gosperglidergun = fileData;
  }

  loadFromGosperGliderGunState() {
    this.setFromGeneration(this.gosperglidergun);
  }

  setCell(row, col) {
    if (this.seenCellInGeneration[this.getKey(row, col)]) {
      this.removePairFromGeneration(this.generation, row, col);
      this.seenCellInGeneration[this.getKey(row, col)] = false;
      return;
    }

    let newCell = new Cell(row, col, true);
    this.generation.push(newCell);
    this.seenCellInGeneration[this.getKey(row, col)] = true;
  }

  hasActiveCell(row, col) {
    if (this.seenCellInGeneration[this.getKey(row, col)]) {
      return true;
    }
    return false;
  }

  evolve() {

    if (this.generation.length == 0) {
      return;
    }

    let universeMarginIsHit = false;
    let oldGeneration = this.clone();
    let newGeneration = [];
    let addiacentCellGroups = this.getAddiacentGroups(oldGeneration);
    let seenCellsInNewGeneration = [];

    console.log(addiacentCellGroups);

    for (var i = 0; i < addiacentCellGroups.length; i++) {

      let slimGroup = addiacentCellGroups[i];
      
      for (let row = slimGroup.getMinX(); row <= slimGroup.getMaxX(); row++) {
        for (let col = slimGroup.getMinY(); col <= slimGroup.getMaxY(); col++) {

         let cell = new Cell(row, col, this.seenCellInGeneration[this.getKey(row, col)]);

          cell.evolveFrom(oldGeneration);

          if (cell.getIsAlive() && !seenCellsInNewGeneration[this.getKey(row, col)]) {
            universeMarginIsHit = (row == this.universeSize - 1) || (col == this.universeSize - 1);
            newGeneration.push(cell);
            seenCellsInNewGeneration[this.getKey(cell.x, cell.y)] = true;
          }
        }
      }

    }

    if (universeMarginIsHit) {
      let increasedSize = ++this.universeSize;
      this.init(increasedSize);
    }

    this.generation = newGeneration;
    this.seenCellInGeneration = seenCellsInNewGeneration;
  }

  clone() {
    return this.generation.slice();
  }

  slimDown() {
    let newGeneration = [];
    let index = 0;

    for (let i = 0; i < this.generation.length; i++) {
      newGeneration[index] = {
        x: this.generation[i].x,
        y: this.generation[i].y
      };
      index++;
    }

    return newGeneration;
  }

  getAddiacentGroups(generation = this.generation, groupsCount = 0, addiacentCellsGroups = []) {

    let generationClone = generation.slice();
    let cell = generationClone.pop();

    addiacentCellsGroups[groupsCount] = new AddiacentCellsGroup(this.universeSize);
    addiacentCellsGroups[groupsCount].addCell(cell);

    this.computeAddiacentCells(generationClone, cell, addiacentCellsGroups[groupsCount]);

    if (generationClone.length > 0) {
      this.getAddiacentGroups(generationClone, ++groupsCount, addiacentCellsGroups);
    }

    return addiacentCellsGroups;
  }

  private getKey(x, y) {    
    return '' + x  + '-' + y;
  }

  private computeAddiacentCells(generation, cell, group) {

    let addiacentCells = [];

    for (var i = 0; i < generation.length; i++) {
      for (var n = 0; n < cell.neighbours.length; n++) {
        if (generation[i] && (cell.neighbours[n].x == generation[i].x && cell.neighbours[n].y == generation[i].y)) {
          let extractedCell = generation.splice(i, 1)[0];

          if (extractedCell) {
            group.addCell(extractedCell);
            addiacentCells.push(extractedCell);
          }
        }
      }
    }

    if (generation.length > 0) {
      for (var i = 0; i < addiacentCells.length; i++) {
        this.computeAddiacentCells(generation, addiacentCells[i], group);
      }
    }
  }

  private removePairFromGeneration(generation, x, y) {
    for (let i = 0; i < generation.length; i++) {
      if (generation[i].x == x && generation[i].y == y) {
        this.generation.splice(i, 1);
      }
    }
  }

  private setFromGeneration(data) {

    const dataSize = Math.max(this.getMaxOfData(data), this.universeSize);
    this.universeSize = dataSize;
    this.generationSize = this.generateContainerSize(dataSize);
    this.seenCellInGeneration = [];

    let newGeneration = [];
    for (let i = 0; i < data.length; i++) {
      let cell = new Cell(data[i].x, data[i].y, true);
      newGeneration.push(cell);
      this.seenCellInGeneration[this.getKey(cell.x, cell.y)] = true;
    }

    this.updateGenerationNumbers(dataSize);

    this.generation = [];
    this.generation = newGeneration;
  }

  private getMaxOfData(data) {
    let x = 0;
    let y = 0;

    for (let i = 0; i < data.length; i++) {
      x = Math.max(data[i].x, x);
      y = Math.max(data[i].y, y);
    }

    return Math.max(x, y) + 1;
  }

  private generateContainerSize(size) {
    return (this.cellSize * size) + (2 * size) + 'px';
  }

  private updateGenerationNumbers(givenSize) {
    this.universeNumbers = [];

    for (var i = 0; i < givenSize; i++) {
      this.universeNumbers[i] = [];
      for (var j = 0; j < givenSize; j++) {
        this.universeNumbers[i][j] = { x: i, y: j };
      }
    }
  }

  private init(givenSize) {
    this.universeSize = givenSize;
    this.generationSize = this.generateContainerSize(givenSize);
    this.generation = [];
    this.seenCellInGeneration = [];
    this.updateGenerationNumbers(givenSize);
  }
}

