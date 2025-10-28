package com.proyecto2.backend.controller;
import com.proyecto2.backend.dto.LoginRequest;
import com.proyecto2.backend.dto.RegisterRequest;
import com.proyecto2.backend.dto.UsuarioDto;
import com.proyecto2.backend.entity.Usuario;
import com.proyecto2.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String token = authService.login(request);
            Usuario user = authService.getUsuarioByEmail(request.getEmail());

            if (user == null || user.getRol() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "El usuario no tiene rol asignado"));
            }
            Map<String, Object> respuesta = new HashMap<>();
            respuesta.put("token", token);
            respuesta.put("rol", user.getRol().getNombre());
            respuesta.put("idUsuario", user.getIdUsuario());
            respuesta.put("activo", user.getCuentaActiva());
            return ResponseEntity.ok(respuesta);

        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode())
                    .body(Map.of("error", e.getReason()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error en el servidor al iniciar sesión"));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDto> obtenerUsuario(@PathVariable Integer id) {
        return ResponseEntity.ok(authService.getUsuarioDtoById(id));
    }

    @PostMapping("/register")
    public ResponseEntity<Usuario> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/crear-empleado")
    public ResponseEntity<UsuarioDto> crearEmpleado(@RequestBody UsuarioDto usuarioDto,
                                                    @RequestParam ("password")String password) {
        try {
            Usuario nuevoUsuario = authService.crearEmpleado(usuarioDto, password);
            return ResponseEntity.ok(authService.mapToUsuarioDto(nuevoUsuario));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Integer id, @RequestBody UsuarioDto user) {
        try {
            Usuario usuario = authService.actualizarUsuario(id, user);
            return ResponseEntity.ok(usuario);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/sin-sancion")
    public ResponseEntity<List<UsuarioDto>> obtenerUsuariosSinSancion() {
        return ResponseEntity.ok(authService.obtenerUsuariosSinSancion());
    }

    @GetMapping("/sancionados")
    public ResponseEntity<List<UsuarioDto>> obtenerUsuariosSancionados() {
        return ResponseEntity.ok(authService.obtenerUsuariosSancionados());
    }
}
