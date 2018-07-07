import { Component } from '@angular/core';
import { Cell } from '../contracts/cell.model';

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.css']
})

export class UniverseComponent {
  universe = [];
  universeSize = 40;
  cellSize = 10;
  universeContainerSize = (this.cellSize * this.universeSize) + (2 * this.universeSize) + 'px';  

  constructor() {
    this.initializeUniverse();
  }

  initializeUniverse() {

    console.log('initializing the universe');

    this.universe = [];

    for (let row = 0; row < this.universeSize; row++) {
      for (let column = 0; column < this.universeSize; column++) {
        this.universe.push(new Cell(row, column, false));
      }
    }
  }

  loadFrom(state) {

    console.log('loading the universe from state' + state);

    this.universe = state;    
  }


  clone(){

    console.log('cloning the universe');

    return this.universe.slice();

  }
}

