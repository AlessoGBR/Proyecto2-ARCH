package com.proyecto2.backend.repository;
import com.proyecto2.backend.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findByIdUsuario(Integer idUsuario);
}
