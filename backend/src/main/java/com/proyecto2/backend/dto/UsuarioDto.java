package com.proyecto2.backend.dto;

import java.sql.Date;

public record UsuarioDto(
        String nombre,
        String apellido,
        String email,
        String telefono,
        String direccion,
        Integer id,
        boolean activo,
        String rol,
        Date fechaNacimiento
) {

}
