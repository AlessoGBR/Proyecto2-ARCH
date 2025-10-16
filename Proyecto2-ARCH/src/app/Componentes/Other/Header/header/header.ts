import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../../../Services/auth';
import Swal from 'sweetalert2';
import { Producto } from '../../../../Objects/Producto/producto';
import { ProductosService } from '../../../../Services/Productos/productos-service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  busquedaNombre: string = '';
  usuarioActivo = !!localStorage.getItem('token');
  productosFiltrados: Producto[] = [];
  productosFiltradosAgrupados: Producto[][] = [];
  nombreUsuario: string = 'MI CUENTA';

  constructor(private authService: Auth, private productosService: ProductosService) {}

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
          this.nombreUsuario = usuario.nombre + ' '+usuario.apellido;
        },
        error: (error) => {
          console.error('Error al obtener usuario:', error);
          this.nombreUsuario = 'MI CUENTA';
        }
      });
    } else {
      this.nombreUsuario = 'MI CUENTA';
    }
  } 

  buscarPorNombre() {
    if (this.busquedaNombre.trim() === '') {
      this.productosFiltrados = [];
      this.productosFiltradosAgrupados = [];
      return;
    }
    this.productosService.buscarProductos(this.busquedaNombre).subscribe({
      next: (data) => {
        this.productosFiltrados = data;
        this.productosFiltradosAgrupados = this.agruparEnFilas(data, 3);
      },
    });
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
    const currentPath = window.location.pathname;
    if (token) {
      if (currentPath === '/inicio') {
        window.location.href = '/Perfil';
      } else if (currentPath === '/Perfil') {
        window.location.href = '/inicio';
      } else {
        window.location.href = '/Perfil';
      }
    } else {
      window.location.href = '/login';
    }
  }

  private agruparEnFilas<T>(lista: T[], tamano: number): T[][] {
    const grupos: T[][] = [];
    for (let i = 0; i < lista.length; i += tamano) {
      grupos.push(lista.slice(i, i + tamano));
    }
    return grupos;
  }
}
