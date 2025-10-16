package com.proyecto2.backend.controller;
import com.proyecto2.backend.dto.ProductDto;
import com.proyecto2.backend.entity.Producto;
import com.proyecto2.backend.entity.Usuario;
import com.proyecto2.backend.repository.CategoriaRepository;
import com.proyecto2.backend.repository.UsuarioRepository;
import com.proyecto2.backend.service.ProductoService;
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
@CrossOrigin(origins = "http://localhost:4200")
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

    @GetMapping("/{id}")
    public ResponseEntity<List<ProductDto>> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(productoService.findByVendedor_IdUsuario(id));
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
