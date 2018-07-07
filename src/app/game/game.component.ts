import { Component, OnInit, Input } from '@angular/core';
import { Cell } from '../contracts/cell.model';
import { UniverseComponent } from '../universe/universe.component';
import { GameService } from '../services/game.service';
import { ICellResponse } from '../contracts/cellresponse.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent {
  @Input() universe: UniverseComponent;  
  gosperglidergun = [];
  gameStarted = false;

  constructor(private gameService: GameService) {
  }

  ngOnInit () {    
    this.gameService.getGosperGliderGunContent()
    .subscribe((data: ICellResponse[]) => {
      this.gosperglidergun = this.mapToCells(data);
      return this.mapToCells(this.gosperglidergun);
    });        
  }

  initGame()
  {
    this.gameStarted = false;
    this.universe.initializeUniverse();
  }

  loadGosperGliderGun(){
    this.gameStarted = false;    
    this.universe.loadFrom(this.mapToCells(this.gosperglidergun));
  }

  start(){
    this.gameStarted = true;
  }

  stop(){
    this.gameStarted = false;

  }

  saveState(){
  
    const fileType = 'text/plain';
    const fileName = 'GameSnapshot.json';

    var gameStateSnapshot = JSON.stringify(this.universe.clone());

    var a = document.createElement("a");
    var file = new Blob([gameStateSnapshot], {type: fileType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;

    a.click();
  }  

  private mapToCells(data) {
    return data.map(el => new Cell(el.x, el.y, el.isAlive));
  }

}
