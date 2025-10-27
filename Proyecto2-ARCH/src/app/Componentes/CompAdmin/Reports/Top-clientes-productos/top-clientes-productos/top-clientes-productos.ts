import { Component } from '@angular/core';
import { ReporteService } from '../../../../../Services/Reports/reporte-service';
import { CommonModule } from '@angular/common';
import { TopClientesProducto } from '../../../../../Objects/Reports/TopClientesProductos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-top-clientes-productos',
  imports: [CommonModule],
  templateUrl: './top-clientes-productos.html',
  styleUrl: './top-clientes-productos.css',
})
export class TopClientesProductos {
  clientes: TopClientesProducto[] = [];
  cargando = false;

  constructor(private reportesService: ReporteService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    this.reportesService.obtenerTopClientesProductos().subscribe({
      next: (data) => {
        this.clientes = data;
        this.cargando = false;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar el reporte.',
        });
        this.cargando = false;
      },
    });
  }
}
