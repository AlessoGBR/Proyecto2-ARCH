import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarritoItem } from '../../Objects/Cart/carrito-item';
import { Carrito } from '../../Objects/Cart/carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = 'http://localhost:8080/api/carrito';

  constructor(private http: HttpClient) {}

  agregarProducto(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar`, data);
  }

  obtenerCarrito(idUsuario: string): Observable<Carrito> {
    return this.http.get<Carrito>(`${this.apiUrl}/${idUsuario}`);
  }

  eliminarItem(idCarritoItem: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar/${idCarritoItem}`);
  }

  vaciarCarrito(idUsuario: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/vaciar/${idUsuario}`);
  }

  comprar(idUsuario: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/comprar/${idUsuario}`, {});
  }
}
