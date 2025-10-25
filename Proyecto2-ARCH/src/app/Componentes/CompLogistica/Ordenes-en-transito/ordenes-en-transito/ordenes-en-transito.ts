import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../../../Objects/Pedido/pedido';
import { PedidoService } from '../../../../Services/Pedido/pedido-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordenes-en-transito',
  imports: [CommonModule, FormsModule],
  templateUrl: './ordenes-en-transito.html',
  styleUrl: './ordenes-en-transito.css',
})
export class OrdenesEnTransito implements OnInit {
  pedidos: Pedido[] | [] = [];
  fechaNueva: { [id: number]: string } = {};

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.obtenerPedidosEnCurso().subscribe({
      next: (data) => (this.pedidos = data),
      error: (err) => console.error('Error al obtener pedidos en curso', err),
    });
  }

  marcarEntregado(id: number): void {
    Swal.fire({
      title: '¿Marcar como entregado?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, entregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidoService.actualizarEntrega(id).subscribe({
          next: () => {
            Swal.fire('Entregado', 'El pedido ha sido marcado como entregado', 'success');
            this.cargarPedidos();
          },
          error: (err) => {
            console.error('Error al marcar como entregado:', err);
          },
        });
      }
    });
  }

  actualizarFecha(id: number): void {
    const fecha = this.fechaNueva[id];
    if (!fecha) return;

    this.pedidoService.actualizarFechaEntrega(id, fecha).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'La fecha de entrega ha sido modificada', 'success');
        this.cargarPedidos();
      },
      error: (err) => console.error('Error al actualizar fecha:', err),
    });
  }

  regresar(){
    this.router.navigate(['/logistica']);
  }
}
