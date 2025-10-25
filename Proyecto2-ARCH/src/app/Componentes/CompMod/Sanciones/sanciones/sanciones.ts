import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SancionesService } from '../../../../Services/Sanciones/sanciones-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { user } from '../../../../Objects/User/user';
import { Auth } from '../../../../Services/auth';

@Component({
  selector: 'app-sanciones',
  imports: [CommonModule, FormsModule],
  templateUrl: './sanciones.html',
  styleUrl: './sanciones.css',
})
export class Sanciones {
  idUsuario!: string | null;
  motivo: string = '';
  fechaFin: string = '';
  usuario: user | null = null;

  constructor(
    private route: ActivatedRoute,
    private sancionService: SancionesService,
    private router: Router,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.idUsuario = this.route.snapshot.paramMap.get('id');
    this.auth.obtenerUsuario(this.idUsuario!).subscribe({
      next: (u) => {
        this.usuario = u;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  sancionar() {
    const idModerador = Number(localStorage.getItem('idUsuario'));

    if (!this.motivo.trim() || !this.fechaFin) {
      Swal.fire('Campos incompletos', 'Por favor completa todos los campos', 'warning');
      return;
    }

    this.sancionService
      .crearSancion(this.idUsuario!, idModerador, this.motivo, this.fechaFin)
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Sanción aplicada',
            text: 'El usuario ha sido sancionado correctamente.',
            confirmButtonColor: '#198754',
          }).then(() => this.router.navigate(['/mod']));
        },
        error: (err) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo aplicar la sanción', 'error');
        },
      });
  }

  regresar() {
    this.router.navigate(['/mod']);
  }
}
