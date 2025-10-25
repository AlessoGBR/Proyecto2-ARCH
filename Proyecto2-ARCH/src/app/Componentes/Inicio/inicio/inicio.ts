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
@Component({
  selector: 'app-inicio',
  imports: [CommonModule, FormsModule, ProductoCard],
  standalone: true,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  usuarioActivo = !!localStorage.getItem('token');
  productos: any[] = [];

  categorias: Categoria[] = [];
  categoriasAgrupadas: Categoria[][] = [];

  productosAprobados: Producto[] = [];
  productosAprobadosAgrupados: Producto[][] = [];

  productosUsuario: Producto[] = [];
  productosUsuarioAgrupados: Producto[][] = [];
  productosUsuarioNoAprobados: Producto[][] = [];

  private readonly ITEMS_POR_SLIDE = {
    categorias: 6,
    productos: 5,
    productosMovil: 3,
  };

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private categoriasService: CategoriaService,
    private authService: Auth
  ) {}

  ngOnInit() {
    this.cargarCategorias();
    this.cargarProductosAprobados();
    this.ajustarItemsPorPantalla();    
  }

  private cargarCategorias(): void {
    this.categoriasService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.categoriasAgrupadas = this.agruparParaCarrusel(data, this.ITEMS_POR_SLIDE.categorias);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las categorías.',
          timer: 3000,
        });
      },
    });
  }

  private cargarProductosAprobados(): void {
    this.productosService.obtenerProductos().subscribe({
      next: (data) => {
        this.productosAprobados = data;
        this.productosAprobadosAgrupados = this.agruparParaCarrusel(
          data,
          this.ITEMS_POR_SLIDE.productos
        );
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los productos.',
          timer: 3000,
        });
      },
    });
  }

  private agruparParaCarrusel<T>(lista: T[], itemsPorSlide: number): T[][] {
    if (!lista || lista.length === 0) {
      return [];
    }

    const grupos: T[][] = [];
    for (let i = 0; i < lista.length; i += itemsPorSlide) {
      grupos.push(lista.slice(i, i + itemsPorSlide));
    }
    return grupos;
  }

  private ajustarItemsPorPantalla(): void {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;

      if (width < 576) {
        this.reagruparTodo(2, 2);
      } else if (width < 768) {
        this.reagruparTodo(3, 3);
      } else if (width < 992) {
        this.reagruparTodo(4, 4);
      }
    }
  }

  private reagruparTodo(itemsCategorias: number, itemsProductos: number): void {
    if (this.categorias.length > 0) {
      this.categoriasAgrupadas = this.agruparParaCarrusel(this.categorias, itemsCategorias);
    }
    if (this.productosAprobados.length > 0) {
      this.productosAprobadosAgrupados = this.agruparParaCarrusel(
        this.productosAprobados,
        itemsProductos
      );
    }
    if (this.productosUsuario.length > 0) {
      this.productosUsuarioAgrupados = this.agruparParaCarrusel(
        this.productosUsuario,
        itemsProductos
      );
    }
  }

  irACuenta(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/Perfil']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.usuarioActivo = false;

    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión exitosamente.',
      timer: 2000,
      showConfirmButton: false,
    });

    this.productosUsuario = [];
    this.productosUsuarioAgrupados = [];
    this.productosUsuarioNoAprobados = [];

    this.router.navigate(['/login']);
  }

  verCategoria(categoria: Categoria): void {
    this.router.navigate(['/buscar-categoria', categoria.idCategoria]);
  }

  hayCategorias(): boolean {
    return this.categorias.length > 0;
  }

  getTotalSlides(grupos: any[][]): number {
    return grupos.length;
  }

  mostrarControles(grupos: any[][]): boolean {
    return grupos.length > 1;
  }

  getInitial(nombreCategoria: string): string {
    if (!nombreCategoria || nombreCategoria.trim() === '') {
      return '?';
    }
    return nombreCategoria.trim().charAt(0).toUpperCase();
  }
}
