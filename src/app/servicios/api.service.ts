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

  crearHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem('token') || ''
    });
  }

  crearToken(datosUsuario: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const params = new HttpParams()
      .set('grant_type', 'password')
      .set('username', datosUsuario['username'])
      .set('password', datosUsuario['password'])
      .set('client_id', 'client_id')
      .set('client_secret', 'secret_id');
    return this.http.post<any>(this.urlToken, params, { headers: headers })
      .pipe(
        catchError(
          (error: any) => {
            throw error;
          }
        )
      )
  }

  obtenerUsuario(token: string): Observable<any[]> {
    const headers = this.crearHeader();
    return this.http.get<any[]>(this.APIUrl + 'obtenerUsuario/' + token, { headers: headers })
      .pipe(
        catchError(
          (error: any) => {
            throw error;
          }
        )
      )
  }

  registerUsuario(datosUsuario: any): Observable<any> {
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

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + 'categorias/');
  }

  setCategoria(id: number): void {
    this.categoriaActual = id;
  }

  getCategoriaActual(): number {
    return this.categoriaActual
  }



  //----------------Vistas de productos----------------

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

  // Borrar producto
  delProducto(id: number): Observable<any> {
    const headers = this.crearHeader();
    return this.http.delete<any>(this.APIUrl + 'delProducto/' + id, { headers: headers });
  }



  //----------------Vistas barra búsqueda----------------

  setSearchText(searchText: string): void {
    this.searchText = searchText;
  }

  getSearchText(): string {
    return this.searchText;
  }



  //Para la creación de productos en arvhivo CSV
  uploadProducts(formData: FormData): Observable<any> {
    const headers = this.crearHeader();
    return this.http.post<any>(this.APIUrl + 'importarProductos/', formData, { headers: headers });
  }

  // ----------------Vistas de reseñas----------------

  getResenas(idProducto: number): Observable<any[]> {
    const headers = this.crearHeader();
    return this.http.get<any[]>(this.APIUrl + 'listResenasProduct/' + idProducto, { headers: headers })
      .pipe(
        catchError(
          (error: any) => {
            throw error;
          }
        )
      )
  }



  //------------------------POST------------------------
  // Crear reseña
  postResena(resena: FormData): Observable<any> {
    const headers = this.crearHeader();
    return this.http.post<any>(this.APIUrl + 'postResena/', resena, { headers: headers })
      .pipe(
        catchError(
          (error: any) => {
            throw error;
          }
        )
      )
  }

  // Crear compra
  realizarCompra(compra: FormData): Observable<any> {
    const headers = this.crearHeader();
    return this.http.post<any>(this.APIUrl + 'realizarCompra/', compra, { headers: headers })
      .pipe(
        catchError(
          (error: any) => {
            throw error;
          }
        )
      )
  }



  //------------------------PATCH------------------------

  // Update nombre producto
  updateNombre(id: number, nombre: string): Observable<any> {
    const headers = this.crearHeader();
    const body = { nombre: nombre };
    return this.http.patch<any>(this.APIUrl + 'updateNombre/' + id, body, { headers: headers });
  }

  // Subir foto de producto
  subirFotoProducto(id: number, formData: FormData): Observable<any> {
    const headers = this.crearHeader();
    return this.http.patch<any>(this.APIUrl + 'subirFotoProducto/' + id, formData, { headers: headers })
      .pipe(
        catchError(
          (error: any) => {
            throw error;
          }
        )
      )
  }

  //------------------------DELETE------------------------
  // Borrar reseña
  delResena(id: number): Observable<any> {
    const headers = this.crearHeader();
    return this.http.delete<any>(this.APIUrl + 'delResena/' + id, { headers: headers })
      .pipe(
        catchError(
          (error: any) => {
            throw error;
          }
        )
      )
  }
}