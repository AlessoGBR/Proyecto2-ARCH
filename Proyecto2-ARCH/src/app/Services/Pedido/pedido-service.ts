import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../../Objects/Pedido/pedido';
import { DetallePedido } from '../../Objects/Pedido/detalle-pedido';
import { environment } from '../Environment/enviroment';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  
  private apiUrl = `${environment.apiUrl}/pedidos`;

  constructor(private http: HttpClient) {}

  crearPedido(idUsuario: number, idTarjeta: number, direccion: string, detalles: DetallePedido[]): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}/crear?idUsuario=${idUsuario}&idTarjeta=${idTarjeta}&direccion=${direccion}`, detalles);
  }

  obtenerPedidosPorUsuario(idUsuario: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }

  obtenerPedidosEnCurso(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${this.apiUrl}/en-curso`);
  }

  obtenerPedidosEntregados(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${this.apiUrl}/entregados`);
  }

  actualizarEntrega(id :number): Observable<Pedido>{
    return this.http.put<Pedido>(`${this.apiUrl}/entregado/${id}`, {});
  }

  actualizarFechaEntrega(id: number, nuevaFecha: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar-fecha/${id}?nuevaFecha=${nuevaFecha}`, {});
  }
}
