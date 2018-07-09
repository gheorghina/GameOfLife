import { Component } from '@angular/core';
import { Cell } from '../contracts/cell.model';
import { ICellResponse } from '../contracts/cellresponse.model';

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.css']
})

export class UniverseComponent {
  generation = [];
  optimizedGeneration = [];
  gosperglidergun = [];
  initialUniverseSize = 40;
  cellSize = 10;
  universeContainerSize = this.generateContainerSize(this.initialUniverseSize);

  constructor() {
    this.initializeUniverse(this.initialUniverseSize);
  }

  initializeUniverse(givenSize) {
    
    this.universeContainerSize = this.generateContainerSize(givenSize);

    this.generation = this.createNewGeneration(givenSize,
      (row, col) => { return new Cell(row, col, false) });
  }

  setGosperGliderGunState(fileData) {
    this.gosperglidergun = fileData;
  }

  loadFromGosperGliderGunState() {
    this.generation = this.readFromSlimGeneration(this.gosperglidergun);
  }

  evolve() {

    let oldGeneration = this.clone();
    let newGeneration = this.createNewGeneration(oldGeneration.length,
      (row, col) => {
        var cell = new Cell(row, col, oldGeneration[row][col].getIsAlive());
        cell.evolveFrom(oldGeneration);

        return cell;
      });

    this.generation = newGeneration;
  }

  clone() {
    return this.generation.slice();
  }

  slimDown() {
    let newGeneration = [];
    let index = 0;

    for (let row = 0; row < this.generation.length; row++) {
      for (let column = 0; column < this.generation.length; column++) {
        if (this.generation[row][column].getIsAlive()) {
          newGeneration[index] = {
            x: row,
            y: column
          };
          index++;
        }
      }
    }

    return newGeneration;
  }

  private readFromSlimGeneration(slimData) {

    const dataSize = Math.max(this.getMaxOfSlimData(slimData), this.generation.length);
    this.universeContainerSize = this.generateContainerSize(dataSize);

    let newGeneration = this.createNewGeneration(dataSize,
      (row, col) => { return new Cell(row, col, this.doesSlimDataContainPair(slimData, row, col)) });

    return newGeneration;
  }

  private doesSlimDataContainPair(slimData, x, y) {
    for (let i = 0; i < slimData.length; i++) {
      if (slimData[i].x == x && slimData[i].y == y) {
        return true;
      }
    }
    return false;
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

  private getNewGeneration(fileData) {
    const dataSize = fileData.length;
    let newGeneration = this.createNewGeneration(dataSize,
      (row, col) => { return new Cell(row, col, fileData[row][col].isAlive) });

    return newGeneration;
  }

  private createNewGeneration(size, createCell) {
    let newGeneration = [];

    for (let row = 0; row < size; row++) {
      newGeneration[row] = [];
      for (let column = 0; column < size; column++) {
        newGeneration[row][column] = createCell(row, column);
      }
    }

    return newGeneration;
  }

  private generateContainerSize(size) {
    return (this.cellSize * size) + (2 * size) + 'px';
  }
}

