package com.proyecto2.backend.service;
import ch.qos.logback.core.rolling.helper.SizeAndTimeBasedArchiveRemover;
import com.proyecto2.backend.dto.ProductDto;
import com.proyecto2.backend.entity.Producto;
import com.proyecto2.backend.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final ProductoRepository productoRepository;

    public List<ProductDto> findByEstadoAprobacion(String estadoAprobacion) {
       List<Producto> productoDtos =  productoRepository.findByEstadoAprobacion(estadoAprobacion);
       return productoDtos.stream().map(this::mapToProductoDto).collect(Collectors.toList());

    }

    public  List<ProductDto> findByVendedor_IdUsuario(Integer idUsuario) {
        List<Producto> productoDtos = productoRepository.findByVendedor_IdUsuarioAndEstadoAprobacion(idUsuario, "aprobado");
        return productoDtos.stream().map(this::mapToProductoDto).collect(Collectors.toList());
    }

    public Producto obtenerPorId(Integer id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    }

    public Producto guardar(Producto producto) {
        return productoRepository.save(producto);
    }

    public void eliminar(Integer id) {
        productoRepository.deleteById(id);
    }

    private ProductDto mapToProductoDto(Producto producto) {
        return new ProductDto(
                producto.getImagenUrl(),
                producto.getPrecio(),
                producto.getCategoria().getNombreCategoria(),
                producto.getVendedor().getIdUsuario(),
                producto.getIdProducto(),
                producto.getDescripcion(),
                producto.getEstadoAprobacion(),
                producto.getNombre(),
                producto.getStock()
        );
    }



}
