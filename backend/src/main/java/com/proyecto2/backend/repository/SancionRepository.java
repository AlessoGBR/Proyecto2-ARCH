package com.proyecto2.backend.repository;

import com.proyecto2.backend.entity.HistorialSancionDto;
import com.proyecto2.backend.entity.Sancion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SancionRepository extends JpaRepository<Sancion, Integer> {
    List<Sancion> findByUsuarioIdUsuario(Integer idUsuario);

    @Query("""
                SELECT new com.proyecto2.backend.entity.HistorialSancionDto(
                    s.idSancion,
                    CONCAT(u.nombre, ' ', u.apellido),
                    CONCAT(m.nombre, ' ', m.apellido),
                    s.motivo,
                    TO_CHAR(s.fechaSancion, 'YYYY-MM-DD'),
                    TO_CHAR(s.fechaFinSancion, 'YYYY-MM-DD'),
                    s.estado
                )
                FROM Sancion s
                JOIN s.usuario u
                JOIN s.moderador m
                ORDER BY s.fechaSancion DESC
            """)
    List<HistorialSancionDto> obtenerHistorialSanciones();
}
