import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: 'app-pedidos',
  imports: [],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent implements OnInit {
  pedidos: any[] = []
  usuario!: any

  constructor(
    private api: ApiService,
    private sesion: SesionService,
  ) { }

  ngOnInit(): void {
    this.usuario = this.sesion.getUsuario()
    console.log(this.usuario);

    this.api.listCompras(this.usuario.id).subscribe({
      next: (response) => {this.pedidos = response,
        console.log(this.pedidos);
        
      },
      error: (response) => console.log(response.error)
    })
  }

  descargarPDF(idCompra: number): void {
    this.api.printPDF(idCompra).subscribe(Blob => {
      const url = window.URL.createObjectURL(Blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `factura_${idCompra}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    },err => {
      console.error('Error al descargar el PDF', err);
    })
  }
}
