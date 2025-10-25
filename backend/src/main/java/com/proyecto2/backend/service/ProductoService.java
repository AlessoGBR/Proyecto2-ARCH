package com.proyecto2.backend.service;
import com.proyecto2.backend.dto.ProductDto;
import com.proyecto2.backend.entity.Producto;
import com.proyecto2.backend.entity.SolicitudProducto;
import com.proyecto2.backend.repository.ProductoRepository;
import com.proyecto2.backend.repository.SolicitudRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final SolicitudRepository solicitudRepository;

    public List<ProductDto> findByEstadoAprobacion(String estadoAprobacion) {
       List<Producto> productoDtos =  productoRepository.findByEstadoAprobacion(estadoAprobacion);
       return productoDtos.stream().map(this::mapToProductoDto).collect(Collectors.toList());

    }

    public List<ProductDto> findByEstadoAprobacionId(String estadoAprobacion, Integer id) {
        List<Producto> productoDtos =  productoRepository.findByEstadoAprobacionAndVendedor_IdUsuario(estadoAprobacion,id);
        return productoDtos.stream().map(this::mapToProductoDto).collect(Collectors.toList());

    }

    public  List<ProductDto> findByVendedor_IdUsuario(Integer idUsuario) {
        List<Producto> productoDtos = productoRepository.findByVendedor_IdUsuarioAndEstadoAprobacion(idUsuario, "aprobado");
        return productoDtos.stream().map(this::mapToProductoDto).collect(Collectors.toList());
    }

    public ProductDto obtenerPorId(Integer id) {
        Producto producto = productoRepository.findById(id).orElse(null);
        ProductDto productDto = mapToProductoDto(producto);
        return productDto;
    }

    public Producto guardar(Producto producto) {
        return productoRepository.save(producto);
    }

    public Producto actualizar(ProductDto producto) {
        Producto productoDto = productoRepository.findByIdProducto(producto.id());
        productoDto.setNombre(producto.nombre());
        productoDto.setDescripcion(producto.descripcion());
        productoDto.setPrecio(producto.price());
        productoDto.setStock(producto.stock());
        productoDto.setEstadoAprobacion(producto.estadoAprobacion());
        return productoRepository.save(productoDto);
    }

    public void crearSolicitudProducto(Producto producto) {
        crearSolicitud(producto);
    }

    public List<ProductDto> buscarPorNombre(@Param("nombre") String nombre) {
        List<Producto> productosDto = productoRepository.buscarPorNombre(nombre);
        return productosDto.stream().map(this::mapToProductoDto).collect(Collectors.toList());
    }

    public List<ProductDto> buscarCategoria(@Param("id") String id) {
        List<Producto> productosDto = productoRepository.buscarPorCategoria(id);
        return productosDto.stream().map(this::mapToProductoDto).collect(Collectors.toList());
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
                producto.getStock(),
                producto.getVendedor().getNombre()
        );
    }

    private void crearSolicitud(Producto producto) {
        SolicitudProducto solicitudProducto = new SolicitudProducto();
        solicitudProducto.setIdProducto(producto.getIdProducto());
        solicitudProducto.setEstado("pendiente");
        solicitudProducto.setFechaSolicitud(Date.valueOf(LocalDate.now()));
        solicitudRepository.save(solicitudProducto);
    }



}
