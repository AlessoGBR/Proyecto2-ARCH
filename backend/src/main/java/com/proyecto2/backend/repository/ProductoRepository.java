package com.proyecto2.backend.repository;

import com.proyecto2.backend.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {

    List<Producto> findByEstadoAprobacion(String estadoAprobacion);

    List<Producto> findByEstadoAprobacionAndVendedor_IdUsuario(String estadoAprobacion, Integer vendedorIdUsuario);

    List<Producto> findByVendedor_IdUsuarioAndEstadoAprobacion(Integer idUsuario, String estadoAprobacion);

    @Query("SELECT p FROM Producto p WHERE LOWER(p.nombre) LIKE LOWER(CONCAT('%', :nombre, '%')) AND p.estadoAprobacion = 'aprobado'")
    List<Producto> buscarPorNombre(@Param("nombre") String nombre);

    @Query("SELECT p FROM Producto p WHERE p.categoria.idCategoria = :idCategoria AND p.estadoAprobacion = 'aprobado'")
    List<Producto> buscarPorCategoria(@Param("idCategoria") String idCategoria);

    Producto findByIdProducto(Integer idProducto);

}
