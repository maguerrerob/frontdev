import { Component, OnInit, NgModule } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { ActivatedRoute } from '@angular/router';
import { SesionService } from '../servicios/sesion.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from '../servicios/carrito.service';

@Component({
  selector: 'app-product',
  imports: [FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  quantity: number = 1;
  puntuacion!: number;
  resenas!: any[];
  idProducto!: number;
  infoProducto!: any;
  mensajeError!: string;

  // Variables edicion inline
  nombreEditable = false;
  nuevoNombre = "";

  constructor(
    private peticionAPI: ApiService,
    private route: ActivatedRoute,
    private sesion: SesionService,
    private route2: Router,
    private carritoService: CarritoService,
  ) { }
  
  ngOnInit(): void {
    // Para recuperar el id del producto mediante la URL
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('idProducto');
      if (idParam) {
        this.idProducto = +idParam; // Convertir a número
        this.peticionAPI.getProducto(this.idProducto).subscribe(data => {
          this.infoProducto = data;
          console.log(this.infoProducto);
        },
        error => {
          this.mensajeError = error.error
          alert(this.mensajeError);
        })
      }
    })
  }

  isAdmin(): boolean {
    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    if (!usuario) {
      return false;
    }
    return usuario?.rol === 1;
  }

  // Inicia edición inline del nombre del producto
  updateNombre(): void {
    this.nombreEditable = true;
    this.nuevoNombre = this.infoProducto.nombre;
  }

  // Captura Enter en input y actualiza nombre
  onNombreKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.nuevoNombre.trim()) {
      this.peticionAPI.updateNombre(this.idProducto, this.nuevoNombre.trim()).subscribe({
        next: updated => {
          this.infoProducto.nombre = updated.nombre;
          this.nombreEditable = false;
        },
        error: err => {
          alert("Error al actualizar el nombre");
          console.log(err);
        }
      })
    }
  }

  increase(): void {
    this.quantity++;
  }

  decrease(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  anyadirAlCarrito(): void {
    const producto = {
      id: this.infoProducto.id,
      nombre: this.infoProducto.nombre,
      precio: this.infoProducto.precio,
    };
    this.carritoService.agregarProducto(producto, this.quantity);
    this.route2.navigate(['/carrito']);
  }
}
