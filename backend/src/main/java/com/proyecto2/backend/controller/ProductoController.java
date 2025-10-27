package com.proyecto2.backend.controller;
import com.proyecto2.backend.dto.ProductDto;
import com.proyecto2.backend.entity.Producto;
import com.proyecto2.backend.entity.SolicitudProducto;
import com.proyecto2.backend.entity.Usuario;
import com.proyecto2.backend.repository.CategoriaRepository;
import com.proyecto2.backend.service.ProductoService;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoController {
    private final ProductoService productoService;
    private final CategoriaRepository categoriaRepository;

    @GetMapping
    public ResponseEntity<List<ProductDto>> listarProductos() {
        return ResponseEntity.ok(productoService.findByEstadoAprobacion("aprobado"));
    }

    @GetMapping("/no-aprobados")
    public ResponseEntity<List<ProductDto>> listarProductosNoAprobados() {
        return ResponseEntity.ok(productoService.findByEstadoAprobacion("pendiente"));
    }

    @GetMapping("/denegados")
    public ResponseEntity<List<ProductDto>> listarProductosDenegados() {
        return ResponseEntity.ok(productoService.findByEstadoAprobacion("rechazado"));
    }

    @GetMapping("/denegados/{id}")
    public ResponseEntity<List<ProductDto>> listarProductosDenegadosId(@PathVariable Integer id) {
        return ResponseEntity.ok(productoService.findByEstadoAprobacionId("rechazado", id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ProductDto>> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(productoService.findByVendedor_IdUsuario(id));
    }

    @GetMapping("/producto/{id}")
    public ResponseEntity<ProductDto> obtenerProductoPorId(@PathVariable Integer id) {
        ProductDto producto = productoService.obtenerPorId(id);
        if (producto == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(producto);
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<ProductDto>> buscarPorNombre(@RequestParam String nombre) {
        List<ProductDto> productos = productoService.buscarPorNombre(nombre);
        return ResponseEntity.ok(productos);
    }

    @GetMapping("/categoria/{id}")
    public ResponseEntity<List<ProductDto>> buscarPorCategoria(@PathVariable String id) {
        List<ProductDto> productos = productoService.buscarCategoria(id);
        return ResponseEntity.ok(productos);
    }

    @PostMapping
    public ResponseEntity<Producto> crear(@RequestBody Producto producto) {
        return ResponseEntity.ok(productoService.guardar(producto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        productoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<ProductDto> actualizar(@RequestBody ProductDto producto, @PathVariable Integer id) {

        try {
            productoService.actualizar(producto);
            return ResponseEntity.ok(producto);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }

    }

    @PutMapping("/estado/{id}")
    public ResponseEntity<ProductDto> estado(@RequestBody ProductDto producto) {

        try {
            productoService.estado(producto);
            return ResponseEntity.ok(producto);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }

    }

    @PostMapping(value = "/crear", consumes = {"multipart/form-data"})
    public ResponseEntity<Producto> crearProducto(
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("precio") Double precio,
            @RequestParam("stock") Integer stock,
            @RequestParam("estado") String estado,
            @RequestParam("idCategoria") Integer idCategoria,
            @RequestParam("idUsuario") Integer idUsuario,
            @RequestParam(value = "imagen", required = false) List<MultipartFile> imagenes
    ) {
        try {
            Usuario user = new  Usuario();
            user.setIdUsuario(idUsuario);
            Producto producto = new Producto();
            producto.setVendedor(user);
            producto.setNombre(nombre);
            producto.setDescripcion(descripcion);
            producto.setPrecio(precio);
            producto.setStock(stock);
            producto.setEstado(estado);
            producto.setCategoria(categoriaRepository.findById(idCategoria).orElseThrow());
            producto.setEstadoAprobacion("pendiente");
            producto.setActivo(true);
            producto.setFechaCreacion(Date.valueOf(LocalDate.now()));
            producto.setFechaActualizacion(Date.valueOf(LocalDate.now()));

            if (imagenes != null && !imagenes.isEmpty()) {
                String url = guardarImagen(imagenes.get(0));
                producto.setImagenUrl(url);
            }

            Producto guardado = productoService.guardar(producto);
            productoService.crearSolicitudProducto(guardado);
            return ResponseEntity.ok(guardado);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    private String guardarImagen(MultipartFile imagen) throws IOException {
        String carpeta = "uploads/";
        Path directorio = Paths.get(carpeta);
        if (!Files.exists(directorio)) {
            Files.createDirectories(directorio);
        }

        String nombreArchivo = UUID.randomUUID() + "_" + imagen.getOriginalFilename();
        Path rutaArchivo = directorio.resolve(nombreArchivo);
        Files.copy(imagen.getInputStream(), rutaArchivo, StandardCopyOption.REPLACE_EXISTING);

        return "http://localhost:8080/uploads/" + nombreArchivo;
    }




}
