import { Component } from '@angular/core';
import { ReporteService } from '../../../../../Services/Reports/reporte-service';
import { HistorialSancion } from '../../../../../Objects/Reports/Historialsancion';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-sanciones',
  imports: [CommonModule],
  templateUrl: './historial-sanciones.html',
  styleUrl: './historial-sanciones.css',
})
export class HistorialSanciones {
  sanciones: HistorialSancion[] = [];
  cargando = false;

  constructor(private reportesService: ReporteService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    this.reportesService.obtenerHistorialSanciones().subscribe({
      next: (data) => {
        this.sanciones = data;
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
