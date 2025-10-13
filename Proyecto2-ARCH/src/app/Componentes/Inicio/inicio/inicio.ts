import { Component , OnInit} from '@angular/core';
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
@Component({
  selector: 'app-inicio',
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule, ProductoCard],
  standalone: true,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
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

  constructor(private productosService: ProductosService, private router: Router, 
    private categoriasService: CategoriaService, private authService: Auth) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const ruta = event.urlAfterRedirects;
      if ( ruta.startsWith('/admin') || ruta.startsWith('/moderador') || ruta.startsWith('/logistica')) {
        this.mostarHeader = false;
      } else {
        this.mostarHeader = true;
      }
      if (ruta.startsWith('/login') || ruta.startsWith('/Perfil')|| ruta.startsWith('/admin') || ruta.startsWith('/moderador') || ruta.startsWith('/logistica')) {
        this.mostarArticulos = false;
      } else {
        this.mostarArticulos = true;
      }

      this.actualizarEstadoUsuario();
    });
  }
  
  ngOnInit() {
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('rol');
    localStorage.removeItem('token');
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
        this.categoriasAgrupadas = this.agruparEnFilas(data, 4);
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

      /*this.productosService.obtenerProductosNoAprobados(+idUsuario).subscribe({
        next: (data) => {
          this.productosUsuarioNoAprobados = this.agruparEnFilas(data, 3);
        },
        error: (err) => console.error('Error al cargar productos no aprobados:', err)
      }); */
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

}
