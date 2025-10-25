import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../../../../Services/Productos/productos-service';
import { Producto } from '../../../../../Objects/Producto/producto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css',
})
export class EditProduct {
  producto!: Producto;
  cantidad: number = 1;

  constructor(private route: ActivatedRoute, private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productosService.obtenerProducto(id).subscribe({
        next: (data) => (this.producto = data),
        error: (err) => console.error('Error al obtener producto:', err),
      });
    }
  }

  guardarCambios(): void {
    this.producto.estadoAprobacion = 'pendiente';
    this.productosService.actualizarProducto(this.producto).subscribe({
      next: (data) => {
        console.log('Producto actualizado:', data);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El producto ha sido actualizado correctamente.',
        });
        this.router.navigate(['/Perfil']);
      },
      error: (err) =>
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al actualizar el producto.',
        }),
    });
  }

  cancelar(): void {
    this.router.navigate(['/Perfil']);
  }
}
