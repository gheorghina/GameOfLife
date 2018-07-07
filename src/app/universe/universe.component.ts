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
  gosperglidergun = [];
  universeSize = 40;
  cellSize = 10;
  universeContainerSize = (this.cellSize * this.universeSize) + (2 * this.universeSize) + 'px';

  constructor() {
    this.initializeUniverse();
  }

  initializeUniverse() {

    this.generation = [];

    for (let row = 0; row < this.universeSize; row++) {
      this.generation[row] = [];
      for (let column = 0; column < this.universeSize; column++) {
        this.generation[row][column] = new Cell(row, column, false);
      }
    }
  }

  setGosperGliderGunState(fileData){
    this.gosperglidergun = this.getNewGeneration(fileData);
  }

  loadFromGosperGliderGunState() {

    this.generation = this.getNewGeneration(this.gosperglidergun);
  }

  evolve() {
    console.log('evolving the universe');

    let oldGeneration = this.clone();    

    this.generation = [];
    for (let row = 0; row < this.universeSize; row++) {
      this.generation[row] = [];
      for (let column = 0; column < this.universeSize; column++) {
        var cell = oldGeneration[row][column];
        cell.evolveFrom(oldGeneration);
        
        this.generation.push(cell);
      }
    }
  }

  clone() {
    return this.generation.slice();
  }

  getNewGeneration(fileData){
    const dataSize = fileData.length;
    let newGeneration = [];

    for (let row = 0; row < dataSize; row++) {
      newGeneration[row] = [];
      for (let column = 0; column < dataSize; column++) {
        newGeneration[row][column] =  new Cell(row, column, fileData[row][column].isAlive) ;
      }
    }

    return newGeneration;
  }
}

