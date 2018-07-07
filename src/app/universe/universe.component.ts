import { Component } from '@angular/core';
import { Cell } from './../contracts/cell.model';

@Component({
  selector: 'app-universe',
  templateUrl: './universe.component.html',
  styleUrls: ['./universe.component.css']
})

export class UniverseComponent {
  universe = [];
  universeSize = 30;
  universeContainerSize = (15 * this.universeSize) + (2 * this.universeSize) + 'px';

  constructor() {
    this.initializeUniverse();
    
  }

  initializeUniverse() {
    for (let row = 0; row < this.universeSize; row++) {
      for (let column = 0; column < this.universeSize; column++) {
        this.universe.push(new Cell(row, column));
      }
    }

    this.universe = this.universe;
  }
}

