import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TopVendedor } from '../../../../../Objects/Reports/TopVendedor';
import { ReporteService } from '../../../../../Services/Reports/reporte-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-top-clientes-vendedores',
  imports: [CommonModule, FormsModule],
  templateUrl: './top-clientes-vendedores.html',
  styleUrl: './top-clientes-vendedores.css',
})
export class TopClientesVendedores {
  fechaInicio: string = '';
  fechaFin: string = '';
  vendedores: TopVendedor[] = [];
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

    this.reportesService.obtenerTopVendedores(this.fechaInicio, this.fechaFin).subscribe({
      next: (data) => {
        this.vendedores = data;
        this.cargando = false;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo obtener el reporte',
        });
        this.cargando = false;
      },
    });
  }
}
