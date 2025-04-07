import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [],
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

  constructor(
    private peticionAPI: ApiService,
    private route: ActivatedRoute
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
      }
    })
    
  }

  increase(): void {
    this.quantity++;
  }

  decrease(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }


}
