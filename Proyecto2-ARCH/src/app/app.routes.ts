import { Routes } from '@angular/router';
import { InicioSesion } from './Componentes/Inicio/Inicio-sesion/inicio-sesion/inicio-sesion';
import { Perfil } from './Componentes/CompComun/Perfil/perfil/perfil';
import { Inicio } from './Componentes/Inicio/inicio/inicio';

export const routes: Routes = [
    {path: '', redirectTo: 'inicio', pathMatch: 'full' },
    {path: 'login', component: InicioSesion },
    {path: 'Perfil', component: Perfil },
    {path: 'inicio', component: Inicio },
];
