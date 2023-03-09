import { animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Habilidades } from 'src/app/interfaces/habilidades.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit{

  nombrePokemon: string = '';
  imgPokemon: any;
  description: any;
  habilidades: any;
  especie?: Habilidades;
  imgAnimate: any;

  constructor(private pokemonSvc: PokemonService, private activatedRoute: ActivatedRoute){
    const {nombre} = this.activatedRoute.snapshot.params;
    this.pokemonSvc.getPokemonDetails(nombre).subscribe(pokemon => {
      this.imgAnimate = pokemon.sprites.versions?.['generation-v']['black-white'].animated?.front_default;
      this.nombrePokemon = pokemon.name;
      this.imgPokemon = pokemon.sprites.other?.['official-artwork'].front_default;
      this.habilidades = pokemon.species;
      this.pokemonSvc.getHablilidades(this.habilidades.url).subscribe(res => {
        for (let i = 0; i < res.flavor_text_entries.length; i++) {
          const element = res.flavor_text_entries[i];
          if (element.language.name == 'es'){
            this.description = element.flavor_text;
          }
        }
        for (let i = 0; i < res.genera.length; i++) {
          const element2 = res.genera[i];
          if (element2.language.name == 'es'){
            this.especie = element2.genus;
          }
        }
      });
    });
  }

  ngOnInit(): void{

  }

}
