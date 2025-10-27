package com.proyecto2.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopClientesProductosDto {
    private Integer idVendedor;
    private String nombreCompleto;
    private Long totalProductos;
}
