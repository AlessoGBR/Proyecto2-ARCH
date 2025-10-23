package com.proyecto2.backend.dto;

public record UsuarioDto(
        String nombre,
        String apellido,
        String email,
        String telefono,
        String direccion,
        Integer id
) {

}
