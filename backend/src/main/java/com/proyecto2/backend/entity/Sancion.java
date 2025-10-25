package com.proyecto2.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;


@Entity
@Table(name = "sanciones")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sancion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sancion")
    private Integer idSancion;

    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_moderador", referencedColumnName = "id_usuario")
    private Usuario moderador;

    @Column(nullable = false)
    private String motivo;

    @Column(name = "fecha_sancion")
    private Date fechaSancion;

    @Column(name = "fecha_fin_sancion")
    private Date fechaFinSancion;

    @Column(nullable = false)
    private String estado;
}
