import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  username!: string;
  email!: string;
  id!: number;
  rol!: number;
  first_name!: string;
  last_name!: string;
  telefono!: string;

  constructor() { }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }
  
  getToken(): string {
    return sessionStorage.getItem('token') || '';
  }
  
  eliminarToken(): void {
    sessionStorage.removeItem('token');
  }

  setUsuario(usuario: any): void {
    
  }

  getUsuario(): any {
    return {
      
    };
  }

  eliminarUsuario(): void {
    
  }

  isLoggedIn(): boolean {
    return this.getToken() !== '';
  }
}
