package com.proyecto2.backend.service;
import com.proyecto2.backend.dto.LoginRequest;
import com.proyecto2.backend.dto.RegisterRequest;
import com.proyecto2.backend.entity.Usuario;
import com.proyecto2.backend.repository.UsuarioRepository;
import com.proyecto2.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final JwtUtil jwtUtil;

    public String login(LoginRequest request) {
        Usuario user = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("email no encontrado"));
        if (!request.getPassword().matches(user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        return jwtUtil.generarToken(user.getEmail(), user.getRol().getNombre());
    }

    public Usuario register(RegisterRequest request) {
        Usuario nuevo = Usuario.builder()
                .nombre(request.getNombre())
                .email(request.getEmail())
                .password(request.getPassword())
                .build();
        return usuarioRepository.save(nuevo);
    }

    public Usuario getUsuarioByEmail(String email) {
        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

}
