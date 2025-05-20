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
      this.uploadResponse = "Por favor, seleccione un archivo CSV.";
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('img', this.img, this.img.name);

    this.apiService.uploadProductsCsv(formData).subscribe({
      next: () => this.uploadResponse = "Archivo CSV subido correctamente.",
      error: () => this.uploadResponse = "Error al subir el archivo CSV.",
    });
  }
}
