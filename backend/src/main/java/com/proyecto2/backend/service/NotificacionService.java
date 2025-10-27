package com.proyecto2.backend.service;

import com.proyecto2.backend.entity.Notificacion;
import com.proyecto2.backend.entity.Pedido;
import com.proyecto2.backend.entity.Producto;
import com.proyecto2.backend.entity.Usuario;
import com.proyecto2.backend.repository.NotificacionesRepository;
import com.proyecto2.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class NotificacionService {

    private final NotificacionesRepository notificacionRepository;
    private final UsuarioRepository usuarioRepository;
    private final JavaMailSender mailSender;

    public void notificarPedidoEntregado(Pedido pedido) {
        String mensaje = "Tu pedido #" + pedido.getIdPedido() + " ha sido entregado con éxito.";
        crearYEnviarNotificacion(
                Long.valueOf(pedido.getComprador().getIdUsuario()),
                "pedido_entregado",
                "Pedido entregado",
                mensaje,
                pedido.getIdPedido()
        );
    }

    public void notificarProductoAprobado(Producto producto) {
        String mensaje = "Tu producto '" + producto.getNombre() + "' ha sido aprobado.";
        crearYEnviarNotificacion(
                Long.valueOf(producto.getVendedor().getIdUsuario()),
                "producto_aprobado",
                "Producto aprobado",
                mensaje,
                producto.getIdProducto()
        );
    }

    public void notificarProductoRechazado(Producto producto) {
        String mensaje = "Tu producto '" + producto.getNombre() + "' fue rechazado.";
        crearYEnviarNotificacion(
                Long.valueOf(producto.getVendedor().getIdUsuario()),
                "producto_rechazado",
                "Producto rechazado",
                mensaje,
                producto.getIdProducto()
        );
    }

    private void crearYEnviarNotificacion(Long idUsuario, String tipo, String asunto, String mensaje, Integer idReferencia) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Notificacion n = Notificacion.builder()
                .usuario(usuario)
                .tipoNotificacion(tipo)
                .asunto(asunto)
                .mensaje(mensaje)
                .fechaEnvio(Date.valueOf(LocalDate.now()))
                .idReferencia(idReferencia)
                .build();

        notificacionRepository.save(n);

        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(usuario.getEmail());
            mail.setSubject(asunto);
            mail.setText(mensaje);
            mailSender.send(mail);
            n.setEnviado(true);
            notificacionRepository.save(n);
        } catch (Exception e) {
            System.err.println("Error enviando correo: " + e.getMessage());
        }
    }
}
