import { Component } from '@angular/core';
import { ReporteService } from '../../../../../Services/Reports/reporte-service';
import { TopClienteGanancia } from '../../../../../Objects/Reports/TopClientesGanancia';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top-clientes-ganancia',
  imports: [CommonModule,FormsModule],
  templateUrl: './top-clientes-ganancia.html',
  styleUrl: './top-clientes-ganancia.css',
})
export class TopClientesGanancia {
  fechaInicio: string = '';
  fechaFin: string = '';
  clientes: TopClienteGanancia[] = [];
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

    this.reportesService.obtenerTopClientesGanancias(this.fechaInicio, this.fechaFin).subscribe({
      next: (data) => {
        this.clientes = data;
        this.cargando = false;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo generar el reporte',
        });
        this.cargando = false;
      },
    });
  }
}
