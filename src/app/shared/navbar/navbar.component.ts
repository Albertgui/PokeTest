import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private router: Router){}

  ngOnInit(){

  }

  regresar(): void{
    location.href = 'home';
  }

  buscar(texto: string): void{
    texto = texto.toLowerCase().trim();
    if(texto.length === 0){
      return;
    }
    else {
      this.router.navigate(['/buscar/' + texto]);
    }
  }
}
