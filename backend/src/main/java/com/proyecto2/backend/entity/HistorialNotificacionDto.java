package com.proyecto2.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistorialNotificacionDto {
    private Integer idNotificacion;
    private String usuario;
    private String tipo;
    private String mensaje;
    private String fechaEnvio;
    private Boolean leida;
}
