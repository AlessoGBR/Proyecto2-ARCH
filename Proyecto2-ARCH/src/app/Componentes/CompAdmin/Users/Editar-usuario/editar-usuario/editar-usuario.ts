import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../../../../Services/Admin/admin-service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-usuario',
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-usuario.html',
  styleUrl: './editar-usuario.css',
})
export class EditarUsuario implements OnInit{
  usuario: any = null;
  idUsuario!: number;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idUsuario = Number(this.route.snapshot.paramMap.get('id'));
    this.obtenerUsuario();
  }

  obtenerUsuario(): void {
    this.adminService.obtenerUsuarioPorId(this.idUsuario).subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: (err) => {
        console.error('Error al cargar usuario:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar la información del usuario.',
          confirmButtonColor: '#053d23d8',
        });
      },
    });
  }

  guardarCambios(): void {
    Swal.fire({
      title: '¿Guardar cambios?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.actualizarUsuario(this.idUsuario, this.usuario).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Usuario actualizado correctamente',
              confirmButtonColor: '#28a745',
            }).then(() => {
              this.router.navigate(['/admin/usuarios']);
            });
          },
          error: (err) => {
            console.error('Error al actualizar usuario:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo actualizar el usuario.',
              confirmButtonColor: '#053d23d8',
            });
          },
        });
      }
    });
  }
}
