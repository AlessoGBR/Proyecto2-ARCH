package com.proyecto2.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
@Entity
@Table(name = "solicitudes_producto")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolicitudProducto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_solicitud")
    private Integer idSolicitud;

    @ManyToOne
    @JoinColumn(name = "id_moderador", referencedColumnName = "id_usuario")
    private Usuario usuario;

    private Integer idProducto;
    private Date fechaSolicitud;
    private Date fechaRevision;
    private String estado;
    private String comentario;
}
