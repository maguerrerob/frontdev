import { Component, OnInit } from '@angular/core';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-pruebas',
  imports: [],
  templateUrl: './pruebas.component.html',
  styleUrl: './pruebas.component.css'
})
export class PruebasComponent implements OnInit {
  constructor(
    private sesion: SesionService,
  ) { }
  ngOnInit(): void {
    const user = this.sesion.getUsuario()["username"];
    console.log(user);
   
  }
}
