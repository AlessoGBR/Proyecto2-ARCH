import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../../Objects/Producto/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../../../Services/Productos/productos-service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-revisar-productos',
  imports: [CommonModule, FormsModule],
  templateUrl: './revisar-productos.html',
  styleUrl: './revisar-productos.css',
})
export class RevisarProductos implements OnInit {
  
  producto: Producto | null = null;
  decision: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductosService
  ) {}

  ngOnInit() {
    const productoId = this.route.snapshot.paramMap.get('id');
    if (productoId) {
      this.productoService.obtenerProducto(productoId).subscribe({
        next: (data) => (this.producto = data),
        error: (err) => console.error('Error al cargar producto:', err),
      });
    }
  }

  guardarDecision() {
    if (!this.decision) {
      Swal.fire('Selecciona una acción', '', 'warning');
      return;
    }
    this.producto!.estadoAprobacion = this.decision;
    console.log(this.producto);
    this.productoService.actualizarProducto(this.producto!).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: `Producto ${this.decision}`,
          text: 'El estado del producto fue actualizado correctamente',
        }).then(() => this.router.navigate(['/mod']));
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo actualizar el estado del producto', 'error');
        console.error(err);
      },
    }); 
  }

  regresar(){
    this.router.navigate(['/mod']);
  }
}
