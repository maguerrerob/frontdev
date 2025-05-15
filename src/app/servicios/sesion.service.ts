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
    const user = sessionStorage.getItem('usuario');
    if (user) {
      const userObject = JSON.parse(user);
      return userObject;
    }
    return null;
  }

  eliminarUsuario(): void {
    
  }

  isLoggedIn(): boolean {
    return this.getToken() !== '';
  }
}
