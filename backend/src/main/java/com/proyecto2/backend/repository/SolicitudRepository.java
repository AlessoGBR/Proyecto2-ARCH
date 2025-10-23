package com.proyecto2.backend.repository;

import com.proyecto2.backend.entity.SolicitudProducto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SolicitudRepository extends JpaRepository<SolicitudProducto, Integer> {

    //List<SolicitudProducto> findByUsuarioId(Integer id);

}