import { Routes } from '@angular/router';
import { InicioSesion } from './Componentes/Inicio/Inicio-sesion/inicio-sesion/inicio-sesion';
import { Perfil } from './Componentes/CompComun/Perfil/perfil/perfil';
import { Inicio } from './Componentes/Inicio/inicio/inicio';
import { ViewProduct } from './Componentes/CompComun/View-Product/view-product/view-product';
import { BuscarArticulos } from './Componentes/CompComun/Buscar-articulos/buscar-articulos/buscar-articulos';
import { EditProduct } from './Componentes/CompComun/Perfil/Edit-product/edit-product/edit-product';
import { BuscarCategoria } from './Componentes/CompComun/Buscar-categoria/buscar-categoria/buscar-categoria';
import { Cart } from './Componentes/CompComun/Cart/cart/cart';
import { FinalizarCompra } from './Componentes/CompComun/Finalizar-compra/finalizar-compra/finalizar-compra';

export const routes: Routes = [
    {path: '', redirectTo: 'inicio', pathMatch: 'full' },
    {path: 'login', component: InicioSesion },
    {path: 'Perfil', component: Perfil },
    {path: 'inicio', component: Inicio },
    {path: 'view-product/:id', component: ViewProduct },
    {path: 'busqueda', component: BuscarArticulos },
    {path: 'edit-product/:id', component: EditProduct },
    {path: 'buscar-categoria/:id', component: BuscarCategoria },
    {path: 'carrito', component: Cart },
    {path: 'finalizar-compra', component: FinalizarCompra },
];
