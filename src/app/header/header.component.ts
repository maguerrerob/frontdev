import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  constructor(
    private router: Router,
    private ApiService: ApiService,
  ) { }
  searchText: string = "";

  onSearch() {
    if (this.searchText.trim() !== '') {
      this.ApiService.setSearchText(this.searchText);
      this.router.navigate(['search', this.searchText])
    }
  }

  isAutenticated = false;
  dropdownOpen = false;
  login() {
    this.isAutenticated = true; 
  }
  logout() {
    this.isAutenticated = false;
  }
  openDropdown() {
    this.dropdownOpen = true
  }
  closeDropdown() {
    this.dropdownOpen = false;
  }
}
