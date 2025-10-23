package com.proyecto2.backend.repository;

import com.proyecto2.backend.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    List<Pedido> findByCompradorIdUsuario(Integer idUsuario);
}
