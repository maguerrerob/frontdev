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
  productosFiltrados: any[] = [];
  // @Output() datosfromChild = new EventEmitter<number>();

  categorias = [
    { nombre: 'Discos', seleccionada: false},
    { nombre: 'Imágenes y esculturas', seleccionada: false},
    { nombre: 'Souvenirs', seleccionada: false},
    { nombre: 'Inciensos y complementos', seleccionada: false},
    { nombre: 'Costales', seleccionada: false},
    { nombre: 'Ropa', seleccionada: false},
  ]

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

  // Verificar si es admin
  isAdmin(): boolean {
    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    if (!usuario) {
      return false;
    }
    return usuario?.rol === 2;
  }

  delProduct(id: number): void {
    this.peticionAPI.delProducto(id).subscribe({
      next: () => {
        alert("Producto eliminado correctamente");
        window.location.reload();
      },
      error: (error) => {
        alert("Error al eliminar el producto");
        console.log(error);
      }
    })
  }

  cargarProductos(): void {
    this.peticionAPI.getProductos(this.idCategoria).subscribe(data => {
      this.productos = data;
    })
  }

  irProducto(id: number): void {
    this.peticionAPI.setIdProducto(id);
    this.router.navigate(['producto/', id ]);
  }

  //Método que se dispara al cambiar un checkbox
  filtrarPorCategorias(): void {
    const seleccionadas = this.categorias
      .filter(cat => cat.seleccionada)
      .map(cat => cat.nombre);
    
    //Si no hay categorías marcadas, muestra todo
    if (seleccionadas.length === 0) {
      this.productosFiltrados = this.productos;
    }
  }
}