package com.proyecto2.backend.controller;

import com.proyecto2.backend.entity.Categoria;
import com.proyecto2.backend.service.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@RequiredArgsConstructor
@CrossOrigin(origins = {
        "http://localhost:4200",
        "https://proyecto2-arch.netlify.app",
        "https://*.ngrok-free.dev",
        "https://*.ngrok-free.app"
})

public class CategoriaController {

    private final CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<List<Categoria>> getAll() {
        return ResponseEntity.ok(categoriaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> obtenerCategoriaPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(categoriaService.findById(id));
    }
}
