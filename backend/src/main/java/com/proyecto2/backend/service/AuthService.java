package com.proyecto2.backend.service;
import com.fasterxml.jackson.databind.ser.std.UUIDSerializer;
import com.proyecto2.backend.dto.LoginRequest;
import com.proyecto2.backend.dto.RegisterRequest;
import com.proyecto2.backend.dto.UsuarioDto;
import com.proyecto2.backend.entity.Usuario;
import com.proyecto2.backend.repository.UsuarioRepository;
import com.proyecto2.backend.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
        return jwtUtil.generarToken(user.getEmail(), user.getRol().getNombre(), user.getIdUsuario());
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

    public UsuarioDto getUsuarioDtoById(Integer idUsuario) {
        Optional<Usuario> userDto = usuarioRepository.findByIdUsuario(idUsuario);
        return userDto.map(this::mapToUsuarioDto).orElse(null);
    }

    public Usuario getUsuarioById(Integer idUsuario) {
        Optional<Usuario> userDto = usuarioRepository.findByIdUsuario(idUsuario);
        return userDto.orElse(null);
    }

    public Usuario actualizarUsuario(Integer id,UsuarioDto usuarioDto) {
        Usuario user = usuarioRepository.findByIdUsuario(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Usuario user2 = mapToUsuario(usuarioDto);
        user.setNombre(user2.getNombre());
        user.setApellido(user2.getApellido());
        user.setEmail(user2.getEmail());
        user.setTelefono(user2.getTelefono());
        user.setDireccion(user2.getDireccion());
        return   usuarioRepository.save(user);
    }

    private UsuarioDto mapToUsuarioDto(Usuario user) {
        return new UsuarioDto(
                user.getNombre(),
                user.getApellido(),
                user.getEmail(),
                user.getTelefono(),
                user.getDireccion(),
                user.getIdUsuario()
        );
    }

    private Usuario mapToUsuario(UsuarioDto userDto) {
        Usuario usuario = new Usuario();
        usuario.setNombre(userDto.nombre());
        usuario.setApellido(userDto.apellido());
        usuario.setEmail(userDto.email());
        usuario.setTelefono(userDto.telefono());
        usuario.setDireccion(userDto.direccion());
        return  usuario;
    }

}
