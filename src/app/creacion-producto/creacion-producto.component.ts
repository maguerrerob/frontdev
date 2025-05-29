import { Component } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-creacion-producto',
  imports: [],
  templateUrl: './creacion-producto.component.html',
  styleUrl: './creacion-producto.component.css'
})
export class CreacionProductoComponent {
  selectedFile: File | null = null;
  uploadResponse = "";
  img!: File;

  constructor(
    private apiService: ApiService,
  ) { }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadResponse = "";
    }
  }

  onImageSelected(event: any): void {
    this.img = event.target.files[0];
  }

  onUpload(): void {
    if (!this.selectedFile) {
      this.uploadResponse = "Por favor, seleccione un archivo excel.";
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    // formData.append('img', this.img, this.img.name);

    this.apiService.uploadProducts(formData).subscribe({
      next: (response) => this.uploadResponse = response.mensaje,
      error: (response) => {
        const err = response.error;
        if (Array.isArray(err.errors)) {
          this.uploadResponse = err.errors.map((error: any) => error.message).join(', ');
        } else if (typeof err.error === 'string') {
          this.uploadResponse = err.error;
        }
        else {
          this.uploadResponse = "Error al subir el archivo. Por favor, inténtelo de nuevo.";
        }
      },
    });
  }
}
