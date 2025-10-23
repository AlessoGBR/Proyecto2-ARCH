package com.proyecto2.backend.entity;

import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PedidoResponseDto {
    private Integer idPedido;
    private Double total;
    private String estado;
    private String direccionEntrega;
    private Date fechaPedido;
    private Date fechaEntregaEstimada;
    private List<DetallePedidoDto> detalles;
}
