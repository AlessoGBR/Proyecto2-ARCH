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
        console.log(res.idUsuario);
        this.authService.guardarSesion(res.token, res.rol, res.idUsuario);     
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
            this.router.navigate(['']);
            Swal.fire({
              icon: "success",
              title: "Inicio de sesión exitoso",
              showConfirmButton: false,
              timer: 2500
            });
            break;
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

  regresar() {
    this.router.navigate(['/inicio']);
  }
}
