import { Component } from '@angular/core';
import { ReporteService } from '../../../../../Services/Reports/reporte-service';
import { ReporteProducto } from '../../../../../Objects/Producto/ReporteProducto';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top-productos',
  imports: [CommonModule, FormsModule],
  templateUrl: './top-productos.html',
  styleUrl: './top-productos.css',
})
export class TopProductos {
  fechaInicio: string = '';
  fechaFin: string = '';
  productos: ReporteProducto[] = [];
  cargando = false;

  constructor(private reportesService: ReporteService) {}

  buscar() {
    if (!this.fechaInicio || !this.fechaFin) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes de ingresar dos fechas',
      });
      return;
    }

    this.cargando = true;

    this.reportesService.obtenerTopProductos(this.fechaInicio, this.fechaFin).subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo obtener el reporte.',
        });
        this.cargando = false;
      },
    });
  }
}
