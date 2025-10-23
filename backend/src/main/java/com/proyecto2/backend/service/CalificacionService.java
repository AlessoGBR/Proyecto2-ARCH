package com.proyecto2.backend.service;

import com.proyecto2.backend.entity.Calificacion;
import com.proyecto2.backend.entity.Producto;
import com.proyecto2.backend.entity.Usuario;
import com.proyecto2.backend.repository.CalificacionRepository;
import com.proyecto2.backend.repository.ProductoRepository;
import com.proyecto2.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CalificacionService {
    private final CalificacionRepository calificacionRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;

    public Calificacion agregarCalificacion(Calificacion calificacion, Integer idProducto, Integer idUsuario) {
        Producto producto = productoRepository.findById(idProducto).orElseThrow();
        Usuario usuario = usuarioRepository.findByIdUsuario(idUsuario).orElseThrow();
        calificacion.setProducto(producto);
        calificacion.getProducto().setIdProducto(producto.getIdProducto());
        calificacion.setUsuario(usuario);
        calificacion.getUsuario().setIdUsuario(usuario.getIdUsuario());
        return calificacionRepository.save(calificacion);
    }

    public List<Calificacion> obtenerCalificacionesPorProducto(Integer idProducto) {
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        return calificacionRepository.findByProducto(producto);
    }

    public Double obtenerPromedioPorProducto(Integer idProducto) {
        return calificacionRepository.obtenerPromedioPorProducto(idProducto);
    }
}
