import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../../Services/auth';
import Swal from 'sweetalert2';
import { ProductosService } from '../../../../Services/Productos/productos-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  busquedaNombre: string = '';
  usuarioActivo = !!localStorage.getItem('token');
  nombreUsuario: string = 'MI CUENTA';
  tipoUsuario: string | null = localStorage.getItem('rol');

  constructor(private authService: Auth, private router: Router) {}

  ngOnInit() {
    this.verificarUsuario();
  }

  private verificarUsuario() {
    const token = localStorage.getItem('token');
    const tipoUsuario = localStorage.getItem('rol');
    const idUsuario = localStorage.getItem('idUsuario');

    if (token && tipoUsuario && idUsuario) {
      this.authService.obtenerUsuario(idUsuario).subscribe({
        next: (usuario) => {
          this.nombreUsuario = usuario.nombre + ' ' + usuario.apellido;
        },
        error: (error) => {
          console.error('Error al obtener usuario:', error);
          this.nombreUsuario = 'MI CUENTA';
        },
      });
    } else {
      this.nombreUsuario = 'MI CUENTA';
    }
  }

  buscarPorNombre() {
    const termino = this.busquedaNombre.trim();

    if (termino === '') return;

    this.router.navigate(['/busqueda'], { queryParams: { nombre: termino } });

    this.busquedaNombre = '';
  }

  cerrarSesion() {
    this.authService.logout();
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión exitosamente.',
      timer: 2000,
      showConfirmButton: false,
    });
    window.location.href = `/inicio`;
  }

  irACuenta() {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    switch (rol) {
      case 'COMUN':
        window.location.href = '/Perfil-comun';
        break;

      case 'MODERADOR':
        this.router.navigate(['mod/perfil-mod']);
        break;

      case 'ADMINISTRADOR':
        this.router.navigate(['admin']);
        break;

      case 'LOGISTICA':
        this.router.navigate(['logistica/perfil-logistica']);
        break;

      default:
        window.location.href = '/inicio';
        break;
    }
  }

  irAInicio() {
    const tipoUsuario = localStorage.getItem('rol');
    if (tipoUsuario === 'MODERADOR') {
      this.router.navigate(['/mod']);
    } else if (tipoUsuario === 'LOGISTICA') {
      this.router.navigate(['/logistica']);
    } else {
      this.router.navigate(['/inicio']);
    }
  }

  irACarrito() {
    window.location.href = '/carrito';
  }
}
