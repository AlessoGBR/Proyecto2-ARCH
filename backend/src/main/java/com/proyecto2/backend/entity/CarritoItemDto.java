package com.proyecto2.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarritoItemDto {
    private Integer idCarritoItem;
    private Integer idProducto;
    private String nombreProducto;
    private Integer idVendedor;
    private Double precioUnitario;
    private Integer cantidad;
    private String descripcion;
    private String imagen;
}
