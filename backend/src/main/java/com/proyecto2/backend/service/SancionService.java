package com.proyecto2.backend.service;

import com.proyecto2.backend.entity.Sancion;
import com.proyecto2.backend.entity.Usuario;
import com.proyecto2.backend.repository.SancionRepository;
import com.proyecto2.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SancionService {

    private final SancionRepository sancionRepository;
    private final UsuarioRepository usuarioRepository;

    public Sancion crearSancion(Long idUsuario, Long idModerador, String motivo, Date fechaFin) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Usuario moderador = usuarioRepository.findById(idModerador)
                .orElseThrow(() -> new RuntimeException("Moderador no encontrado"));

        Sancion sancion = Sancion.builder()
                .usuario(usuario)
                .moderador(moderador)
                .motivo(motivo)
                .fechaSancion(Date.valueOf(LocalDate.now()))
                .fechaFinSancion(fechaFin)
                .estado("activa")
                .build();

        usuario.setCuentaActiva(false);
        usuario.setFechaSuspension(fechaFin);
        usuarioRepository.save(usuario);

        return sancionRepository.save(sancion);
    }

    public List<Sancion> obtenerSancionesPorUsuario(Integer idUsuario) {
        return sancionRepository.findByUsuarioIdUsuario(idUsuario);
    }

    public void finalizarSancion(Integer idSancion) {
        Sancion sancion = sancionRepository.findById(idSancion)
                .orElseThrow(() -> new RuntimeException("Sanción no encontrada"));
        sancion.setEstado("finalizada");
        sancionRepository.save(sancion);

        Usuario usuario = sancion.getUsuario();
        usuario.setCuentaActiva(true);
        usuario.setFechaSuspension(null);
        usuarioRepository.save(usuario);
    }
}
