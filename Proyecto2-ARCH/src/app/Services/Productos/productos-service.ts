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

  obtenerProduct(id: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/${id}`);
  }

  obtenerProducto(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/producto/${id}`);
  }

  obtenerProductosNoAprobados(id: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/no-aprobados`);
  }

  obtenerProductosDenegados(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/denegados`);
  }

  obtenerProductosDenegadosId(id: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/denegados/${id}`);
  }

  buscarProductos(nombre: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/buscar?nombre=${nombre}`);
  }

  buscarProductosPorCategoria(categoriaId: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}/categoria/${categoriaId}`);
  }

  crearProductoForm(form: FormData): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/crear`, form);
  }

  actualizarProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/actualizar/${producto.id}`, producto);
  }

  actualizarEstado(producto: Producto, estado: string): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/actualizar/${producto.id}/${estado}`, producto);
  }
}
