import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-logistica',
  imports: [],
  templateUrl: './inicio-logistica.html',
  styleUrl: './inicio-logistica.css'
})
export class InicioLogistica {

  constructor(private router: Router){
    
  }

  irARevisar(){
    this.router.navigate(['/logistica/ordenes']);
  }

  irAEntregados(){
    this.router.navigate(['/logistica/entregados']);
  }
}
