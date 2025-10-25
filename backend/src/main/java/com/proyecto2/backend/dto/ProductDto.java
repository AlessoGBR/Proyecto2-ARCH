package com.proyecto2.backend.dto;

public record ProductDto(
        String imageUrl,
        Double price,
        String categoryName,
        Integer idUsuario,
        Integer id,
        String descripcion,
        String estadoAprobacion,
        String nombre,
        Integer stock,
        String username
) {
}
