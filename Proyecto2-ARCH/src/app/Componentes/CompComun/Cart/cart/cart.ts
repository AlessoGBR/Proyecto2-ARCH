import { Component } from '@angular/core';
import { CarritoService } from '../../../../Services/Cart/carrito-service';
import Swal from 'sweetalert2';
import { CarritoItem } from '../../../../Objects/Cart/carrito-item';
import { Carrito } from '../../../../Objects/Cart/carrito';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  idUsuario = localStorage.getItem('idUsuario') || '';
  carrito: Carrito | null = null;
  total = 0;
  subtotal: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito(): void {
    this.carritoService.obtenerCarrito(this.idUsuario).subscribe({
      next: (data) => {
        this.carrito = data;
        this.calcularTotal();
      },
      error: (err) => {
        console.error('Error al obtener carrito:', err);
      },
    });
  }

  calcularTotal(): void {
    this.total =
      this.carrito?.items.reduce((sum, item) => sum + item.precioUnitario * item.cantidad, 0) || 0;
  }

  eliminarItem(item: CarritoItem): void {
    Swal.fire({
      title: '¿Eliminar producto?',
      text: `¿Deseas eliminar "${item.nombreProducto}" del carrito?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.carritoService.eliminarItem(item.idCarritoItem).subscribe({
        next: () => {
          Swal.fire('Eliminado', 'Producto eliminado del carrito', 'success');
          this.cargarCarrito();
        },
        error: (err) => {
          if (err && err.status === 200) {
            Swal.fire('Eliminado', 'Producto eliminado del carrito', 'success');
            this.cargarCarrito();
            return;
          }
          Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
        },
        complete: () => {
          console.log('Observable complete');
        },
      });
    });
  }

  vaciarCarrito(): void {
    Swal.fire({
      title: '¿Vaciar carrito?',
      text: 'Se eliminarán todos los productos del carrito',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.carritoService.vaciarCarrito(this.idUsuario).subscribe(() => {
          Swal.fire('Carrito vaciado', '', 'success');
          this.cargarCarrito();
        });
      }
    });
  }

  realizarPago(): void {
    window.location.href = '/finalizar-compra';
  }

  irInicio(): void {
    window.location.href = '/inicio';
  }
}
