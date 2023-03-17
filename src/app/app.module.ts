import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SideComponent } from './components/side/side.component';
import { PlayerComponent } from './components/player/player.component';
import { FormatCellPipe } from './pipes/format-cell.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideComponent,
    PlayerComponent,
    FormatCellPipe,
    InputComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
