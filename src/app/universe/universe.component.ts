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
    this.generation = this.createNewGeneration(this.universeSize, 
      (row, col)=> { return new Cell(row, col, false) });
  }

  setGosperGliderGunState(fileData) {
    this.gosperglidergun = this.getNewGeneration(fileData);
  }

  loadFromGosperGliderGunState() {

    this.generation = this.getNewGeneration(this.gosperglidergun);
  }

  evolve() {   

    let oldGeneration = this.clone();
    let newGeneration = this.createNewGeneration(this.universeSize, 
      (row, col)=> { 
        var cell = new Cell(row, col, oldGeneration[row][col].getIsAlive());
        cell.evolveFrom(oldGeneration);
        
        return cell;
      });

    this.generation = newGeneration;
  }

  clone() {
    return this.generation.slice();
  }

  getNewGeneration(fileData) {
    const dataSize = fileData.length;
    let newGeneration = this.createNewGeneration(dataSize, 
      (row, col)=>{ return new Cell(row, col, fileData[row][col].isAlive) });

    return newGeneration;
  }

  createNewGeneration(size, createCell)
  {
    let newGeneration = [];

    for (let row = 0; row < size; row++) {
      newGeneration[row] = [];
      for (let column = 0; column < size; column++) {
        newGeneration[row][column] = createCell(row, column); 
      }
    }

    return newGeneration;
  }
}

