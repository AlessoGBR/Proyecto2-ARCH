package com.proyecto2.backend.service;

import com.proyecto2.backend.entity.*;
import com.proyecto2.backend.repository.PedidoRepository;
import com.proyecto2.backend.repository.ProductoRepository;
import com.proyecto2.backend.repository.TarjetaRepository;
import com.proyecto2.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final UsuarioRepository usuarioRepository;
    private final TarjetaRepository tarjetaRepository;
    private final ProductoRepository productoRepository;


    public Pedido crearPedido(Long idUsuario, Integer idTarjeta, String direccion, List<DetallePedido> detalles) {
        Usuario comprador = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Tarjeta tarjeta = tarjetaRepository.findById(idTarjeta)
                .orElseThrow(() -> new RuntimeException("Tarjeta no encontrada"));

        double total = detalles.stream().mapToDouble(DetallePedido::getSubtotal).sum();

        Pedido pedido = Pedido.builder()
                .comprador(comprador)
                .tarjeta(tarjeta)
                .total(total)
                .estado("en curso")
                .direccionEntrega(direccion)
                .fechaPedido(Date.valueOf(LocalDate.now()))
                .fechaEntregaEstimada(java.sql.Date.valueOf(LocalDate.now().plusDays(5)))
                .build();


        for (DetallePedido det : detalles) {
            Producto producto = productoRepository.findById(det.getProducto().getIdProducto())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado con id " + det.getProducto().getIdProducto()));
            producto.setStock(producto.getStock() - 1);
            productoRepository.save(producto);
            Usuario vendedor = usuarioRepository.findById(Long.valueOf(det.getVendedor().getIdUsuario()))
                    .orElseThrow(() -> new RuntimeException("Vendedor no encontrado con id " + det.getVendedor().getIdUsuario()));
            det.setPedido(pedido);
            det.setComisionPlataforma(det.getSubtotal() * 0.05);
            det.setGananciaVendedor(det.getSubtotal() * 0.95);
        }


        pedido.setDetalles(detalles);
        return pedidoRepository.save(pedido);
    }

    public List<PedidoResponseDto> obtenerPedidosPorUsuario(Integer idUsuario) {
        List<Pedido> pedidos = pedidoRepository.findByCompradorIdUsuario(idUsuario);
        return pedidos.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public PedidoResponseDto mapToDto(Pedido pedido) {
        List<DetallePedidoDto> detallesDto = pedido.getDetalles().stream()
                .map(det -> DetallePedidoDto.builder()
                        .idDetalle(det.getIdDetalle())
                        .nombreProducto(det.getProducto().getNombre())
                        .imagenUrl(det.getProducto().getImagenUrl())
                        .cantidad(det.getCantidad())
                        .precioUnitario(det.getPrecioUnitario())
                        .subtotal(det.getSubtotal())
                        .build())
                .toList();

        return PedidoResponseDto.builder()
                .idPedido(pedido.getIdPedido())
                .total(pedido.getTotal())
                .estado(pedido.getEstado())
                .direccionEntrega(pedido.getDireccionEntrega())
                .fechaPedido(pedido.getFechaPedido() != null ? pedido.getFechaPedido() : null)
                .fechaEntregaEstimada(pedido.getFechaEntregaEstimada())
                .detalles(detallesDto)
                .build();
    }
}
