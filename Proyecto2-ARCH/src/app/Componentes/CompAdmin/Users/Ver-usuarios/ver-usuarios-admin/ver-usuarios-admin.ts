import { Component } from '@angular/core';
import { AdminService } from '../../../../../Services/Admin/admin-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { user } from '../../../../../Objects/User/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ver-usuarios-admin',
  imports: [CommonModule],
  templateUrl: './ver-usuarios-admin.html',
  styleUrl: './ver-usuarios-admin.css',
})
export class VerUsuariosAdmin {
  usuarios: user[] = [];
  cargando = true;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.adminService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
        this.cargando = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los usuarios.',
          confirmButtonColor: '#053d23d8',
        });
      },
    });
  }

  editar(id: number): void {
    this.router.navigate(['/admin/editar-usuario', id]);
  }
}
