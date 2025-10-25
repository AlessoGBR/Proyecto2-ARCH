import { Component } from '@angular/core';
import { Auth } from '../../../../../Services/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { user } from '../../../../../Objects/User/user';

@Component({
  selector: 'app-ver-usuarios',
  imports: [CommonModule],
  templateUrl: './ver-usuarios.html',
  styleUrl: './ver-usuarios.css',
})
export class VerUsuarios {
  opcionSeleccionada: 'sin' | 'con' = 'sin';
  usuarios: user[] = [];

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    if (this.opcionSeleccionada === 'sin') {
      this.auth.obtenerUsuariosSinSancion().subscribe({
        next: (data) => (this.usuarios = data),
        error: (err) => console.error('Error al cargar usuarios sin sanción:', err),
      });
    } else {
      this.auth.obtenerUsuariosSancionados().subscribe({
        next: (data) => (this.usuarios = data),
        error: (err) => console.error('Error al cargar usuarios sancionados:', err),
      });
    }
  }

  sancionarUsuario(usuario: user) {
    this.router.navigate(['/mod/sanciones/', usuario.id!]);
  }

  quitarSancion(usuario: any) {
    this.router.navigate(['/mod/quitar-sancion/', usuario.id]);
  }

  cambiarOpcion(opcion: 'sin' | 'con') {
    this.opcionSeleccionada = opcion;
    this.cargarUsuarios();
  }
  regresar(){
     this.router.navigate(['/mod']);
  }
}
