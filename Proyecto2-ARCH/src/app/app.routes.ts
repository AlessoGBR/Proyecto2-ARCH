import { Routes } from '@angular/router';
import { InicioSesion } from './Componentes/Inicio/Inicio-sesion/inicio-sesion/inicio-sesion';
import { Perfil } from './Componentes/CompComun/Perfil/perfil/perfil';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'login', component: InicioSesion },
    {path: 'Perfil', component: Perfil },
];
