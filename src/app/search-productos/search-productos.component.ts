import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-productos',
  imports: [],
  templateUrl: './search-productos.component.html',
  styleUrl: './search-productos.component.css'
})
export class SearchProductosComponent implements OnInit {
  constructor(
    private ApiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  searchText!: string;
  productos: any[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const searchParam = params.get('searchText');
      if (searchParam) {
        this.searchText = searchParam;
        this.searchProducts(this.searchText);
      }
    })
  }

  searchProducts(searchText: string): void {
    this.ApiService.searchProductos(searchText).subscribe(data => {
      this.productos = data;
    })
  }

  irProducto(id: number): void {
    this.ApiService.setIdProducto(id);
    this.router.navigate(['producto/', id]);
  }
}
