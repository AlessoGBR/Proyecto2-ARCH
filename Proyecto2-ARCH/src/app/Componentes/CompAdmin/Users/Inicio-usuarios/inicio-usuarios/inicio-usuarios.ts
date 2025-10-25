import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-usuarios',
  imports: [],
  templateUrl: './inicio-usuarios.html',
  styleUrl: './inicio-usuarios.css'
})
export class InicioUsuarios {

  constructor(private router: Router) {}

  crear() {
    this.router.navigate(['/admin/crear-usuario']);
  }

  usuarios() {
    this.router.navigate(['/admin/ver-usuarios-admin']);
  }
}
