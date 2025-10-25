import { Component, OnInit } from '@angular/core';
import { user } from '../../../../../Objects/User/user';
import { Auth } from '../../../../../Services/auth';
import { CommonModule } from '@angular/common';
import { MenuLateralLogistica } from '../Menu-lateral-logistica/menu-lateral-logistica/menu-lateral-logistica';
import Swal from 'sweetalert2';
import { PerfilLog } from "../perfil/perfil/perfilLog";

@Component({
  selector: 'app-perfil-logistica',
  imports: [MenuLateralLogistica, CommonModule, PerfilLog],
  templateUrl: './perfil-logistica.html',
  styleUrl: './perfil-logistica.css',
})
export class PerfilLogistica implements OnInit {
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
