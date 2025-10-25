import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-administrador',
  imports: [],
  templateUrl: './inicio-administrador.html',
  styleUrl: './inicio-administrador.css',
})
export class InicioAdministrador {
  constructor(private router: Router) {}

  reportes() {
    this.router.navigate(['/admin/reportes']);
  }

  usuarios() {
    this.router.navigate(['/admin/usuarios']);
  }

  salir() {
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
