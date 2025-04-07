import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { RouterOutlet, Router } from '@angular/router';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  productos: any[] = [];
  idProducto!: number;
  idCategoria!: number;
  // @Output() datosfromChild = new EventEmitter<number>();

  constructor(
    private peticionAPI: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    // Se suscribe a los cambios de parámetros en la URL
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('idCategoria');
      if (idParam) {
        this.idCategoria = +idParam; // Convertir a número
        this.cargarProductos();
      }
    });
  }

  cargarProductos(): void {
    this.peticionAPI.getProductos(this.idCategoria).subscribe(data => {
      this.productos = data;
    })
  }

  irProducto(id: number): void {
    this.peticionAPI.setIdProducto(id);
    this.router.navigate(['productos/', this.idCategoria, id]);
  }
}