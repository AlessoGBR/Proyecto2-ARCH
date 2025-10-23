import { CarritoItem } from "./carrito-item";

export interface Carrito {
  idCarrito: number;
  items: CarritoItem[];
}