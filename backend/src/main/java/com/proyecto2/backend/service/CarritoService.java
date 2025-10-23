package com.proyecto2.backend.service;

import com.proyecto2.backend.entity.*;
import com.proyecto2.backend.repository.CarritoItemRepository;
import com.proyecto2.backend.repository.CarritoRepository;
import com.proyecto2.backend.repository.ProductoRepository;
import com.proyecto2.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CarritoService {

    private final CarritoRepository carritoRepository;

    private final UsuarioRepository usuarioRepository;

    private final ProductoRepository productoRepository;

    private final CarritoItemRepository carritoItemRepository;

    public void agregarProducto(Integer idUsuario, Integer idProducto, Integer cantidad) {
        Usuario usuario = usuarioRepository.findByIdUsuario(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        Carrito carrito = carritoRepository.findByUsuario_IdUsuario(idUsuario)
                .orElseGet(() -> {
                    Carrito nuevo = new Carrito();
                    nuevo.setUsuario(usuario);
                    nuevo.setFechaCreacion(Date.valueOf(LocalDate.now()));
                    nuevo.setFechaActualizacion(Date.valueOf(LocalDate.now()));
                    return carritoRepository.save(nuevo);
                });

        CarritoItem item = carritoItemRepository
                .findByCarrito_IdCarritoAndProducto_IdProducto(carrito.getIdCarrito(), idProducto)
                .orElse(null);

        if (item != null) {
            item.setCantidad(item.getCantidad() + cantidad);
        } else {
            item = new CarritoItem();
            item.setCarrito(carrito);
            item.setProducto(producto);
            item.setCantidad(cantidad);
            item.setPrecioUnitario(producto.getPrecio());
            item.setFechaAgregado(Date.valueOf(LocalDate.now()));
        }

        carritoItemRepository.save(item);
        carrito.setFechaActualizacion(Date.valueOf(LocalDate.now()));
        carritoRepository.save(carrito);
    }

    public CarritoDto obtenerCarritoDto(long idUsuario) {
        Carrito carrito = carritoRepository.findByUsuario(
                usuarioRepository.findById(idUsuario)
                        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"))
        ).orElseThrow(() -> new RuntimeException("Carrito no encontrado"));

        List<CarritoItemDto> items = carritoItemRepository.findByCarrito(carrito)
                .stream()
                .map(item -> new CarritoItemDto(
                        item.getIdCarritoItem(),
                        item.getProducto().getIdProducto(),
                        item.getProducto().getNombre(),
                        item.getProducto().getVendedor().getIdUsuario(),
                        item.getPrecioUnitario(),
                        item.getCantidad(),
                        item.getProducto().getDescripcion(),
                        item.getProducto().getImagenUrl()
                ))
                .toList();

        return new CarritoDto(carrito.getIdCarrito(), items);
    }

    @Transactional(readOnly = true)
    public Carrito obtenerCarritoCompleto(Long idUsuario) {
        Usuario usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Carrito carrito = carritoRepository.findByUsuario(usuario)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));

        carrito.setItems(carritoItemRepository.findByCarrito(carrito));

        return carrito;
    }

    @Transactional
    public void eliminarItem(Integer idItem) {
        carritoItemRepository.deleteById(idItem);
    }

    @Transactional
    public void vaciarCarrito(Integer idUsuario) {
        Carrito carrito = carritoRepository.findByUsuario_IdUsuario(idUsuario)
                .orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        carritoItemRepository.deleteAll(carritoItemRepository.findByCarrito(carrito));
    }
}
