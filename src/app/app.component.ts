import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontdev';
  idProducto!: number;

  constructor(private router: Router) { }

  // receiveIDProduct($event: number) {
  //   this.idProducto = $event;
  //   this.router.navigate(['producto/', this.idProducto]);
  // }
}
