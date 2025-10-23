export interface DetallePedido {
  producto: { idProducto: number, nombre?: string; imagenUrl?: string };
  vendedor: { idUsuario: number; nombre?: string; imagenUrl?: string };
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}
