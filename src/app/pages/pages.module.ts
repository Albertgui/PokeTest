import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { BuscarComponent } from './buscar/buscar.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    HomeComponent,
    PokemonComponent,
    BuscarComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ]
})
export class PagesModule { }
