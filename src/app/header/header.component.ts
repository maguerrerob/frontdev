import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
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
