import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../Objects/Producto/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  obtenerProducto(id: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/${id}`);
  }

  obtenerProductosNoAprobados(id: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/no-aprobados`);
  }

  buscarProductos(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/buscar`, { params: { nombre } });
  }

  crearProductoForm(form: FormData): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/crear`, form);
  }
}
