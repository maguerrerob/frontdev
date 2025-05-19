import { Component, OnInit } from '@angular/core';
import { loadScript } from "@paypal/paypal-js";
import { create } from 'lodash';

@Component({
  selector: 'app-carritodos',
  imports: [],
  templateUrl: './carritodos.component.html',
  styleUrl: './carritodos.component.css'
})
export class CarritodosComponent implements OnInit {
  paypal: any


  inicializePaypal = async () => {
    try {
      this.paypal = await loadScript({ clientId: "test" });
    } catch (error) {
      console.error("failed to load the PayPal JS SDK script", error);
    }

    if (this.paypal) {
      try {
        await this.paypal.Buttons({
          async createOrder() {
            
          }
        }).render("#btns-paypal");
      } catch (error) {
        console.error("failed to render the PayPal Buttons", error);
      }
    }
  }

  ngOnInit() {
    this.inicializePaypal();
  }
}
