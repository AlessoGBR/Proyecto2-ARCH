package com.proyecto2.backend.repository;

import com.proyecto2.backend.entity.Pedido;
import com.proyecto2.backend.entity.TopClienteGananciaDto;
import com.proyecto2.backend.entity.TopClientesPedidoDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {
    List<Pedido> findByCompradorIdUsuario(Integer idUsuario);

    @Query("SELECT p FROM Pedido p WHERE p.estado = 'en curso'")
    List<Pedido> obtenerPedidosEnCurso();

    @Query("SELECT p FROM Pedido p WHERE p.estado = 'entregado'")
    List<Pedido> obtenerPedidosEntregados();

    @Query("""
                SELECT new com.proyecto2.backend.entity.TopClienteGananciaDto(
                    p.comprador.idUsuario,
                    CONCAT(p.comprador.nombre, ' ', p.comprador.apellido),
                    SUM(p.total)
                )
                FROM Pedido p
                WHERE p.fechaPedido BETWEEN :inicio AND :fin
                GROUP BY p.comprador.idUsuario, p.comprador.nombre, p.comprador.apellido
                ORDER BY SUM(p.total) DESC
            """)
    List<TopClienteGananciaDto> obtenerTop5ClientesGanancias(
            @Param("inicio") Date inicio,
            @Param("fin") Date fin
    );

    @Query("""
                SELECT new com.proyecto2.backend.entity.TopClientesPedidoDto(
                    p.comprador.idUsuario,
                    CONCAT(p.comprador.nombre, ' ', p.comprador.apellido),
                    COUNT(p.idPedido)
                )
                FROM Pedido p
                WHERE p.fechaPedido BETWEEN :inicio AND :fin
                GROUP BY p.comprador.idUsuario, p.comprador.nombre, p.comprador.apellido
                ORDER BY COUNT(p.idPedido) DESC
            """)
    List<TopClientesPedidoDto> obtenerTop10ClientesPedidos(
            @Param("inicio") Date inicio,
            @Param("fin") Date fin
    );

}
