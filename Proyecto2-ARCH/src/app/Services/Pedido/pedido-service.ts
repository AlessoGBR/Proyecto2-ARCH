import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../../Objects/Pedido/pedido';
import { DetallePedido } from '../../Objects/Pedido/detalle-pedido';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private apiUrl = 'http://localhost:8080/api/pedidos';

  constructor(private http: HttpClient) {}

  crearPedido(idUsuario: number, idTarjeta: number, direccion: string, detalles: DetallePedido[]): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}/crear?idUsuario=${idUsuario}&idTarjeta=${idTarjeta}&direccion=${direccion}`, detalles);
  }

  obtenerPedidosPorUsuario(idUsuario: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }
}
