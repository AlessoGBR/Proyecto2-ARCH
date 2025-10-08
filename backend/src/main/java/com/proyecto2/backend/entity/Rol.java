package com.proyecto2.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol", unique = true)
    private Integer idRol;

    @Column(name = "nombre_rol")
    private String nombre;
}
