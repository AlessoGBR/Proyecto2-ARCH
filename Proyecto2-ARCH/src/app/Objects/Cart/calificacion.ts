export interface Calificacion {
  idCalificacion?: number;
  idProducto: number;
  idUsuario: number;
  idPedido: number;
  puntuacion: string;
  comentario: string;
  fechaCalificacion?: string;
}