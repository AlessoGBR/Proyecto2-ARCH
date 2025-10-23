package com.proyecto2.backend.controller;

import com.proyecto2.backend.entity.Carrito;
import com.proyecto2.backend.entity.CarritoDto;
import com.proyecto2.backend.entity.CarritoItem;
import com.proyecto2.backend.service.CarritoService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/carrito")
@CrossOrigin(origins = "http://localhost:4200")
public class CarritoController {

    private final CarritoService carritoService;

    @PostMapping("/agregar")
    public ResponseEntity<?> agregarProducto(@RequestBody CarritoRequest request) {
        try {
            carritoService.agregarProducto(request.getIdUsuario(), request.getIdProducto(), request.getCantidad());
            return ResponseEntity.ok(Map.of("mensaje", "Producto agregado correctamente al carrito"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{idUsuario}")
    public ResponseEntity<CarritoDto> obtenerCarrito(@PathVariable Integer idUsuario) {
        return ResponseEntity.ok(carritoService.obtenerCarritoDto(idUsuario));
    }

    @DeleteMapping("/eliminar/{idItem}")
    public ResponseEntity<String> eliminarItem(@PathVariable Integer idItem) {
        carritoService.eliminarItem(idItem);
        return ResponseEntity.ok("Item eliminado del carrito");
    }


    @DeleteMapping("/vaciar/{idUsuario}")
    public ResponseEntity<String> vaciarCarrito(@PathVariable Integer idUsuario) {
        carritoService.vaciarCarrito(idUsuario);
        return ResponseEntity.ok("Carrito vaciado correctamente");
    }

    @Getter
    @Setter
    public static class CarritoRequest {
        private Integer idUsuario;
        private Integer idProducto;
        private Integer cantidad;
    }

}
