import { Component, OnInit } from '@angular/core';
import { Pedido } from '../../../../Objects/Pedido/pedido';
import { DetallePedido } from '../../../../Objects/Pedido/detalle-pedido';
import { PedidoService } from '../../../../Services/Pedido/pedido-service';
import { CarritoService } from '../../../../Services/Cart/carrito-service';
import Swal from 'sweetalert2';
import { TarjetaService } from '../../../../Services/Tarjeta/tarjeta-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { tarjeta } from '../../../../Objects/Tarjeta/tarjeta';
import { Carrito } from '../../../../Objects/Cart/carrito';

@Component({
  selector: 'app-finalizar-compra',
  imports: [CommonModule, FormsModule],
  templateUrl: './finalizar-compra.html',
  styleUrl: './finalizar-compra.css',
})
export class FinalizarCompra implements OnInit {
  direccion = '';
  ciudad = '';
  telefono = '';
  tarjetas: tarjeta[] = [];
  tarjetaSeleccionada: tarjeta | null = null;
  carrito: Carrito | null = null;
  total = 0;

  constructor(
    private pedidoService: PedidoService,
    private tarjetaService: TarjetaService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.direccion = localStorage.getItem('direccion') || '';
    const idUsuario = localStorage.getItem('idUsuario') || '';
    const idUsuarioNum = Number(idUsuario);

    this.tarjetaService.obtenerTarjetas(idUsuarioNum).subscribe({
      next: (data) => (this.tarjetas = data),
    });

    this.carritoService.obtenerCarrito(idUsuario).subscribe({
      next: (data) => {
        this.carrito = data;
        this.calcularTotal();
      },
      error: (err) => {
        console.error('Error al obtener carrito:', err);
      },
    });
  }

  calcularTotal(): void {
    this.total =
      this.carrito?.items.reduce((sum, item) => sum + item.precioUnitario * item.cantidad, 0) || 0;
  }

  seleccionarTarjeta(tarjeta: tarjeta): void {
    this.tarjetaSeleccionada = tarjeta;
  }

  volver(): void {
    window.location.href = '/carrito';
  }

  async realizarCompra(): Promise<void> {
    if (!this.validarDatos()) {
      return;
    }

    const confirmacion = await Swal.fire({
      title: '¿Confirmar pedido?',
      html: `
        <div style="text-align: left;">
          <p><strong>Total a pagar:</strong> Q${this.total.toFixed(2)}</p>
          <p><strong>Dirección:</strong> ${this.direccion}, ${this.ciudad}</p>
          <p><strong>Método de pago:</strong> •••• ${this.tarjetaSeleccionada?.ultimos4Digitos}</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#667eea',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
    });

    if (!confirmacion.isConfirmed) {
      return;
    }

    this.procesarPedido();
  }

  private procesarPedido(): void {
    const idUsuario = Number(localStorage.getItem('idUsuario'));

    if (!this.carrito || !this.carrito.items || this.carrito.items.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No hay productos en el carrito',
        confirmButtonColor: '#667eea',
      });
      return;
    }

    const detalles: DetallePedido[] = this.carrito.items.map((item) => ({
      producto: { idProducto: item.idProducto },
      vendedor: { idUsuario: item.idVendedor },
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario,
      subtotal: item.precioUnitario * item.cantidad,
    }));
    if (!this.tarjetaSeleccionada || typeof this.tarjetaSeleccionada.id !== 'number') {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Tarjeta inválida. Por favor selecciona una tarjeta válida.',
        confirmButtonColor: '#667eea',
      });
      return;
    }

    const idTarjetaNum: number = this.tarjetaSeleccionada.id;

    this.pedidoService.crearPedido(idUsuario, idTarjetaNum, this.direccion, detalles).subscribe({
      next: (response) => {
        Swal.close();
        this.mostrarExito();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo completar la compra. Por favor intenta nuevamente.',
          confirmButtonColor: '#667eea',
        });
      },
    });
  }

  validarDatos(): boolean {
    if (!this.direccion || this.direccion.trim() === '') {
      this.mostrarError('Por favor ingresa una dirección de entrega');
      return false;
    }

    if (!this.ciudad || this.ciudad.trim() === '') {
      this.mostrarError('Por favor ingresa la ciudad');
      return false;
    }

    if (!this.telefono || this.telefono.trim() === '') {
      this.mostrarError('Por favor ingresa un teléfono de contacto');
      return false;
    }

    if (!this.tarjetaSeleccionada) {
      this.mostrarError('Por favor selecciona un método de pago');
      return false;
    }

    if (!this.carrito || this.carrito.items.length === 0) {
      this.mostrarError('No hay productos en el carrito');
      return false;
    }

    return true;
  }

  private mostrarExito(): void {
    const id = localStorage.getItem('idUsuario') || '';
    Swal.fire({
      icon: 'success',
      title: '¡Pedido realizado!',
      html: `
        <div style="text-align: center;">
          <p style="font-size: 1.1rem; margin: 1rem 0;">Tu pedido ha sido procesado exitosamente</p>
          <p style="color: #666;">Recibirás un correo de confirmación con los detalles de tu pedido</p>
        </div>
      `,
      confirmButtonColor: '#667eea',
      confirmButtonText: 'Ver mis pedidos',
    }).then(() => {
      this.carritoService.vaciarCarrito(id).subscribe({
        next: () => {
          window.location.href = '/Perfil';
        },
        error: (err) => {
          window.location.href = '/Perfil ';
        },
      });
    });
  }

  private mostrarError(mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      confirmButtonColor: '#053d23d8',
    });
  }
}
