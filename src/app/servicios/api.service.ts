import { Injectable, inject, resource } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  headers = new HttpHeaders({ 'Authorization': 'Bearer 0X8sqTNnL3RHvE1AV2yVpddCJ5qtIo' });
  APIUrl = 'http://127.0.0.1:8000/api/v1/';
  urlToken = 'http://127.0.0.1:8000/oauth2/token/'

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
      'Authorization': 'Bearer CLjPNWXCMzadrkGkFoQ8JqqkUEz4IO'
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
    const header = this.crearHeader();
    return this.http.get<any[]>(this.APIUrl + 'categorias/', { headers: header });
  }

  getCategoria(idCategoria: number): Observable<any> {
    const header = this.crearHeader();
    return this.http.get<any>(this.APIUrl + 'categoria/' + idCategoria + "/", { headers: header });
  }

  getProductos()

  // export const getProductos = resource(() => {
  //   return this.http.get(this.APIUrl + 'productos');
  // })
}
