package com.proyecto2.backend.entity;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DetallePedidoDto {
    private Integer idDetalle;
    private String nombreProducto;
    private Integer cantidad;
    private String imagenUrl;
    private Double precioUnitario;
    private Double subtotal;
}
