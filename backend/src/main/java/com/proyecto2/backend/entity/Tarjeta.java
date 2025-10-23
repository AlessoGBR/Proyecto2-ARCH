package com.proyecto2.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "tarjetas_credito")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tarjeta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tarjeta")
    private Integer idTarjeta;

    @ManyToOne
    @JoinColumn(name = "id_usuario", referencedColumnName = "id_usuario")
    private Usuario usuario;

    private String cvv;
    private String numero_tarjeta;
    private String nombreTitular;
    private String fechaExpiracion;
    private String tipoTarjeta;
    private boolean esPrincipa;
    private Date fechaRegistro;

}
