import { Component } from '@angular/core';
import { PedidoService } from '../../../../Services/Pedido/pedido-service';
import { Pedido } from '../../../../Objects/Pedido/pedido';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordenes-entregadas',
  imports: [CommonModule, FormsModule],
  templateUrl: './ordenes-entregadas.html',
  styleUrl: './ordenes-entregadas.css',
})
export class OrdenesEntregadas {
  pedidos: Pedido[] | [] = [];
  fechaNueva: { [id: number]: string } = {};

  constructor(private pedidoService: PedidoService, private router: Router) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.obtenerPedidosEntregados().subscribe({
      next: (data) => (this.pedidos = data),
      error: (err) => console.error('Error al obtener pedidos en curso', err),
    });
  }

  regresar(){
    this.router.navigate(['/logistica']);
  }
 
}
