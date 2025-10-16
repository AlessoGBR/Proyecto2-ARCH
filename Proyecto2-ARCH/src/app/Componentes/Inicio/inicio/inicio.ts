import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoCard } from '../../CompComun/Producto-card/producto-card/producto-card';
import { ProductosService } from '../../../Services/Productos/productos-service';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { CategoriaService } from '../../../Services/Inicio/categoria-service';
import { Categoria } from '../../../Objects/Categorias/categoria';
import { Producto } from '../../../Objects/Producto/producto';
import { Auth } from '../../../Services/auth';
import Swal from 'sweetalert2';
import { Header } from '../../Other/Header/header/header';
@Component({
  selector: 'app-inicio',
  imports: [CommonModule, FormsModule, ProductoCard, Header],
  standalone: true,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  usuarioActivo = !!localStorage.getItem('token');
  productos: any[] = [];
  mostarHeader: boolean = true;
  mostarArticulos: boolean = true;
  categorias: Categoria[] = [];
  categoriasAgrupadas: Categoria[][] = [];
  productosAprobados: Producto[] = [];
  productosAprobadosAgrupados: Producto[][] = [];
  productosUsuario: Producto[] = [];
  productosUsuarioAgrupados: Producto[][] = [];
  productosUsuarioNoAprobados: Producto[][] = [];
  busquedaNombre: string = '';
  productosFiltrados: Producto[] = [];
  productosFiltradosAgrupados: Producto[][] = [];

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private categoriasService: CategoriaService,
    private authService: Auth
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.actualizarEstadoUsuario();
      });
  }

  ngOnInit() {
    this.actualizarEstadoUsuario();
    this.cargarCategorias();
    this.cargarProductosAprobados();
  }

  private actualizarEstadoUsuario() {
    this.usuarioActivo = this.authService.estaAutenticado();
    if (this.usuarioActivo) {
      this.cargarProductosUsuario();
    }
  }

  private cargarCategorias() {
    this.categoriasService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.categoriasAgrupadas = this.agruparEnFilas(data, 3);
      },
    });
  }

  private cargarProductosAprobados() {
    this.productosService.obtenerProductos().subscribe({
      next: (data) => {
        this.productosAprobados = data;
        this.productosAprobadosAgrupados = this.agruparEnFilas(data, 3);
      },
    });
  }

  private cargarProductosUsuario() {
    const idUsuario = localStorage.getItem('idUsuario');
    if (idUsuario) {
      this.productosService.obtenerProducto(+idUsuario).subscribe({
        next: (data) => {
          this.productosUsuario = data;
          this.productosUsuarioAgrupados = this.agruparEnFilas(data, 3);
        },
      });

      this.productosService.obtenerProductosNoAprobados(+idUsuario).subscribe({
        next: (data) => {
          this.productosUsuarioNoAprobados = this.agruparEnFilas(data, 3);
        },
      });
    }
  }

  private agruparEnFilas<T>(lista: T[], tamano: number): T[][] {
    const grupos: T[][] = [];
    for (let i = 0; i < lista.length; i += tamano) {
      grupos.push(lista.slice(i, i + tamano));
    }
    return grupos;
  }

  irACuenta() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/Perfil']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion() {
    this.authService.logout();
    this.usuarioActivo = false;
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión exitosamente.',
      timer: 2000,
      showConfirmButton: false,
    });
    this.router.navigate(['/login']);
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

  limpiarBusqueda() {
    this.busquedaNombre = '';
    this.productosFiltrados = [];
    this.productosFiltradosAgrupados = [];
  }
}
