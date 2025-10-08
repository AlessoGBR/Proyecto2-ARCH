package com.proyecto2.backend.entity;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "productos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Integer idProducto;

    @ManyToOne
    @JoinColumn(name = "id_vendedor", referencedColumnName = "id_usuario")
    private Usuario vendedor;
    @ManyToOne
    @JoinColumn(name = "id_categoria", referencedColumnName = "id_categoria")
    private Categoria categoria;

    private String nombre;
    private String descripcion;

    @Column(name = "magen_url")
    private String imagenUrl;

    private Double precio;
    private Integer stock;
    private String estado;
    private String estadoAprobacion;
    private Boolean activo;

    @Temporal(TemporalType.DATE)
    private Date fechaCreacion;

    @Temporal(TemporalType.DATE)
    private Date fechaActualizacion;

}
