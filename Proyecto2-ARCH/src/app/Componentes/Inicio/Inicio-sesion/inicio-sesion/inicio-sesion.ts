import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../../..//Services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-sesion',
  imports: [
    CommonModule,
    FormsModule
],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css',
  standalone: true
})
export class InicioSesion {
  email = '';
  password = '';

  constructor(private authService: Auth, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.authService.guardarSesion(res.token, res.rol);

        switch (res.rol) {
          case 'ADMINISTRADOR':
            this.router.navigate(['/admin']);
            
            break;
          case 'MODERADOR':
            this.router.navigate(['/moderador']);
            break;
          case 'LOGISTICA':
            this.router.navigate(['/logistica']);
            break;
          default:
            this.router.navigate(['/inicio']);
        }
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Usuario o contraseña incorrectos"
        });
        this.email = '';
        this.password = '';
      }
    });
  }
}
