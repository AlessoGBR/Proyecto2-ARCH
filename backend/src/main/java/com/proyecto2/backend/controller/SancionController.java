package com.proyecto2.backend.controller;

import com.proyecto2.backend.entity.Sancion;
import com.proyecto2.backend.service.SancionService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/sanciones")
@RequiredArgsConstructor
public class SancionController {

    private final SancionService sancionService;

    @PostMapping("/crear")
    public ResponseEntity<Sancion> crearSancion(
            @RequestParam Long idUsuario,
            @RequestParam Long idModerador,
            @RequestParam String motivo,
            @RequestParam String fechaFin ) {
        LocalDate fecha = LocalDate.parse(fechaFin);
        Sancion sancion = sancionService.crearSancion(idUsuario, idModerador, motivo, Date.valueOf(fecha));
        return ResponseEntity.ok(sancion);
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Sancion>> obtenerSancionesPorUsuario(@PathVariable Integer idUsuario) {
        return ResponseEntity.ok(sancionService.obtenerSancionesPorUsuario(idUsuario));
    }

    @PutMapping("/finalizar/{idSancion}")
    public ResponseEntity<Void> finalizarSancion(@PathVariable Integer idSancion) {
        sancionService.finalizarSancion(idSancion);
        return ResponseEntity.ok().build();
    }
}
