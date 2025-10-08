import { Routes } from '@angular/router';
import { InicioSesion } from './Componentes/Inicio/Inicio-sesion/inicio-sesion/inicio-sesion';
import { VerArticulos } from './Componentes/CompComun/Ver-articulos/ver-articulos/ver-articulos';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'login', component: InicioSesion },
    {path: 'inicio', component: VerArticulos },
];
