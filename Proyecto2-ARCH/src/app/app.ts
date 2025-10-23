import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./Componentes/Other/Footer/footer/footer";
import { Header } from "./Componentes/Other/Header/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Footer, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Proyecto2-ARCH');
}
