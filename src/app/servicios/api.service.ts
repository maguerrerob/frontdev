import { Injectable, inject, resource } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { identity } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  headers = new HttpHeaders({ 'Authorization': 'Bearer fyboe0xVUmQxVEbI5THoCmqMyXl7GG' });
  APIUrl = 'http://127.0.0.1:8000/api/v1/';
  urlToken = 'http://127.0.0.1:8000/oauth2/token/'
  categoriaActual!: number;
  idProducto!: number;
  searchText!: string;

  constructor() { }

  obtenerToken(datosUsusario: any): Observable<any>{
    const cabecera = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const params = new HttpParams()
      .set('grant_type', 'password')
      .set('username', datosUsusario['username'])
      .set('password', datosUsusario['password'])
      .set('client_id', 'id_client')
      .set('client_secret', 'secret_client');

      return this.http.post<any>(this.urlToken, params)
        .pipe(
          catchError(
            (error: any) => {
              throw error;
            }
          )
        )
  }

  crearHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer e5nx7P5XIR3tIjvlsq1BhsmfBtqnxu'
    });
  }

  loginUsuario(token: string): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get<any>(this.APIUrl + 'obtenerUsuario/' + `${token}`, { headers: headers })
      .pipe(
        catchError(
          (error: any) => {
            throw error;
          }
        )
      )
  }

  registerUsuario(datosUsuario: any): Observable<any>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.APIUrl + 'registrarUsuario/', datosUsuario, { headers: headers })
      .pipe(
        catchError(
          (error: any) => {
            throw error;
          }
        )
      )
  }

  getMediaPuntuacion(idProducto: number): Observable<any> {
    return this.http.get<any>(this.APIUrl + 'puntuacionReseñas/' + idProducto + this.headers);
  }

  getresenasProducto(idProducto: number): Observable<any> {
    return this.http.get<any[]>(this.APIUrl + 'resenasProducto/' + idProducto + this.headers)
  }

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + 'categorias/');
  }

  setCategoria(id: number): void {
    this.categoriaActual = id;
  }

  getCategoriaActual(): number {
    return this.categoriaActual
  }

  getProductos(idCategoria: number): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + 'productos/' + idCategoria);
  }

  setIdProducto(id: number): void {
    this.idProducto = id;
  }

  getIdProducto(): number {
    return this.idProducto;
  }

  getProducto(idProducto: number): Observable<any> {
    return this.http.get<any>(this.APIUrl + 'producto/' + idProducto);
  }


  // Para la barra de búsqueda del header
  searchProductos(searchText: string): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + 'productos/' + searchText);
  }

  setSearchText(searchText: string): void {
    this.searchText = searchText;
  }

  getSearchText(): string {
    return this.searchText;
  }

  // export const getProductos = resource(() => {
  //   return this.http.get(this.APIUrl + 'productos');
  // })
}
