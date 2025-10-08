import { Component , OnInit} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoCard } from '../../CompComun/Producto-card/producto-card/producto-card';
import { ProductosService } from '../../../Services/Productos/productos-service';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule, ProductoCard],
  standalone: true,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {

  productos: any[] = [];
  mostarHeader: boolean = true;
  mostarArticulos: boolean = true;

  constructor(private productosService: ProductosService, private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const ruta = event.urlAfterRedirects;
      if ( ruta.startsWith('/inicio')|| ruta.startsWith('/admin') || ruta.startsWith('/moderador') || ruta.startsWith('/logistica')) {
        this.mostarHeader = false;
      } else {
        this.mostarHeader = true;
      }
      if (ruta.startsWith('/login') || ruta.startsWith('/inicio')|| ruta.startsWith('/admin') || ruta.startsWith('/moderador') || ruta.startsWith('/logistica')) {
        this.mostarArticulos = false;
      } else {
        this.mostarArticulos = true;
      }
    });
  }
  
  ngOnInit() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.productosService.obtenerProductos().subscribe({      
      next: (data) => (this.productos = data),
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

}
