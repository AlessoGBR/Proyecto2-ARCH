import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../../../../Objects/Pedido/pedido';
import { PedidoService } from '../../../../../Services/Pedido/pedido-service';
@Component({
  selector: 'app-pedidos',
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css',
})
export class Pedidos implements OnInit {
  
  pedidos: Pedido[] = [];
  cargando = true;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    const idUsuario = Number(localStorage.getItem('idUsuario'));
    if (idUsuario) {
      this.pedidoService.obtenerPedidosPorUsuario(idUsuario).subscribe({
        next: (data) => {
          this.pedidos = data;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al cargar pedidos:', err);
          this.cargando = false;
        },
      });
    }
  }
}
