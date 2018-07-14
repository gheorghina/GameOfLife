import { Component } from '@angular/core';
import { Cell } from '../contracts/cell.model';
import { SlimUniverse } from '../contracts/slimuniverse.model';

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.css']
})

export class UniverseComponent {
  gosperglidergun = []; 
  universeSize = 40;
  universeNumbers = []; 
  slimUniverses = [];
  cellSize = 10;
  generation = [];  
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
    let indexOfPair = this.indexOfPair(this.generation, row, col);

    if (indexOfPair >= 0) {
      this.generation.splice(indexOfPair, 1);
      return;
    }

    this.generation.push(new Cell(row, col, true)); 
  }

  hasActiveCell(row, col) {
    let cellIndex = this.indexOfPair(this.generation, row, col);
    return cellIndex >= 0;
  }

  evolve() {

    let universeMarginIsHit = false;
    let oldGeneration = this.clone();
    let newGenerationSize = this.universeSize;
    let newGeneration = [];

    for (let row = 0; row < newGenerationSize; row++) {
      for (let column = 0; column < newGenerationSize; column++) {

        let idx = this.indexOfPair(oldGeneration, row, column);
        let cell = new Cell(row, column, idx >= 0);

        cell.evolveFrom(oldGeneration);
        
        if (cell.getIsAlive()) {
          universeMarginIsHit = (row == this.universeSize - 1) || (column == this.universeSize - 1);
          newGeneration.push(cell);
        }
      }

      if (universeMarginIsHit) {
        let increasedSize = ++this.universeSize;
        this.init(increasedSize);
      }   

      this.generation = newGeneration;     
    }
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

  indexOfPair(generation, x, y) {
    for (let i = 0; i < generation.length; i++) {
      if (generation[i].x == x && generation[i].y == y) {
        return i;
      }
    }
    return -1;
  }

  private setFromGeneration(slimData) {

    const dataSize = Math.max(this.getMaxOfSlimData(slimData), this.universeSize);
    this.universeSize = dataSize;
    this.generationSize = this.generateContainerSize(dataSize);

    let newGeneration = [];
    for (let i = 0; i < slimData.length; i++) {
      newGeneration.push(new Cell(slimData[i].x, slimData[i].y, true));
    }

    this.updateGenerationNumbers(dataSize);

    this.generation = [];
    this.generation = newGeneration;
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
    this.updateGenerationNumbers(givenSize);
  }
}

