package com.proyecto2.backend.controller;
import com.proyecto2.backend.entity.Producto;
import com.proyecto2.backend.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProductoController {
    private final ProductoService productoService;

    @GetMapping
    public ResponseEntity<List<Producto>> listarProductos() {
        return ResponseEntity.ok(productoService.findByEstadoAprobacion("aprobado"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Producto>> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(productoService.findByVendedor_IdUsuario(id));
    }

    @PostMapping
    public ResponseEntity<Producto> crear(@RequestBody Producto producto) {
        return ResponseEntity.ok(productoService.guardar(producto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        productoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
