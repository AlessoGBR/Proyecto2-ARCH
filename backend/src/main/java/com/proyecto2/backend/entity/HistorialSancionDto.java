package com.proyecto2.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistorialSancionDto {
    private Integer idSancion;
    private String usuarioSancionado;
    private String moderador;
    private String motivo;
    private String fechaSancion;
    private String fechaFinSancion;
    private String estado;
}
