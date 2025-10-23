package com.proyecto2.backend.repository;

import com.proyecto2.backend.entity.Tarjeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TarjetaRepository extends JpaRepository<Tarjeta, Integer> {

    List<Tarjeta> findByUsuarioIdUsuario(Integer id);

    void deleteById(Integer id);

    @Modifying
    @Transactional
    @Query("UPDATE Tarjeta t SET t.esPrincipa = false WHERE t.usuario.idUsuario = :idUsuario")
    void desactivarTarjetasUsuario(@Param("idUsuario") Integer idUsuario);
}
