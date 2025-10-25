package com.proyecto2.backend.repository;

import com.proyecto2.backend.entity.Sancion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SancionRepository extends JpaRepository<Sancion, Integer> {
    List<Sancion> findByUsuarioIdUsuario(Integer idUsuario);
}
