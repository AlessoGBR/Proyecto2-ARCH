import { Component } from '@angular/core';
import { Producto } from '../../../../Objects/Producto/producto';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../../../Services/Productos/productos-service';
import { CategoriaService } from '../../../../Services/Inicio/categoria-service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Categoria } from '../../../../Objects/Categorias/categoria';

@Component({
  selector: 'app-buscar-categoria',
  imports: [CommonModule],
  templateUrl: './buscar-categoria.html',
  styleUrl: './buscar-categoria.css',
})
export class BuscarCategoria {
  productos: Producto[] = [];
  terminoBusqueda: string = '';
  categoria: Categoria | null = null;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductosService,
    private router: Router,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.terminoBusqueda = id;
          this.buscarProductosPorCategoria(id);
          this.buscarCategoria(id);
        }
      },
      error: (err) => console.error('Error al leer los parámetros:', err),
    });
  }

  buscarProductosPorCategoria(idCategoria: string): void {
    this.productoService.buscarProductosPorCategoria(idCategoria).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.productos = data;
        } else {          
          this.productos = [];
        }
      },
      error: (err) => {
        console.error('Error al buscar productos:', err);        
      },
    });
  }

  buscarCategoria(idCategoria: string): void {
    this.categoriaService.obtenerCategoria(idCategoria).subscribe({
      next: (data) => {
        this.categoria = data;
      },
      error: (err) => {
        console.error('Error al obtener la categoría:', err);        
      },
    });
  }

  comprar(id: number) {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Debe iniciar sesión para comprar este producto',
        showConfirmButton: true,
      });
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/view-product', id]);
    }
  }
}
