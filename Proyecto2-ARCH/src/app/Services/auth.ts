import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../Objects/User/user';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:8080/api/auth'; 

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  obtenerUsuario(idUsuario: string): Observable<user> {     
    return this.http.get<user>(`${this.apiUrl}/${idUsuario}`);
  }

  register(nombre: string, email: string, password: string): Observable<any> {
    const body = { nombre, email, password };
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('idUsuario');
  }

  guardarSesion(token: string, rol: string, idUsuario:string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol);
    localStorage.setItem('idUsuario', idUsuario);
  }

  obtenerRol(): string | null {
    return localStorage.getItem('rol');
  } 

  estaAutenticado(): boolean {
    return !!localStorage.getItem('token');
  }

  actualizarUsuario(usuario: user, id : string): Observable<user> {
    return this.http.put<user>(`${this.apiUrl}/actualizar/${id}`, usuario);
  }
}
