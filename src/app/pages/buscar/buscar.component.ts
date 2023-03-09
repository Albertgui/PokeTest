import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Habilidades } from 'src/app/interfaces/habilidades.interface';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  nombrePokemon: string = '';
  imgPokemon: any;
  habilidades: any;
  description: any;
  especie?: Habilidades;
  exist: boolean = true;
  textoBuscar: string = '';
  imgAnimate: any;

  constructor(private activatedRoute: ActivatedRoute, private pokemonSvc: PokemonService) {
    this.activatedRoute.params.subscribe(params => {
      this.exist = true;
      this.textoBuscar = params['texto'];
      this.pokemonSvc.getPokemonDetails(this.textoBuscar).subscribe({
        next: (pokemon) =>{
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
        },
        error: () => {
          this.exist = false;
        }
      });
    });
  }

  ngOnInit(): void {

  }

}
