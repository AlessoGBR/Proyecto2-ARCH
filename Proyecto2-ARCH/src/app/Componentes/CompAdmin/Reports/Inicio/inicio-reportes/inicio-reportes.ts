import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-reportes',
  imports: [CommonModule],
  templateUrl: './inicio-reportes.html',
  styleUrl: './inicio-reportes.css'
})
export class InicioReportes {

   reportes = [
    {
      titulo: 'Top 10 productos más vendidos',
      descripcion: 'Consulta los productos más vendidos en un intervalo de tiempo.',
      icon: 'bi bi-bar-chart-fill',
      route: 'admin/reportes/top-productos',
    },
    {
      titulo: 'Top 5 clientes con más ganancias por compras',
      descripcion: 'Clientes que más ganancias han generado por sus compras.',
      icon: 'bi bi-cash-coin',
      route: 'admin/reportes/top-clientes-ganancias',
    },
    {
      titulo: 'Top 5 clientes con más productos vendidos',
      descripcion: 'Clientes con mayor volumen de ventas en un intervalo de tiempo.',
      icon: 'bi bi-bag-check-fill',
      route: 'admin/reportes/top-clientes-vendedores',
    },
    {
      titulo: 'Top 10 clientes con más pedidos realizados',
      descripcion: 'Clientes que más compras han realizado.',
      icon: 'bi bi-receipt',
      route: 'admin/reportes/top-clientes-pedidos',
    },
    {
      titulo: 'Top 10 clientes con más productos en venta',
      descripcion: 'Usuarios que tienen más productos publicados en la plataforma.',
      icon: 'bi bi-box-seam',
      route: 'admin/reportes/top-clientes-productos',
    },
    {
      titulo: 'Historial de sanciones',
      descripcion: 'Visualiza las sanciones aplicadas por los moderadores.',
      icon: 'bi bi-exclamation-triangle-fill',
      route: 'admin/reportes/historial-sanciones',
    },
    {
      titulo: 'Historial de notificaciones',
      descripcion: 'Revisa las notificaciones enviadas a los usuarios.',
      icon: 'bi bi-bell-fill',
      route: 'admin/reportes/historial-notificaciones',
    },
    {
      titulo: 'Regresar',
      descripcion: 'Regresar al inicio.',
      icon: 'bi bi-arrow-right-square-fill',
      route: 'admin',
    }
  ];

  constructor(private router: Router) {}

  abrirReporte(route: string): void {
    this.router.navigate([route]);
  }
}
