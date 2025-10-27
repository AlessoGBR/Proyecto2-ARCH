package com.proyecto2.backend.controller;

import com.proyecto2.backend.entity.Calificacion;
import com.proyecto2.backend.service.CalificacionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calificaciones")
public class CalificacionController {

    private final CalificacionService calificacionService;

    public CalificacionController(CalificacionService calificacionService) {
        this.calificacionService = calificacionService;
    }

    @PostMapping("/agregar/{idProducto}/{idUsuario}")
    public ResponseEntity<Calificacion> agregarCalificacion(@RequestBody Calificacion calificacion,
                                                            @PathVariable Integer idProducto,
                                                            @PathVariable Integer idUsuario) {
        return ResponseEntity.ok(calificacionService.agregarCalificacion(calificacion,  idProducto, idUsuario));
    }

    @GetMapping("/producto/{idProducto}")
    public ResponseEntity<List<Calificacion>> obtenerPorProducto(@PathVariable Integer idProducto) {
        return ResponseEntity.ok(calificacionService.obtenerCalificacionesPorProducto(idProducto));
    }

    @GetMapping("/promedio/{idProducto}")
    public ResponseEntity<Double> obtenerPromedio(@PathVariable Integer idProducto) {
        Double promedio = calificacionService.obtenerPromedioPorProducto(idProducto);
        return ResponseEntity.ok(promedio != null ? promedio : 0.0);
    }
}
