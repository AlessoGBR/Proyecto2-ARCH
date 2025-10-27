package com.proyecto2.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopClienteGananciaDto {
    private Integer idCliente;
    private String nombreCompleto;
    private Double totalGastado;
}
