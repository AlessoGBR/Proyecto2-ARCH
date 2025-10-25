package com.proyecto2.backend.repository;

import com.proyecto2.backend.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    List<Pedido> findByCompradorIdUsuario(Integer idUsuario);

    @Query("SELECT p FROM Pedido p WHERE p.estado = 'en curso'")
    List<Pedido> obtenerPedidosEnCurso();

    @Query("SELECT p FROM Pedido p WHERE p.estado = 'entregado'")
    List<Pedido> obtenerPedidosEntregados();
}
