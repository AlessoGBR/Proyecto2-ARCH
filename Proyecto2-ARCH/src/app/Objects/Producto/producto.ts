export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  estadoAprobacion: string;
  categoriaId: number;
  usuarioId: number;
  stock: number;
}
