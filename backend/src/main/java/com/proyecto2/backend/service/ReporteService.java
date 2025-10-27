package com.proyecto2.backend.service;


import com.proyecto2.backend.entity.*;
import com.proyecto2.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReporteService {

    private final DetallePedidoRepository detallePedidoRepository;
    private final PedidoRepository pedidoRepository;
    private final ProductoRepository productoRepository;
    private final SancionRepository sancionRepository;
    private final NotificacionesRepository notificacionRepository;

    public List<TopProductoDto> obtenerTop10ProductosMasVendidos(LocalDate inicio, LocalDate fin) {

        return detallePedidoRepository
                .obtenerTop10ProductosMasVendidos(java.sql.Date.valueOf(inicio), java.sql.Date.valueOf(fin))
                .stream()
                .limit(10)
                .toList();
    }

    public List<TopVendedorDto> obtenerTop5Vendedores(LocalDate inicio, LocalDate fin) {
        return detallePedidoRepository
                .obtenerTop5Vendedores(java.sql.Date.valueOf(inicio), java.sql.Date.valueOf(fin))
                .stream()
                .limit(5)
                .toList();
    }

    public List<TopClienteGananciaDto> obtenerTop5ClientesGanancias(LocalDate inicio, LocalDate fin) {
        return pedidoRepository.obtenerTop5ClientesGanancias(java.sql.Date.valueOf(inicio), java.sql.Date.valueOf(fin))
                .stream()
                .limit(5)
                .toList();
    }

    public List<TopClientesPedidoDto> obtenerTop10ClientesPedidos(LocalDate inicio, LocalDate fin) {
        return pedidoRepository
                .obtenerTop10ClientesPedidos(java.sql.Date.valueOf(inicio), java.sql.Date.valueOf(fin))
                .stream()
                .limit(10)
                .toList();
    }

    public List<TopClientesProductosDto> obtenerTop10ClientesProductos() {
        return productoRepository
                .obtenerTop10ClientesProductos()
                .stream()
                .limit(10)
                .toList();
    }

    public List<HistorialSancionDto> obtenerHistorialSanciones() {
        return sancionRepository.obtenerHistorialSanciones();
    }

    public List<HistorialNotificacionDto> obtenerHistorialNotificaciones() {
        return notificacionRepository.obtenerHistorialNotificaciones();
    }

}
