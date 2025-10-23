import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tarjeta } from '../../Objects/Tarjeta/tarjeta';

@Injectable({
  providedIn: 'root',
})
export class TarjetaService {
  private apiUrl = 'http://localhost:8080/api/tarjetas';

  constructor(private http: HttpClient) {}

  obtenerTarjetas(id: number): Observable<tarjeta[]> {
    return this.http.get<tarjeta[]>(`${this.apiUrl}/${id}`);
  }

  eliminarTarjeta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }

  agregarTarjeta(tarjeta: tarjeta): Observable<tarjeta> {
    return this.http.post<tarjeta>(`${this.apiUrl}/agregar`, tarjeta);
  }

  pasarAPrincipal(id: number, idUsuario: string): Observable<tarjeta> {
    return this.http.put<tarjeta>(`${this.apiUrl}/principal/${idUsuario}/${id}`, {});
  }

}
