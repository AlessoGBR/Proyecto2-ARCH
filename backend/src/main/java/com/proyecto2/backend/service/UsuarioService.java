package com.proyecto2.backend.service;

import com.proyecto2.backend.dto.UsuarioDto;
import com.proyecto2.backend.entity.Usuario;
import com.proyecto2.backend.repository.RolRepository;
import com.proyecto2.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;

    public List<UsuarioDto> listarUsuariosDto() {
        return usuarioRepository.findAll().stream()
                .map(this::mapToUsuarioDto)
                .collect(Collectors.toList());
    }

    public UsuarioDto obtenerUsuarioDto(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return mapToUsuarioDto(usuario);
    }

    public Usuario actualizarUsuario(Integer id, UsuarioDto usuarioDto) {
        Usuario user = usuarioRepository.findByIdUsuario(id).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Usuario user2 = mapToUsuario(usuarioDto);
        user.setNombre(user2.getNombre());
        user.setApellido(user2.getApellido());
        user.setEmail(user2.getEmail());
        user.setTelefono(user2.getTelefono());
        user.setDireccion(user2.getDireccion());
        return usuarioRepository.save(user);
    }

    public UsuarioDto mapToUsuarioDto(Usuario user) {
        return new UsuarioDto(
                user.getNombre(),
                user.getApellido(),
                user.getEmail(),
                user.getTelefono(),
                user.getDireccion(),
                user.getIdUsuario(),
                user.getCuentaActiva(),
                user.getRol().getNombre(),
                user.getFechaNacimiento()
        );
    }

    private Usuario mapToUsuario(UsuarioDto userDto) {
        Usuario usuario = new Usuario();
        usuario.setNombre(userDto.nombre());
        usuario.setApellido(userDto.apellido());
        usuario.setEmail(userDto.email());
        usuario.setTelefono(userDto.telefono());
        usuario.setDireccion(userDto.direccion());
        return usuario;
    }
}
