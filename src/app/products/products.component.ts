import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
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
  // @Output() datosfromChild = new EventEmitter<number>();

  constructor(
    private peticionAPI: ApiService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.peticionAPI.getProductos().subscribe(data  => {
      this.productos = data;
    })
  }

  // saveIDProduct(id: number): void {
  //   this.idProducto = id;
  //   this.datosfromChild.emit(this.idProducto);
  // }
}