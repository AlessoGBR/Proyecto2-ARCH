import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-inicio-mod',
  imports: [],
  templateUrl: './inicio-mod.html',
  styleUrl: './inicio-mod.css'
})
export class InicioMod {

  constructor(private router: Router) {}

  irARevisar() {
    this.router.navigate(['/mod/productos-pendientes']);
  }

  irASancionar() {
    this.router.navigate(['/mod/verUsuarios']);
  }
}
