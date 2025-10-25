import { DetallePedido } from '../Pedido/detalle-pedido';

export interface Pedido {
  idPedido?: number;
  idUsuario: number;
  idTarjeta: number;
  total: number;
  direccionEntrega: string;
  detalles: DetallePedido[];
  fechaEntregaEstimada?: Date;
  fechaEntrega?: Date;
  fechaPedido?: Date;
  estado?: string;
}