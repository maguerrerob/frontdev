import { Injectable, inject, resource } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  headers = new HttpHeaders({ 'Authorization': 'Bearer 0X8sqTNnL3RHvE1AV2yVpddCJ5qtIo' });
  APIUrl = 'http://127.0.0.1:8000/api/v1/';

  constructor() { }

  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + 'productos/', { headers: this.headers });
  }

  getMediaPuntuacion(idProducto: number): Observable<any> {
    return this.http.get<any>(this.APIUrl + 'puntuacionReseñas/' + idProducto + this.headers);
  }

  getresenasProducto(idProducto: number): Observable<any> {
    return this.http.get<any[]>(this.APIUrl + 'resenasProducto/' + idProducto + this.headers)
  }

  // export const getProductos = resource(() => {
  //   return this.http.get(this.APIUrl + 'productos');
  // })
}
