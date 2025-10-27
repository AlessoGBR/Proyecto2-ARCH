import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class SancionesService {
  private apiUrl = `${environment.apiUrl}/sanciones`;

  constructor(private http: HttpClient) {}

  crearSancion(
    idUsuario: string,
    idModerador: number,
    motivo: string,
    fechaFin?: string
  ): Observable<any> {
    const params = new HttpParams()
      .set('idUsuario', idUsuario)
      .set('idModerador', idModerador)
      .set('motivo', motivo)
      .set('fechaFin', fechaFin || '');
    return this.http.post(`${this.apiUrl}/crear`, {}, { params });
  }

  obtenerSancionesPorUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }

  finalizarSancion(idSancion: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/finalizar/${idSancion}`, {});
  }
}
