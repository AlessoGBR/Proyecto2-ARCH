import { Component, Input } from '@angular/core';
import { Producto } from '../../../../Objects/Producto/producto';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-card',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.css',
})
export class ProductoCard {
  @Input() producto!: Producto;

  constructor(private router: Router) {}

  comprar() {
    const rol = localStorage.getItem('rol');
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: 'Debe iniciar sesión para comprar este producto',
        showConfirmButton: true,
      });
      this.router.navigate(['/login']);
    } else if (rol != 'COMUN') {
      Swal.fire({
        icon: 'warning',
        title: 'NO PUEDES COMPRAR SIENDO DE OTRO ROL',
        showConfirmButton: true,
      });
      return;
    } else if (this.producto.stock <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No puedes comprar un producto con stock 0',
        showConfirmButton: true,
      });
    } else {
      this.router.navigate(['/view-product', this.producto.id]);
    }
  }
}
