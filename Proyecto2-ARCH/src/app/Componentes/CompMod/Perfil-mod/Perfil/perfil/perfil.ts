import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../../../Services/auth';
import Swal from 'sweetalert2';
import { user } from '../../../../../Objects/User/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {

  usuario: user | null = null;
  editMode: boolean = false;

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit() {
    this.cargarUsuario();
  }

  private cargarUsuario() {
    this.auth.obtenerUsuario(localStorage.getItem('idUsuario') || '').subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: (error) => {
        console.error('Error al cargar el usuario:', error);
      },
    });
  }

  guardar() {
    if (this.usuario) {
      this.auth.actualizarUsuario(this.usuario, localStorage.getItem('idUsuario') || '').subscribe({
        next: (data) => {
          this.usuario = data;
          this.editMode = false;
          Swal.fire('Éxito', 'Perfil actualizado correctamente.', 'success');
        },
        error: (error) => {
          Swal.fire('Error', 'Error al actualizar el perfil.', 'error');
        },
      });
    }
  }

  cancelar() {
    this.editMode = false;
    this.cargarUsuario();
  }
}
