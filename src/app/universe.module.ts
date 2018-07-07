import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UniverseComponent } from './universe.component';

@NgModule({
  declarations: [
    UniverseComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [UniverseComponent]
})

export class UniverseModule { }
