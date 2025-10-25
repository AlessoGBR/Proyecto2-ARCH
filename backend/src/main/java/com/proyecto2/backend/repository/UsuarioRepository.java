package com.proyecto2.backend.repository;
import com.proyecto2.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findByIdUsuario(Integer idUsuario);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM Usuario u WHERE u.rol.idRol = 1 AND u.cuentaActiva = true")
    List<Usuario> obtenerUsuariosSinSancion();

    @Query("SELECT u FROM Usuario u WHERE u.rol.idRol = 1 AND u.cuentaActiva = false")
    List<Usuario> obtenerUsuariosSancionados();
}
