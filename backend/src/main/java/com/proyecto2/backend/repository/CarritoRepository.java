package com.proyecto2.backend.repository;

import com.proyecto2.backend.entity.Carrito;
import com.proyecto2.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarritoRepository extends JpaRepository<Carrito, Integer> {

    Optional<Carrito> findByUsuario_IdUsuario(Integer idUsuario);

    Optional<Carrito> findByUsuario(Usuario usuario);
}
