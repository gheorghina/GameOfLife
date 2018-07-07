import { Component, OnInit, Input } from '@angular/core';
import { UniverseComponent } from '../universe/universe.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent {
  @Input() universe: UniverseComponent;
  
  gameStarted = false;
 

  initGame()
  {
    this.gameStarted = false;
    this.universe.initializeUniverse();
  }

  saveState(){
  
    const fileType = 'text/plain';
    const fileName = 'GameSnapshot.json';

    var gameStateShapshot = JSON.stringify(this.universe.clone());

    var a = document.createElement("a");
    var file = new Blob([gameStateShapshot], {type: fileType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    
    a.click();
  }

}
