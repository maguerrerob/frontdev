import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../servicios/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categorias: any[] = [];

  constructor(
    private peticionAPI: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.peticionAPI.getCategorias().subscribe( data => {
      this.categorias = data;
    })
  }

  irCategoria(id: number): void {
    this.peticionAPI.setCategoria(id);
    this.router.navigate(["productos/", id])
    // this.peticionAPI.getCategoria(id).subscribe( data => {
    //   console.log(data["nombre"]);
    //   this.router.navigate(["productos/" + data["nombre"]])
    //   // this.router.navigate("productos/" + data["nombre"] + "/" + id);
    // }, error => {
    //   console.error('Error al obtener la categoría:', error.error);
    //   // Manejar el error aquí si es necesario
    // })
  }
}