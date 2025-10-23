import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../../Objects/Producto/producto';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../../../Services/Productos/productos-service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar-articulos',
  imports: [CommonModule],
  templateUrl: './buscar-articulos.html',
  styleUrl: './buscar-articulos.css',
})
export class BuscarArticulos implements OnInit {
  productos: Producto[] = [];
  terminoBusqueda: string = '';

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const nombre = params['nombre'];
      if (nombre) {
        this.terminoBusqueda = nombre;
        this.buscar(nombre);
      }
    });
  }

  buscar(nombre: string) {
    this.productoService.buscarProductos(nombre).subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al buscar productos:', err);
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
