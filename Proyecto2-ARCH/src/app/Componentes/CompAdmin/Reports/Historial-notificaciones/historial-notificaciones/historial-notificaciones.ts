import { Component, OnInit } from '@angular/core';
import { HistorialNotificacion } from '../../../../../Objects/Reports/HistorialNotificacion';
import { ReporteService } from '../../../../../Services/Reports/reporte-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial-notificaciones',
  imports: [CommonModule],
  templateUrl: './historial-notificaciones.html',
  styleUrl: './historial-notificaciones.css',
})
export class HistorialNotificaciones implements OnInit {
  notificaciones: HistorialNotificacion[] = [];
  cargando = false;
  error: string | null = null;

  constructor(private reportesService: ReporteService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.cargando = true;
    this.reportesService.obtenerHistorialNotificaciones().subscribe({
      next: (data) => {
        this.notificaciones = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron obtener las notificaciones.';
        this.cargando = false;
      },
    });
  }
}
