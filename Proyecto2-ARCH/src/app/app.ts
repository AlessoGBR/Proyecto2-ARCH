import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./Componentes/Other/Footer/footer/footer";
import { Header } from "./Componentes/Other/Header/header/header";
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { authInterceptor } from './Interceptors/aut.interceptor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Footer, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected readonly title = signal('Proyecto2-ARCH');
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  ],
});
