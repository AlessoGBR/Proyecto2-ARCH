package com.proyecto2.backend.repository;

import com.proyecto2.backend.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    List<Producto> findByEstadoAprobacion(String estadoAprobacion);

    // (Opcional) Para listar productos de un usuario específico y aprobados
    List<Producto> findByVendedor_IdUsuarioAndEstadoAprobacion(Integer idUsuario, String estadoAprobacion);


}
