package com.proyecto2.backend.repository;

import com.proyecto2.backend.entity.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolRepository extends JpaRepository<Rol, Long> {

    Rol findByNombre(String nombre);
}
