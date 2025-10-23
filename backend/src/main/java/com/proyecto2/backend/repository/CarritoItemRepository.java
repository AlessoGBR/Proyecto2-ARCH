package com.proyecto2.backend.repository;

import com.proyecto2.backend.entity.Carrito;
import com.proyecto2.backend.entity.CarritoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarritoItemRepository extends JpaRepository<CarritoItem, Integer> {

    Optional<CarritoItem> findByCarrito_IdCarritoAndProducto_IdProducto(Integer idCarrito, Integer idProducto);

    List<CarritoItem> findByCarrito(Carrito carrito);
}
