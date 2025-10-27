package com.proyecto2.backend.repository;

import com.proyecto2.backend.entity.HistorialNotificacionDto;
import com.proyecto2.backend.entity.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificacionesRepository extends JpaRepository<Notificacion, Integer> {

    List<Notificacion> findByUsuarioIdUsuario(Integer idUsuario);

    @Query("""
                SELECT n FROM Notificacion n
                WHERE n.enviado = false
                ORDER BY n.fechaEnvio DESC
            """)
    List<Notificacion> findPendientesEnvio();

    @Query("""
                SELECT new com.proyecto2.backend.entity.HistorialNotificacionDto(
                    n.idNotificacion,
                    CONCAT(u.nombre, ' ', u.apellido),
                    n.tipoNotificacion,
                    n.mensaje,
                    TO_CHAR(n.fechaEnvio, 'YYYY-MM-DD HH24:MI'),
                    n.leido
                )
                FROM Notificacion n
                JOIN n.usuario u
                ORDER BY n.fechaEnvio DESC
            """)
    List<HistorialNotificacionDto> obtenerHistorialNotificaciones();
}
