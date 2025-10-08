import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Inicio } from "./Componentes/Inicio/inicio/inicio";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Inicio],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Proyecto2-ARCH');
}
