import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calificacion } from '../../Objects/Cart/calificacion';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  private apiUrl = 'http://localhost:8080/api/calificaciones';

  constructor(private http: HttpClient) {}

  obtenerPorProducto(idProducto: string): Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(`${this.apiUrl}/producto/${idProducto}`);
  }

  obtenerPromedio(idProducto: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/promedio/${idProducto}`);
  }

  agregarCalificacion(calificacion: Calificacion, id: number, user: string): Observable<Calificacion> {
    return this.http.post<Calificacion>(`${this.apiUrl}/agregar/${id}/${user}`, calificacion);
  }
  
}
