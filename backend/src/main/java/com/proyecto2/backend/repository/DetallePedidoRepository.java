package com.proyecto2.backend.repository;

import com.proyecto2.backend.entity.DetallePedido;
import com.proyecto2.backend.entity.TopProductoDto;
import com.proyecto2.backend.entity.TopVendedorDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface DetallePedidoRepository extends JpaRepository<DetallePedido, Integer> {

    @Query("""
        SELECT new com.proyecto2.backend.entity.TopProductoDto(
            dp.producto.idProducto,
            dp.producto.nombre,
            SUM(dp.cantidad)
        )
        FROM DetallePedido dp
        WHERE dp.pedido.fechaPedido BETWEEN :inicio AND :fin
        GROUP BY dp.producto.idProducto, dp.producto.nombre
        ORDER BY SUM(dp.cantidad) DESC
        """)
    List<TopProductoDto> obtenerTop10ProductosMasVendidos(
            @Param("inicio") Date inicio,
            @Param("fin") Date fin
    );

    @Query("""
                SELECT new com.proyecto2.backend.entity.TopVendedorDto(
                    dp.vendedor.idUsuario,
                    CONCAT(dp.vendedor.nombre, ' ', dp.vendedor.apellido),
                    SUM(dp.cantidad)
                )
                FROM DetallePedido dp
                WHERE dp.pedido.fechaPedido BETWEEN :inicio AND :fin
                GROUP BY dp.vendedor.idUsuario, dp.vendedor.nombre, dp.vendedor.apellido
                ORDER BY SUM(dp.cantidad) DESC
            """)
    List<TopVendedorDto> obtenerTop5Vendedores(@Param("inicio") Date inicio, @Param("fin") Date fin);
}
