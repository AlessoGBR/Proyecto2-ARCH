import { Component } from '@angular/core';
import { ReporteService } from '../../../../../Services/Reports/reporte-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TopClientesPedido } from '../../../../../Objects/Reports/TopClientesPedidos';

@Component({
  selector: 'app-top-clientes-pedidos',
  imports: [CommonModule, FormsModule],
  templateUrl: './top-clientes-pedidos.html',
  styleUrl: './top-clientes-pedidos.css',
})
export class TopClientesPedidos {
  fechaInicio: string = '';
  fechaFin: string = '';
  clientes: TopClientesPedido[] = [];
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

    this.reportesService.obtenerTopClientesPedidos(this.fechaInicio, this.fechaFin).subscribe({
      next: (data) => {
        this.clientes = data;
        this.cargando = false;
      },
      error: () => {
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo generar el reporte.',
      });
        this.cargando = false;
      },
    });
  }
}
