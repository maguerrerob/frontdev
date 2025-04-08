import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../servicios/carrito.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit{
  productosEnCarrito: any[] = [];
  total: number = 0;

  constructor(
    private carritoService: CarritoService
  ) { }

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.productosEnCarrito = this.carritoService.obtenerCarrito();
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.total = this.productosEnCarrito.reduce((acc, producto) => {
      return acc + producto.precio * producto.cantidad;
    }, 0);
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
    this.cargarCarrito();
  }
  
  agregarProducto(producto: any): void {
    this.carritoService.agregarProducto(producto);
    this.cargarCarrito();
  }

  eliminarProducto(producto: any): void {
    this.carritoService.eliminarProducto(producto);
    this.cargarCarrito();
  }

  aumentarCantidad(producto: any): void {
    this.carritoService.aumentarCantidad(producto);
    this.cargarCarrito();
  }

  disminuirCantidad(producto: any): void {
    this.carritoService.disminuirCantidad(producto);
    this.cargarCarrito();
  }

  modificarCantidad(producto: any, nuevaCantidad: number): void {
    this.carritoService.modificarCantidad(producto, nuevaCantidad);
    this.cargarCarrito();
  }
}
