package com.proyecto2.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "notificaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_notificacion")
    private Integer idNotificacion;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @Column(name = "tipo_notificacion", nullable = false)
    private String tipoNotificacion;

    private String asunto;
    private String mensaje;

    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_envio")
    private Date fechaEnvio;

    private Boolean enviado = false;
    private Boolean leido = false;

    @Column(name = "id_referencia")
    private Integer idReferencia;
}
