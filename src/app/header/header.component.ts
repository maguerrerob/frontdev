import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../servicios/api.service';
import { NavigationEnd, Router } from '@angular/router';
import { SesionService } from '../servicios/sesion.service';
import { filter } from 'rxjs/operators';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../servicios/carrito.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  constructor(
    private router: Router,
    private ApiService: ApiService,
    private sesion: SesionService,
    private carritoService: CarritoService,
  ) { }
  searchText: string = "";
  isAutenticated!: boolean;
  dropdownOpen = false;
  nombreUsuario!: string;
  ngOnChanges() {
    this.nombreUsuario = JSON.parse(sessionStorage.getItem('usuario') || '{}').first_name;
  }

  onSearch() {
    if (this.searchText.trim() !== '') {
      this.ApiService.setSearchText(this.searchText);
      this.router.navigate(['search', this.searchText])
    }
  }
  isAdmin(): boolean {
    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    if (!usuario) {
      return false;
    }
    // Verifica si el usuario tiene el rol de administrador (rol 1)
    return usuario?.rol === 2;
  }
  ngOnInit(): void {
    this.isAutenticated = this.sesion.isLoggedIn();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isAutenticated = this.sesion.isLoggedIn();
      })
  }

  login(event?: Event): void{
    if (event){
      event.preventDefault();
    }
    if (this.sesion.isLoggedIn()) {
      console.log("esta logueado");
    } else{
      console.log("no esta logueado");
      this.router.navigate(['login']);
    }
  }
  logout() {
    this.sesion.eliminarToken();
    sessionStorage.removeItem('usuario');
    this.isAutenticated = false;
    this.carritoService.vaciarCarrito()
    this.router.navigate([''])
  }
  openDropdown() {
    this.dropdownOpen = true
  }
  closeDropdown() {
    this.dropdownOpen = false;
  }
}
