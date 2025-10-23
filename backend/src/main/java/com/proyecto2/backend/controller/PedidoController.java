package com.proyecto2.backend.controller;

import com.proyecto2.backend.entity.DetallePedido;
import com.proyecto2.backend.entity.Pedido;
import com.proyecto2.backend.entity.PedidoResponseDto;
import com.proyecto2.backend.service.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class PedidoController {

    private final PedidoService pedidoService;

    @PostMapping("/crear")
    public ResponseEntity<PedidoResponseDto> crearPedido(@RequestParam Long idUsuario,
                                                         @RequestParam Integer idTarjeta,
                                                         @RequestParam String direccion,
                                                         @RequestBody List<DetallePedido> detalles) {
        Pedido pedido = pedidoService.crearPedido(idUsuario, idTarjeta, direccion, detalles);
        return ResponseEntity.ok(pedidoService.mapToDto(pedido));
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<PedidoResponseDto>> obtenerPedidosPorUsuario(@PathVariable Integer idUsuario) {
        List<PedidoResponseDto> pedidos = pedidoService.obtenerPedidosPorUsuario(idUsuario);
        return ResponseEntity.ok(pedidos);
    }
}
