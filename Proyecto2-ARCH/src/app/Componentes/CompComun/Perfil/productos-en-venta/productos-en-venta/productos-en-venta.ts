import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../../../../Services/Productos/productos-service';
import { Producto } from '../../../../../Objects/Producto/producto';

@Component({
  selector: 'app-productos-en-venta',
  imports: [CommonModule],
  templateUrl: './productos-en-venta.html',
  styleUrl: './productos-en-venta.css',
})
export class ProductosEnVenta implements OnInit {
  productos: Producto[] = [];
  productosNoAprobados: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    const idUsuario = localStorage.getItem('idUsuario');
    if (idUsuario) {
      this.productosService.obtenerProducto(+idUsuario).subscribe({
        next: (data) => (this.productos = data),
        error: (err) => console.error('Error al obtener productos del usuario:', err),
      });
      this.productosService.obtenerProductosNoAprobados(+idUsuario).subscribe({
        next: (data) => (this.productosNoAprobados = data),
        error: (err) => console.error('Error al obtener productos no aprobados:', err),
      });
    }
  }

  onProductoClick(producto: Producto, index: number) {
    console.log('ID del producto:', producto.id);
  }
}
