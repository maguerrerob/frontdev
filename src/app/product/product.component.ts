import { Component, OnInit, NgModule } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { ActivatedRoute } from '@angular/router';
import { SesionService } from '../servicios/sesion.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from '../servicios/carrito.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
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
  resenaForm!: FormGroup;;

  // Variables edicion inline
  nombreEditable = false;
  nuevoNombre = "";
  selectedFile: File | null = null;


  constructor(
    private peticionAPI: ApiService,
    private route: ActivatedRoute,
    private sesion: SesionService,
    private route2: Router,
    private carritoService: CarritoService,
    private formBuilder: FormBuilder,
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
        this.peticionAPI.getResenas(this.idProducto).subscribe({
          next: data => {this.resenas = data;
          },
          error: err => {
            this.mensajeError = err.error
            alert(this.mensajeError);
          }
        }),
        this.resenaForm = this.formBuilder.group({
          producto: [this.idProducto],
          usuario: [this.sesion.getUsuario()["id"]],
          comentario: ['', [Validators.required, Validators.maxLength(250)]],
          puntuacion: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
        })
      }
    })
  }

  onSubmitResena(): void {
    if (this.resenaForm.valid) {
      this.peticionAPI.postResena(this.resenaForm.value).subscribe({
        next: () => 
          window.location.reload(),
        
        error: err => {
          if (err.status === 400) {
            if (err.error.comentario) {
              this.mensajeError += err.error.comentario[0] + "\n";
            }
            if (err.error.puntuacion) {
              this.mensajeError += err.error.puntuacion[0] + "\n";
            }
          }
          alert(this.mensajeError);
        }
      })
    } else {
      this.resenaForm.markAllAsTouched();
      this.mensajeError = "Por favor, completa todos los campos correctamente.";
      alert(this.mensajeError);
    }
  }

  esResenaDelUsuario(resena: any): boolean {
    const usuario = this.sesion.getUsuario();
    if (!usuario) {
      return false;
    }
    return resena.cliente.usuario.id === usuario.id;
  }

  deleteResena(idResena: number): void {
    this.peticionAPI.delResena(idResena).subscribe({
      next: () => window.location.reload(),
      error: err => {
        this.mensajeError = err.error[0]
        alert(this.mensajeError);
      }
    })
  }
  
  

  isVendedor(): boolean {
    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    if (!usuario) {
      return false;
    }
    return usuario?.rol === 2;
  }

  isUser(): boolean {
    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    if (!usuario) {
      return false;
    }
    return usuario?.rol === 3;
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
      foto: this.infoProducto.foto
    };    
    this.carritoService.agregarProducto(producto, this.quantity);
    this.route2.navigate(['/carrito']);
  }

  onImageSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(id: number): void {
    if (!this.selectedFile) {
      alert("Por favor seleccione una imagen antes")
      return;
    }
    const formData = new FormData();
    formData.append('foto', this.selectedFile);
    this.peticionAPI.subirFotoProducto(id, formData).subscribe({
      next: (response) => {
        alert(response.success)
        window.location.reload();
      },
      error: (error) => {
        alert(error.error)
        // if (typeof err.error === 'string'){
        //   alert(err.error)
        // } else if (Array.isArray(err.error)) {
        //   const miserrores = err.errors.map((error: any) => error.message).join('\n');
        //   alert(miserrores)
        // } else {
        //   alert(err.error.toString)
        // }
      }
    })
  }
}