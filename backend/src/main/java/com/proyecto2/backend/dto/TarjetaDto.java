package com.proyecto2.backend.dto;

public record TarjetaDto(
    Integer idUsuario,
    Integer id,
    String cvv,
    String ultimos4Digitos,
    boolean principal,
    String expiracion,
    String titular,
    String tipo
) {
}
