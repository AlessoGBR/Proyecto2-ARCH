package com.proyecto2.backend.repository;

import com.proyecto2.backend.entity.Calificacion;
import com.proyecto2.backend.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CalificacionRepository extends JpaRepository<Calificacion, Integer> {

    List<Calificacion> findByProducto(Producto producto);

    @Query("SELECT AVG(c.puntuacion) FROM Calificacion c WHERE c.producto.idProducto = :idProducto")
    Double obtenerPromedioPorProducto(Integer idProducto);
}
