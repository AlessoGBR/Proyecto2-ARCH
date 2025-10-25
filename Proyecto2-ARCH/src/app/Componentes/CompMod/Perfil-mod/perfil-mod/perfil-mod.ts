import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateral } from '../Menu-lateral/menu-lateral/menu-lateral';
import { Perfil } from '../Perfil/perfil/perfil';
import Swal from 'sweetalert2';
import { Auth } from '../../../../Services/auth';
import { user } from '../../../../Objects/User/user';

@Component({
  selector: 'app-perfil-mod',
  imports: [CommonModule, MenuLateral, Perfil],
  templateUrl: './perfil-mod.html',
  styleUrl: './perfil-mod.css',
})
export class PerfilMod implements OnInit {
  vistaActual = 'perfil';
  usuario: user | null = null;

  constructor(private authService: Auth) {}

  ngOnInit(): void {
    this.authService.obtenerUsuario(localStorage.getItem('idUsuario') || '').subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo cargar el usuario', 'error');
      },
    });
  }

  cambiarVista(vista: string) {
    this.vistaActual = vista;
  }
}
