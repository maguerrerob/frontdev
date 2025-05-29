import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CarritoService } from '../servicios/carrito.service';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { ApiService } from '../servicios/api.service';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, RouterModule, NgxPayPalModule, NgxSpinnerModule],
  standalone: true,
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarritoComponent implements OnInit{
  productosEnCarrito: any[] = [];
  total: number = 0;
  public payPalConfig?: IPayPalConfig;


  constructor(
    private carritoService: CarritoService,
    private location: Location,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private peticionAPI: ApiService,
    private sesionService: SesionService,
  ) { }

  ngOnInit(): void {
    this.cargarCarrito();
    // this.initConfig();
  }

  cargarCarrito(): void {
    this.productosEnCarrito = this.carritoService.obtenerCarrito();
    console.log(this.productosEnCarrito);
    
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
  
  agregarProducto(producto: any, quantity: number): void {
    this.carritoService.agregarProducto(producto, quantity);
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

  irAtras(): void {
    this.location.back();
  }

  // private initConfig(): void {
  //   this.payPalConfig = {
  //     currency: 'EUR',
  //     clientId: 'sb',
  //     createOrderOnClient: (data) => <ICreateOrderRequest> {
  //       intent: 'CAPTURE',
  //       purchase_units: [{
  //         amount: {
  //           currency_code: 'EUR',
  //           value: this.total.toString(),
  //           breakdown: {
  //             item_total: {
  //               currency_code: 'EUR',
  //               value: this.total.toString()
  //             }
  //           }
  //         },
  //         items: this.getItemslist()
  //       }]
  //     },
  //     advanced: {
  //       commit: 'true'
  //     },
  //     style: {
  //       label: 'paypal',
  //       layout: 'vertical'
  //     },
  //     onApprove: (data, actions) => {
  //       this.spinner.show();
  //       console.log('onApprove - transaction was approved, but not authorized', data, actions);
  //       actions.order.get().then((details: any) => {
  //         console.log('onApprove - you can get full order details inside onApprove: ', details);
  //       });

  //     },
  //     onClientAuthorization: (data) => {
  //       console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', 
  //         JSON.stringify(data));
  //         this.openModal(
  //           data.purchase_units[0].items,
  //           data.purchase_units[0].amount.value
  //         );
  //         this.vaciarCarrito();

  //         this.spinner.hide();
  //     },
  //     onCancel: (data, actions) => {
  //       console.log('OnCancel', data, actions);

  //     },
  //     onError: err => {
  //       console.log('OnError', err);
  //     },
  //     onClick: (data, actions) => {
  //       console.log('onClick', data, actions);
  //     }
  //   };
  // }

  getItemslist(): any[] {
    const items: any[] = [];
    let item = {};
    this.productosEnCarrito.forEach((producto: any) => {
      item = {
        name: producto.nombre,
        quantity: producto.cantidad,
        unit_amount: {
          currency_code: 'EUR',
          value: producto.precio.toString(),
        }
      };
      items.push(item);
    })
    return items;
  }

  openModal(items: any, amount: any): void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.items = items;
    modalRef.componentInstance.amount = amount;
  }
}
