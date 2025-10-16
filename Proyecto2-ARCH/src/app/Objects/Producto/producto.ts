export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  price: number;
  imageUrl: string;
  estadoAprobacion: string;
  categoryName: string;
  usuarioId: number;
  stock: number;
}
