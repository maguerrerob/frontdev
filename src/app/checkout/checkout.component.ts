import { Component, NgModule, OnInit, ViewChild, ElementRef, AfterViewInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICreateOrderRequest, IPayPalConfig, ITransactionItem, NgxPayPalModule } from 'ngx-paypal';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CarritoService } from '../servicios/carrito.service';
import { SesionService } from '../servicios/sesion.service';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Collapse from 'bootstrap/js/dist/collapse';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, NgxPayPalModule, NgxSpinnerModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit, AfterViewInit {

  @ViewChild('collapseOne') collapseOne!: ElementRef;
  @ViewChild('collapseTwo') collapseTwo!: ElementRef;

  private bsCollapseOne!: Collapse;
  private bsCollapseTwo!: Collapse;

  public payPalConfig?: IPayPalConfig;

  checkoutForm!: FormGroup;
  formuario!: FormGroup;
  estado_id: number = 1;
  productos: any[] = [];
  productosPayPal: any[] = []
  usuario_id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private carrito: CarritoService,
    private sesion: SesionService,
    private peticionAPI: ApiService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
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

    this.usuario_id = this.sesion.getUsuario()?.id;

    this.checkoutForm = this.formBuilder.group({
      cliente: [this.usuario_id],
      estado: [this.estado_id],
      productos: [this.productos],
      nombre_completo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      dni: ['', [Validators.required, Validators.pattern('^([0-9]{8})([A-Z]{1}$)')]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
      ciudad: ['', Validators.required],
      cod_postal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
    });
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AXoCNgzg6VM9By-rAmGimTZo_9qwP6v3aQHUuOzJtqOHBZ6qWRDdMsTb714jvLUew1Pzf4VU5ETokBHA',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: this.getTotal().toString(),
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: this.getTotal().toString()
              }
            }
          },
          items: this.getItemList()
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
        this.spinner.show();
        this.peticionAPI.realizarCompra(this.checkoutForm.value).subscribe({
          next: () => {
            
            this.openModal(
              data.purchase_units[0].items,
              data.purchase_units[0].amount.value,
            );
            this.carrito.vaciarCarrito();
            this.router.navigate(['/']);
            this.spinner.hide();
          },
          error: (error) => {
            this.spinner.hide();
            console.error('Error al realizar la compra:', error);
            alert('Error al procesar la compra. Por favor, inténtelo de nuevo más tarde.');
          }
        })
        this.carrito.vaciarCarrito();
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

  getItemList(): any[] {
    const items: any[] = []
    let item = {}
    this.carrito.obtenerCarrito().forEach((it: any) => {
      item = {
        name: it.nombre,
        quantity: it.cantidad,
        unit_amount: { value: it.precio, currency_code: 'EUR' }
      }
      items.push(item);
    });
    return items;
  }

  ngAfterViewInit(): void {
    this.bsCollapseOne = new Collapse(this.collapseOne.nativeElement, { toggle: false });
    this.bsCollapseTwo = new Collapse(this.collapseTwo.nativeElement, { toggle: false });
  }

  min2wordsValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.trim();
    if (!value) return null

    const words = value.split(/\s+/)
    return words.length >= 2 ? null : { min2words: true };
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
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

  getTotal(): number {
    const total = this.carrito.getTotal()
    return total
  }

  // validar(): void {
  //   this.bsCollapseOne.hide();
  //   this.bsCollapseTwo.show();
  //   if (this.checkoutForm.valid) {
  //     this.bsCollapseOne.hide();
  //     this.bsCollapseTwo.show();
  //   } else {
  //     alert("Completa correctamente todos los campos")
  //     this.checkoutForm.markAllAsTouched();
  //   }
  // }

  openModal(items: any, amount: any): void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.items = items;
    modalRef.componentInstance.amount = amount;
  }
}
