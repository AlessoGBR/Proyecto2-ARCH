import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Auth } from '../../../../../../Services/auth';
import { user } from '../../../../../../Objects/User/user';
@Component({
  selector: 'app-menu-lateral-logistica',
  imports: [],
  templateUrl: './menu-lateral-logistica.html',
  styleUrl: './menu-lateral-logistica.css',
})
export class MenuLateralLogistica implements OnInit {
  @Output() menuSeleccionado = new EventEmitter<string>();
  vista = 'productos';
  usuario: user | null = null;

  constructor(private router: Router, private auth: Auth) {}

  ngOnInit(): void {
    this.auth.obtenerUsuario(localStorage.getItem('idUsuario') || '').subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo encontrar usuario',
          showConfirmButton: true,
        });
      },
    });
  }

  seleccionar(vista: string) {
    this.vista = vista;
    this.menuSeleccionado.emit(vista);
  }

  logout() {
    localStorage.clear();
    Swal.fire({
      icon: 'success',
      title: 'Sesion cerrada',
      showConfirmButton: false,
      timer: 1500,
    });
    this.router.navigate(['/inicio']).then(() => {
      setTimeout(() => window.location.reload(), 1500);
    });
  }
}
