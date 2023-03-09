import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemones.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  pokemones: Pokemon[] = [];
  previous = 0;
  next = 0;
  btnActive = true;

  constructor(private pokemonSvc: PokemonService, private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('value');
    this.pokemonSvc.getPokemones().subscribe(res => {
      this.pokemones = res;
    });
  }

  onClickPokemon(nombre: string): void {
    this.pokemonSvc.getPokemonDetails(nombre).subscribe(res => {
      this.router.navigate(['/pokemon', res.name]);
    });
  }

  paginaPrevious(): void {
    this.previous = 21;
    this.pokemonSvc.getPagePrevious(this.previous).subscribe(res => {
      this.pokemones = res;

      if (localStorage.getItem('value') === 'stop') {
        this.btnActive = true;
      }
    });
  }

  paginaNext(): void {
    this.next = 21;
    this.pokemonSvc.getPageNext(this.next).subscribe(res => {
      this.pokemones = res;
    });
    localStorage.removeItem('value');
    this.btnActive = false;
  }

}
