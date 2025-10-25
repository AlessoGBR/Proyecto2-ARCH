import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../../../Objects/Producto/producto';
import { ProductosService } from '../../../../Services/Productos/productos-service';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../../../../Services/Cart/carrito-service';
import { Calificacion } from '../../../../Objects/Cart/calificacion';
import { CalificacionService } from '../../../../Services/Calificacion/calificacion-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-product.html',
  styleUrl: './view-product.css',
})
export class ViewProduct implements OnInit {
  producto!: Producto;
  cantidad: number = 1;
  calificaciones: Calificacion[] = [];
  promedio: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private carritoService: CarritoService,
    private calificacionService: CalificacionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productosService.obtenerProducto(id).subscribe({
        next: (data) => (this.producto = data),
        error: (err) => console.error('Error al obtener producto:', err),
      });
      this.cargarCalificaciones(id);
    }
  }

  addToCart() {
    const idUsuario = localStorage.getItem('idUsuario');
    if (!idUsuario) {
      Swal.fire({
        icon: 'warning',
        title: 'Debes iniciar sesión',
        text: 'Por favor inicia sesión para agregar productos al carrito.',
      });
      return;
    }

    this.carritoService
      .agregarProducto({
        idUsuario: Number(idUsuario),
        idProducto: this.producto.id,
        cantidad: this.cantidad,
      })
      .subscribe({
        next: () =>
          Swal.fire({ icon: 'success', title: 'Agregado', text: 'Producto agregado al carrito.' }),
        error: (err) => {
          console.error(err);
          Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo agregar el producto.' });
        },
      });
  }

  refresh() {
    window.location.reload();
  }

  aumentarCantidad() {
    if (this.cantidad < this.producto.stock) {
      this.cantidad++;
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Stock insuficiente',
        text: `Solo hay ${this.producto.stock} unidades disponibles.`,
      });
    }
  }

  disminuirCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
    }
  }

  validarCantidad() {
    if (this.cantidad > this.producto.stock) {
      this.cantidad = this.producto.stock;
      Swal.fire({
        icon: 'info',
        title: 'Límite de stock',
        text: `No puedes agregar más de ${this.producto.stock} unidades.`,
      });
    } else if (this.cantidad < 1) {
      this.cantidad = 1;
    }
  }

  cargarCalificaciones(idProducto: string): void {
    this.calificacionService.obtenerPorProducto(idProducto).subscribe({
      next: (data) => (this.calificaciones = data),
    });

    this.calificacionService.obtenerPromedio(idProducto).subscribe({
      next: (prom) => (this.promedio = prom),
    });
  }
  
}
