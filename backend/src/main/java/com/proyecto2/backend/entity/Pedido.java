package com.proyecto2.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "pedidos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private Integer idPedido;

    @ManyToOne
    @JoinColumn(name = "id_comprador", referencedColumnName = "id_usuario")
    private Usuario comprador;

    @ManyToOne
    @JoinColumn(name = "id_tarjeta", referencedColumnName = "id_tarjeta")
    private Tarjeta tarjeta;

    private Double total;

    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_pedido")
    private Date fechaPedido = new Date();

    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_entrega_estimada")
    private Date fechaEntregaEstimada;

    @Temporal(TemporalType.DATE)
    @Column(name = "fecha_entrega_real")
    private Date fechaEntregaReal;

    private String estado;
    private String direccionEntrega;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetallePedido> detalles;
}
