import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environment/enviroment';
import { ReporteProducto } from '../../Objects/Producto/ReporteProducto';
import { TopVendedor } from '../../Objects/Reports/TopVendedor';
import { TopClienteGanancia } from '../../Objects/Reports/TopClientesGanancia';
import { TopClientesPedido } from '../../Objects/Reports/TopClientesPedidos';
import { TopClientesProductos } from '../../Componentes/CompAdmin/Reports/Top-clientes-productos/top-clientes-productos/top-clientes-productos';
import { TopClientesProducto } from '../../Objects/Reports/TopClientesProductos';
import { HistorialSancion } from '../../Objects/Reports/Historialsancion';
import { HistorialNotificacion } from '../../Objects/Reports/HistorialNotificacion';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  private apiUrl = `${environment.apiUrl}/reportes`;
  constructor(private http: HttpClient) {}

  obtenerTopProductos(inicio: string, fin: string): Observable<ReporteProducto[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);

    return this.http.get<ReporteProducto[]>(`${this.apiUrl}/top-productos`, { params });
  }

  obtenerTopVendedores(inicio: string, fin: string): Observable<TopVendedor[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);
    return this.http.get<TopVendedor[]>(`${this.apiUrl}/top-vendedores`, { params });
  }

  obtenerTopClientesGanancias(inicio: string, fin: string): Observable<TopClienteGanancia[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);
    return this.http.get<TopClienteGanancia[]>(`${this.apiUrl}/top-clientes-ganancias`, { params });
  }

  obtenerTopClientesPedidos(inicio: string, fin: string): Observable<TopClientesPedido[]> {
    const params = new HttpParams().set('inicio', inicio).set('fin', fin);
    return this.http.get<TopClientesPedido[]>(`${this.apiUrl}/top-clientes-pedidos`, { params });
  }

  obtenerTopClientesProductos(): Observable<TopClientesProducto[]> {
    return this.http.get<TopClientesProducto[]>(`${this.apiUrl}/top-clientes-productos`);
  }

  obtenerHistorialSanciones(): Observable<HistorialSancion[]> {
    return this.http.get<HistorialSancion[]>(`${this.apiUrl}/historial-sanciones`);
  }

  obtenerHistorialNotificaciones(): Observable<HistorialNotificacion[]> {
    return this.http.get<HistorialNotificacion[]>(`${this.apiUrl}/historial-notificaciones`);
  }
}
