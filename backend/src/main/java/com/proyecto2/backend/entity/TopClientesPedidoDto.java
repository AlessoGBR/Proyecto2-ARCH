package com.proyecto2.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopClientesPedidoDto {
    private Integer idCliente;
    private String nombreCompleto;
    private Long totalPedidos;
}
