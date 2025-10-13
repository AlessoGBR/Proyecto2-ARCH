import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoCard } from '../../Producto-card/producto-card/producto-card';
import { ProductosService } from '../../../../Services/Productos/productos-service';

@Component({
  selector: 'app-ver-articulos',
  imports: [ProductoCard, CommonModule, FormsModule, RouterLink],
  templateUrl: './ver-articulos.html',
  styleUrl: './ver-articulos.css'
})
export class VerArticulos implements OnInit {
productos: any[] = [];

constructor(private productosService: ProductosService) {
  }

ngOnInit() {
    this.productosService.obtenerProductos().subscribe({      
      next: (data) => (this.productos = data),
      error: (err) => console.error('Error al cargar productos', err)
    });
  }
}
