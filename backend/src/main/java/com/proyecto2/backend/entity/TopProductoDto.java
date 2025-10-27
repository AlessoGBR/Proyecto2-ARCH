package com.proyecto2.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopProductoDto {

    private Integer idProducto;
    private String nombre;
    private Long cantidadVendida;
}
