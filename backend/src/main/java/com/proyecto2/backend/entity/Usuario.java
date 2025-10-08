package com.proyecto2.backend.entity;
import lombok.*;
import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Integer idUsuario;

    private String nombre;
    private String apellido;
    private String email;
    private String password;
    private String telefono;
    private String direccion;
    private Date fechaNacimiento;

    @ManyToOne
    @JoinColumn(name = "id_rol", referencedColumnName = "id_rol")
    private Rol rol;

    private Date fechaRegistro;
    private Boolean cuentaActiva;
    private Date fechaSuspension;
}
