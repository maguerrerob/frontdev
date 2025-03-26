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
    const crearDatosToken = new HttpParams()
      .set('grant_type', 'password')
      .set('username', datosUsusario['username'])
      .set('password', datosUsusario['password'])
      .set('client_id', 'client_id')
      .set('client_secret', 'client_secret')

    const cabecera = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }

      return this.http.post<any>(this.urlToken, crearDatosToken.toString(), { headers: cabecera})
        .pipe(
          catchError(
            (error: any) => {
              throw error;
            }
          )
        )
  }

  crearHeader(token: string): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + token
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
