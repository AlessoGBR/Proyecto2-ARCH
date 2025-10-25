import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SancionesService } from '../../../../../Services/Sanciones/sanciones-service';
import Swal from 'sweetalert2';
import { Auth } from '../../../../../Services/auth';
import { user } from '../../../../../Objects/User/user';

@Component({
  selector: 'app-quitar-sancion',
  imports: [],
  templateUrl: './quitar-sancion.html',
  styleUrl: './quitar-sancion.css',
})
export class QuitarSancion {
  idUsuario!: string | null;
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

  quitarSancion() {
    Swal.fire({
      icon: 'warning',
      title: '¿Deseas quitar la sanción?',
      showCancelButton: true,
      confirmButtonText: 'Sí, quitar sanción',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#198754',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.sancionService.finalizarSancion(this.idUsuario!).subscribe({
          next: () => {
            Swal.fire('Sanción retirada', 'El usuario ha sido reactivado.', 'success').then(() =>
              this.router.navigate(['/mod'])
            );
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Error', 'No se pudo quitar la sanción.', 'error');
          },
        });
      }
    });
  }

  regruesar() {
    this.router.navigate(['/mod']);
  }
}
