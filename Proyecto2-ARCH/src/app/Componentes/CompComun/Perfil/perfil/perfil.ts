import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Auth } from '../../../../Services/auth';
import Swal from 'sweetalert2';
import { user } from '../../../../Objects/User/user';
import { MenuLateral } from '../menu-lateral/menu-lateral/menu-lateral';
import { ProductosEnVenta } from '../productos-en-venta/productos-en-venta/productos-en-venta';
import { TarjetasGuardadas } from '../tarjetas-guardadas/tarjetas-guardadas/tarjetas-guardadas';
import { PerfilUsuario } from '../perfil-usuario/perfil-usuario/perfil-usuario';
import { Vender } from '../vender/vender/vender';
import { Pedidos } from '../pedidos/pedidos/pedidos';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-perfil',
  imports: [ MenuLateral, ProductosEnVenta, TarjetasGuardadas, PerfilUsuario, Pedidos, CommonModule, Vender],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  usuarioActivo = !!localStorage.getItem('token');
  usuario: user | null = null;
  vistaActual = 'productos';

  constructor( private authService: Auth) {}

  ngOnInit() {
    this.authService.obtenerUsuario(localStorage.getItem('idUsuario') || '').subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo cargar el usuario', 'error');
      },
    });
  }

  cambiarVista(vista: string) {
    this.vistaActual = vista;
  }
}
