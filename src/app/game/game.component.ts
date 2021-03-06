import { Component, OnInit, Input } from '@angular/core';
import { ICellResponse } from '../contracts/cellresponse.model';
import { UniverseComponent } from '../universe/universe.component';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent {
  @Input() universe: UniverseComponent;  
  playInterval;
  initialSize: number;
  drawXPosition = 0;
  drawYPosition = 0;
  drawSquareSize = 40;

  constructor(private gameService: GameService) {  
  }

  ngOnInit () {   
    
    this.gameService.getGosperGliderGunContent()
    .subscribe((data: ICellResponse[][]) => {
      this.universe.setGosperGliderGunState(data);
    });        
  }

  initGame()
  {    
    this.universe.initializeUniverse(this.initialSize);
  }

  onSetSize(size: number){
    this.initialSize = size;
  }

  onSetXPosition(xValue) {
    this.universe.setXPosition(xValue);
  }

  onSetYPosition(yValue) {
    this.universe.setYPosition(yValue);
  }

  onSetSquareSize(squareValue) {
    this.universe.setSquareSize(squareValue);
  }

  loadGosperGliderGun(){
    stop();    
    this.universe.loadFromGosperGliderGunState();
  }

  start(){
    const self = this;
    this.playInterval = setInterval(function() { self.universe.evolve()},  300);
  }

  stop(){
    clearInterval(this.playInterval);
  }

  saveState(){
  
    const fileType = 'text/plain';
    const fileName = 'GameSnapshot.json';

    var gameStateSnapshot = JSON.stringify(this.universe.slimDown());

    var a = document.createElement("a");
    var file = new Blob([gameStateSnapshot], {type: fileType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;

    a.click();
  } 
}
