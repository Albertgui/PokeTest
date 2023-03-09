import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { environment } from '../environments/environment';
import { Habilidades } from '../interfaces/habilidades.interface';
import { PokemonDetails } from '../interfaces/pokemon.interface';
import { Pokemon, PokemonesResponse } from '../interfaces/pokemones.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private baseUrl: string = environment.baseUrl;
  private limitPage = 21;
  public offsetPage = 0;

  constructor(private http: HttpClient) { }

  get params(){
    return {
      limit: this.limitPage,
      offset: this.offsetPage
    }
  }

  getPokemones(): Observable<Pokemon[]>{
    return this.http.get<PokemonesResponse>(`${this.baseUrl}/pokemon`, {params: this.params}).pipe(map(res => res.results));
  }

  getPokemonDetails(nombre: string): Observable<PokemonDetails>{
    return this.http.get<PokemonDetails>(`${this.baseUrl}/pokemon/${nombre}`);
  }

  getHablilidades(url: string): Observable<Habilidades>{
    return this.http.get<Habilidades>(`${url}`);
  }

  getPagePrevious(previous: number){
    this.offsetPage = this.offsetPage - previous;

    if(this.offsetPage === 0){
      localStorage.setItem('value', 'stop');
    }

    return this.http.get<PokemonesResponse>(`https://pokeapi.co/api/v2/pokemon?limit=21&offset=${this.offsetPage}`).pipe(map(res => res.results));
  }

  getPageNext(next: number){
    this.offsetPage = this.offsetPage + next;
    return this.http.get<PokemonesResponse>(`https://pokeapi.co/api/v2/pokemon?limit=21&offset=${this.offsetPage}`).pipe(map(res => res.results));
  }

}
