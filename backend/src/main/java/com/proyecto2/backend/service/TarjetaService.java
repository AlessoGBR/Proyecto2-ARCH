package com.proyecto2.backend.service;

import com.proyecto2.backend.dto.TarjetaDto;
import com.proyecto2.backend.entity.Tarjeta;
import com.proyecto2.backend.repository.TarjetaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TarjetaService {

    private final TarjetaRepository tarjetaRepository;

    public List<TarjetaDto> findById(Integer id) {
        List<Tarjeta> tarjetasDtos = tarjetaRepository.findByUsuarioIdUsuario(id);
        return tarjetasDtos.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public boolean deleteTarjeta(Integer id) {
        if (!tarjetaRepository.existsById(id)) {
            throw new RuntimeException("La tarjeta no existe");
        }
        tarjetaRepository.deleteById(id);
        return true;
    }

    public boolean pasarAPrincipal(Integer id, Integer idUsuario) {
        tarjetaRepository.desactivarTarjetasUsuario(idUsuario);
        Tarjeta tarjeta = tarjetaRepository.findById(id).get();
        tarjeta.setEsPrincipa(Boolean.TRUE);
        tarjetaRepository.save(tarjeta);
        return tarjeta.isEsPrincipa();
    }

    public Tarjeta guardarTarjeta(Tarjeta tarjeta) {
        return tarjetaRepository.save(tarjeta);
    }

    private TarjetaDto mapToDto(Tarjeta tarjeta) {
        String ultimos4 = tarjeta.getNumero_tarjeta();
        if (ultimos4 != null && ultimos4.length() > 4) {
            ultimos4 = ultimos4.substring(ultimos4.length() - 4);
        }
        return new TarjetaDto(
                tarjeta.getUsuario().getIdUsuario(),
                tarjeta.getIdTarjeta(),
                tarjeta.getCvv(),
                ultimos4,
                tarjeta.isEsPrincipa(),
                tarjeta.getFechaExpiracion(),
                tarjeta.getNombreTitular(),
                tarjeta.getTipoTarjeta()
        );
    }
}
