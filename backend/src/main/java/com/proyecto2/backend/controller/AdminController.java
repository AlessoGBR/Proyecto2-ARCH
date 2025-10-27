package com.proyecto2.backend.controller;

import com.proyecto2.backend.dto.UsuarioDto;
import com.proyecto2.backend.entity.Usuario;
import com.proyecto2.backend.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UsuarioService usuarioService;

    @GetMapping("/usuarios")
    public ResponseEntity<List<UsuarioDto>> listarUsuarios() {
        return ResponseEntity.ok(usuarioService.listarUsuariosDto());
    }

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<UsuarioDto> obtenerUsuario(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.obtenerUsuarioDto(id));
    }

    @PutMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> editarUsuario(
            @PathVariable Integer id,
            @RequestBody UsuarioDto dto) {
        return ResponseEntity.ok(usuarioService.actualizarUsuario(id, dto));
    }
}
