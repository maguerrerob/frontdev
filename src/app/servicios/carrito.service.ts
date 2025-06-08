import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: any[] = [];

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.cargarCarrito();
    }
  }

  obtenerCarrito(): any[] {
    return this.carrito;
  }

  agregarProducto(producto: any, cantidad: number): void {

    const index = this.carrito.findIndex(item => item.id === producto.id);
    if (index !== -1) {
      this.carrito[index].cantidad += cantidad;
    } else {

      this.carrito.push({ ...producto, cantidad });
      // console.log(this.carrito);

    }
    this.guardarCarrito();
  }

  eliminarProducto(productoId: number): void {
    this.carrito = this.carrito.filter(item => item.id !== productoId);
    this.guardarCarrito();
  }

  cambiarCantidad(productoId: number, cantidad: number): void {
    const producto = this.carrito.find(item => item.id === productoId);
    if (producto) {
      producto.cantidad = cantidad;
      this.guardarCarrito();
    }
  }

  getTotal(): number {
    let total = 0;
    for (const producto of this.carrito) {
      total += parseFloat(producto.precio) * producto.cantidad;
    }
    return total
  }

  aumentarCantidad(productoId: number): void {
    const producto = this.carrito.find(item => item.id === productoId);
    if (producto) {
      producto.cantidad += 1;
      this.guardarCarrito();
    }
  }

  disminuirCantidad(productoId: number): void {
    const producto = this.carrito.find(item => item.id === productoId);
    if (producto) {
      if (producto.cantidad > 1) {
        producto.cantidad -= 1;
      } else {
        this.eliminarProducto(productoId);
      }
      this.guardarCarrito();
    }
  }

  vaciarCarrito(): void {
    this.carrito = [];
    this.guardarCarrito();
  }

  private guardarCarrito(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
  }

  private cargarCarrito(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        this.carrito = JSON.parse(carritoGuardado);
      }
    }
  }
}
