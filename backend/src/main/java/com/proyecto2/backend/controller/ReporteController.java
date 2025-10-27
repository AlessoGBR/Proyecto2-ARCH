package com.proyecto2.backend.controller;

import com.proyecto2.backend.entity.*;
import com.proyecto2.backend.service.ReporteService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "http://localhost:4200")
public class ReporteController {

    private final ReporteService reporteService;

    public ReporteController(ReporteService reporteService) {
        this.reporteService = reporteService;
    }

    @GetMapping("/top-productos")
    public ResponseEntity<List<TopProductoDto>> obtenerTopProductos(
            @RequestParam("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam("fin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fin) {

        List<TopProductoDto> topProductos = reporteService.obtenerTop10ProductosMasVendidos(inicio, fin);
        return ResponseEntity.ok(topProductos);
    }

    @GetMapping("/top-vendedores")
    public ResponseEntity<List<TopVendedorDto>> obtenerTopVendedores(
            @RequestParam("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam("fin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fin) {

        List<TopVendedorDto> topVendedores = reporteService.obtenerTop5Vendedores(inicio, fin);
        return ResponseEntity.ok(topVendedores);
    }

    @GetMapping("/top-clientes-ganancias")
    public ResponseEntity<List<TopClienteGananciaDto>> obtenerTopClientesGanancias(
            @RequestParam("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam("fin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fin) {

        List<TopClienteGananciaDto> topClientes = reporteService.obtenerTop5ClientesGanancias(inicio, fin);
        return ResponseEntity.ok(topClientes);
    }

    @GetMapping("/top-clientes-pedidos")
    public ResponseEntity<List<TopClientesPedidoDto>> obtenerTopClientesPedidos(
            @RequestParam("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
            @RequestParam("fin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fin) {

        List<TopClientesPedidoDto> topClientes = reporteService.obtenerTop10ClientesPedidos(inicio, fin);
        return ResponseEntity.ok(topClientes);
    }

    @GetMapping("/top-clientes-productos")
    public ResponseEntity<List<TopClientesProductosDto>> obtenerTopClientesProductos() {
        List<TopClientesProductosDto> topClientes = reporteService.obtenerTop10ClientesProductos();
        return ResponseEntity.ok(topClientes);
    }

    @GetMapping("/historial-sanciones")
    public ResponseEntity<List<HistorialSancionDto>> obtenerHistorialSanciones() {
        List<HistorialSancionDto> historial = reporteService.obtenerHistorialSanciones();
        return ResponseEntity.ok(historial);
    }

    @GetMapping("/historial-notificaciones")
    public ResponseEntity<List<HistorialNotificacionDto>> obtenerHistorialNotificaciones() {
        List<HistorialNotificacionDto> historial = reporteService.obtenerHistorialNotificaciones();
        return ResponseEntity.ok(historial);
    }

}
