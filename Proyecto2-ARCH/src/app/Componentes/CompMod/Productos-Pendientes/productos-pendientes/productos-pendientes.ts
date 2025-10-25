import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Producto } from '../../../../Objects/Producto/producto';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../../../Services/Productos/productos-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos-pendientes',
  imports: [CommonModule],
  templateUrl: './productos-pendientes.html',
  styleUrl: './productos-pendientes.css',
})
export class ProductosPendientes implements OnInit {
  productosPendientes: Producto[] = [];

  constructor(private productoService: ProductosService, private router: Router
  ) {}

  ngOnInit() {
    this.cargarProductosPendientes();
  }

  cargarProductosPendientes() {
    this.productoService.obtenerProductosNoAprobados(0).subscribe({
      next: (data) => {
        this.productosPendientes = data;
      },
      error: (error) => {
        console.error('Error al cargar productos pendientes:', error);
      },
    });
  }

  verDetalle(producto: Producto) {
    this.router.navigate(['/mod/revisar-productos/', producto.id]);
  }

  regresar(){
    this.router.navigate(['/mod']);
  }
}
