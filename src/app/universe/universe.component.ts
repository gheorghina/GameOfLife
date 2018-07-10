import { Component } from '@angular/core';
import { Cell } from '../contracts/cell.model';

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.css']
})

export class UniverseComponent {
  gosperglidergun = [];
  universeSize = 40;
  cellSize = 10;
  slimGeneration = [];
  generationNumbers = [];
  slimGenerationSize = this.generateContainerSize(this.universeSize);

  constructor() {
    this.initializeUniverse(this.universeSize);
  }

  initializeUniverse(givenSize) {
    this.universeSize = givenSize;
    this.slimGenerationSize = this.generateContainerSize(givenSize);
    this.slimGeneration = [];
    this.updateGenerationNumbers(givenSize);
  }

  setGosperGliderGunState(fileData) {
    this.gosperglidergun = fileData;
  }

  loadFromGosperGliderGunState() {    
    this.setFromSlimGeneration(this.gosperglidergun);
  }

  setCell(row, col) {
    let indexOfPair = this.indexOfPair(this.slimGeneration, row, col);

    if (indexOfPair >= 0) {
      this.slimGeneration.splice(indexOfPair, 1);
      return;
    }

    this.slimGeneration.push(new Cell(row, col, true));
  }

  hasActiveCell(row, col) {
    let cellIndex = this.indexOfPair(this.slimGeneration, row, col);
    return cellIndex >= 0;
  }

  evolve() {

    let oldGeneration = this.clone();
    let newGenerationSize = this.universeSize;
    let newGeneration = [];

    for (let row = 0; row < newGenerationSize; row++) {
      for (let column = 0; column < newGenerationSize; column++) {

        let idx = this.indexOfPair(oldGeneration, row, column);
        let cell = new Cell(row, column, idx >= 0);
        cell.evolveFrom(oldGeneration);
        if (cell.getIsAlive()) {
          newGeneration.push(cell);
        }
      }

      this.slimGeneration = [];
      this.slimGeneration = newGeneration;
    }
  }

  private haveActiveCellOnMargin(oldGeneration) {
    //TBD for dynamic growth
  }

  clone() {
    return this.slimGeneration.slice();
  }

  slimDown() {
    let newGeneration = [];
    let index = 0;

    for (let i = 0; i < this.slimGeneration.length; i++) {
      newGeneration[index] = {
        x: this.slimGeneration[i].x,
        y: this.slimGeneration[i].y
      };
      index++;
    }

    return newGeneration;
  }

  indexOfPair(generation, x, y) {
    for (let i = 0; i < generation.length; i++) {
      if (generation[i].x == x && generation[i].y == y) {
        return i;
      }
    }
    return -1;
  }

  private setFromSlimGeneration(slimData) {

    const dataSize = Math.max(this.getMaxOfSlimData(slimData), this.universeSize);
    this.universeSize = dataSize;
    this.slimGenerationSize = this.generateContainerSize(dataSize);

    let newGeneration = [];
    for (let i = 0; i < slimData.length; i++) {
      newGeneration.push(new Cell(slimData[i].x, slimData[i].y, true));
    }

    this.updateGenerationNumbers(dataSize);

    this.slimGeneration = [];
    this.slimGeneration = newGeneration;
  }

  private getMaxOfSlimData(slimData) {
    let x = 0;
    let y = 0;

    for (let i = 0; i < slimData.length; i++) {
      x = Math.max(slimData[i].x, x);
      y = Math.max(slimData[i].y, y);
    }

    return Math.max(x, y) + 1;
  }

  private generateContainerSize(size) {
    return (this.cellSize * size) + (2 * size) + 'px';
  }

  private updateGenerationNumbers(givenSize) {
    this.generationNumbers = [];

    for (var i = 0; i < givenSize; i++) {
      this.generationNumbers[i] = [];
      for (var j = 0; j < givenSize; j++) {
        this.generationNumbers[i][j] = {x:i, y:j};
      }
    }
  }   
}

