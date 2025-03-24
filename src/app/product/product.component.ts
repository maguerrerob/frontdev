import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';

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

  constructor(
    private peticionAPI: ApiService,
    private router: Router
  ) {
    const recoger = this.router.getCurrentNavigation();
    if (recoger?.extras.state) {
      this.idProducto = recoger?.extras.state['id']
    }
   }
  
  ngOnInit(): void {
    console.log(this.idProducto);
    this.peticionAPI.getresenasProducto(this.idProducto).subscribe(data => {
      this.resenas = data;
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
