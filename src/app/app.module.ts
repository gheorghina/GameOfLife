import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { UniverseComponent } from './universe/universe.component';

import { GameService } from  './services/game.service';

@NgModule({
  declarations: [
    AppComponent,        
    GameComponent,
    UniverseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GameService, HttpClientModule],
  bootstrap: [AppComponent]
})

export class AppModule { }
