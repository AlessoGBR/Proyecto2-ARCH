import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:8080/api/auth'; // URL del backend Spring Boot

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body);
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
}
