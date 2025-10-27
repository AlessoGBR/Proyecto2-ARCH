package com.proyecto2.backend.controller;

import com.proyecto2.backend.dto.TarjetaDto;
import com.proyecto2.backend.entity.Tarjeta;
import com.proyecto2.backend.entity.Usuario;
import com.proyecto2.backend.service.AuthService;
import com.proyecto2.backend.service.TarjetaService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarjetas")
@RequiredArgsConstructor
public class TarjetaController {

    private final TarjetaService tarjetaService;
    private final AuthService authService;

    @GetMapping("/{id}")
    public ResponseEntity<List<TarjetaDto>> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(tarjetaService.findById(id));
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<List<TarjetaDto>> eliminarPorId(@PathVariable Integer id) {
        try {
            tarjetaService.deleteTarjeta(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/principal/{idUsuario}/{id}")
    public ResponseEntity<List<TarjetaDto>> cambiarPrincipal(@PathVariable Integer id,
                                                             @PathVariable Integer idUsuario) {
        try {
            tarjetaService.pasarAPrincipal(id, idUsuario);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/agregar")
    public ResponseEntity<Tarjeta> crear(@RequestBody TarjetaRequestDto dto) {
        try {
            Usuario usuario = authService.getUsuarioById(dto.getUsuario());
            Tarjeta tarjeta = new Tarjeta();
            tarjeta.setUsuario(usuario);
            tarjeta.setNombreTitular(dto.getNombreTitular());
            tarjeta.setNumero_tarjeta(dto.getNumero_tarjeta());
            tarjeta.setFechaExpiracion(dto.getFechaExpiracion());
            tarjeta.setCvv(dto.getCvv());
            tarjeta.setTipoTarjeta(dto.getTipoTarjeta());
            tarjeta.setEsPrincipa(dto.isEsPrincipal());
            Tarjeta nueva = tarjetaService.guardarTarjeta(tarjeta);
            return ResponseEntity.ok(nueva);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }


    }

    @Data
    public static class TarjetaRequestDto {
        private Integer usuario;
        private String NombreTitular;
        private String numero_tarjeta;
        private String fechaExpiracion;
        private String cvv;
        private String tipoTarjeta;
        private boolean esPrincipal;
    }
}
