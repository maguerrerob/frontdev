import { Component, NgModule, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICreateOrderRequest, IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarritoService } from '../servicios/carrito.service';
import { SesionService } from '../servicios/sesion.service';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { set } from 'lodash';


@Component({
  selector: 'app-checkout',
  imports: [CommonModule, NgxPayPalModule, NgxSpinnerModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CheckoutComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  checkoutForm!: FormGroup;
  estado_id: number = 1;
  productos: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private carrito: CarritoService,
    private sesion: SesionService,
    private peticionAPI: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.initConfig();

    let carrito = this.carrito.obtenerCarrito();
    carrito.forEach(item => {
      this.productos.push({
        id: item.id,
        cantidad: item.cantidad
      })
    })

    const usuario_id = this.sesion.getUsuario()?.id;

    this.checkoutForm = this.formBuilder.group({
      cliente: [usuario_id],
      estado: [this.estado_id],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      ciudad: ['', Validators.required],

      cod_postal: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      productos: [this.productos],
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value)
      this.spinner.show();
      setTimeout(() => {
        this.peticionAPI.realizarCompra(this.checkoutForm.value).subscribe({
          next: () => {
            this.spinner.hide();
            this.carrito.vaciarCarrito();
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.spinner.hide();
            console.error('Error al realizar la compra:', error);
            alert('Error al procesar la compra. Por favor, inténtelo de nuevo más tarde.');
          }
        })
      })


    }
  }
  

  

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }
}
