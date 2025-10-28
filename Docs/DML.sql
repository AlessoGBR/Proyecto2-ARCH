INSERT INTO roles (nombre_rol, descripcion)
VALUES ('COMUN', 'Usuario común que puede comprar y vender productos'),
       ('MODERADOR', 'Usuario que revisa y aprueba productos para su publicación'),
       ('LOGISTICA', 'Usuario encargado de la gestión y entrega de pedidos'),
       ('ADMINISTRADOR', 'Usuario con acceso completo al sistema y generación de reportes');

INSERT INTO categorias (nombre_categoria, descripcion)
VALUES ('Tecnologia', 'Productos electrónicos, computadoras, smartphones, accesorios tecnológicos'),
       ('Hogar', 'Artículos para el hogar, muebles, electrodomésticos, decoración'),
       ('Academico', 'Libros, materiales educativos, útiles escolares'),
       ('Personal', 'Ropa, accesorios personales, cuidado personal'),
       ('Decoracion', 'Artículos decorativos, arte, plantas, elementos ornamentales'),
       ('Otro', 'Productos que no entran en las categorías anteriores');

-- ==============================
-- USUARIOS COMUNES (10)
-- ==============================
INSERT INTO usuarios (nombre, apellido, email, password, telefono, direccion, fecha_nacimiento, id_rol, fecha_registro,
                      cuenta_activa)
VALUES ('Juan', 'Pérez', 'juan1@gmail.com', '1234', '12345678', 'Ciudad 1', '1990-01-01', 1, CURRENT_DATE, true),
       ('María', 'López', 'maria2@gmail.com', '1234', '22345678', 'Ciudad 2', '1992-02-02', 1, CURRENT_DATE, true),
       ('Pedro', 'Gómez', 'pedro3@gmail.com', '1234', '32345678', 'Ciudad 3', '1988-03-03', 1, CURRENT_DATE, true),
       ('Lucía', 'Hernández', 'lucia4@gmail.com', '1234', '42345678', 'Ciudad 4', '1995-04-04', 1, CURRENT_DATE, true),
       ('Carlos', 'Ramírez', 'carlos5@gmail.com', '1234', '52345678', 'Ciudad 5', '1991-05-05', 1, CURRENT_DATE, true),
       ('Ana', 'García', 'ana6@gmail.com', '1234', '62345678', 'Ciudad 6', '1993-06-06', 1, CURRENT_DATE, true),
       ('José', 'Fernández', 'jose7@gmail.com', '1234', '72345678', 'Ciudad 7', '1994-07-07', 1, CURRENT_DATE, true),
       ('Sofía', 'Díaz', 'sofia8@gmail.com', '1234', '82345678', 'Ciudad 8', '1990-08-08', 1, CURRENT_DATE, true),
       ('Diego', 'Martínez', 'diego9@gmail.com', '1234', '92345678', 'Ciudad 9', '1996-09-09', 1, CURRENT_DATE, true),
       ('Laura', 'Ruiz', 'laura10@gmail.com', '1234', '10345678', 'Ciudad 10', '1998-10-10', 1, CURRENT_DATE, true);

-- ==============================
-- MODERADORES (5)
-- ==============================
INSERT INTO usuarios (nombre, apellido, email, password, telefono, direccion, fecha_nacimiento, id_rol, fecha_registro,
                      cuenta_activa)
VALUES ('Mario', 'Santos', 'mod1@gmail.com', '1234', '5551111', 'Zona 1', '1990-03-10', 2, CURRENT_DATE, true),
       ('Valeria', 'Castillo', 'mod2@gmail.com', '1234', '5552222', 'Zona 2', '1992-04-11', 2, CURRENT_DATE, true),
       ('Camila', 'Mendoza', 'mod3@gmail.com', '1234', '5553333', 'Zona 3', '1989-05-12', 2, CURRENT_DATE, true),
       ('Erick', 'Guzmán', 'mod4@gmail.com', '1234', '5554444', 'Zona 4', '1993-06-13', 2, CURRENT_DATE, true),
       ('Luis', 'Ortiz', 'mod5@gmail.com', '1234', '5555555', 'Zona 5', '1991-07-14', 2, CURRENT_DATE, true);

-- ==============================
-- LOGÍSTICA (3)
-- ==============================
INSERT INTO usuarios (nombre, apellido, email, password, telefono, direccion, fecha_nacimiento, id_rol, fecha_registro,
                      cuenta_activa)
VALUES ('Hugo', 'Salazar', 'log1@gmail.com', '1234', '6661111', 'Bodega 1', '1990-01-20', 3, CURRENT_DATE, true),
       ('Andrea', 'Morales', 'log2@gmail.com', '1234', '6662222', 'Bodega 2', '1992-02-21', 3, CURRENT_DATE, true),
       ('Paula', 'Navarro', 'log3@gmail.com', '1234', '6663333', 'Bodega 3', '1993-03-22', 3, CURRENT_DATE, true);

-- ==============================
-- ADMINISTRADOR (1)
-- ==============================
INSERT INTO usuarios (nombre, apellido, email, password, telefono, direccion, fecha_nacimiento, id_rol, fecha_registro,
                      cuenta_activa)
VALUES ('Administrador', 'Principal', 'admin@gmail.com', 'admin123', '7777777', 'Oficina Central', '1985-01-01', 4,
        CURRENT_DATE, true);

-- ==============================
-- PRODUCTOS (10 por usuario común = 100 productos)
-- ==============================
DO
$$
    DECLARE
        i INT := 1;
        j INT := 1;
    BEGIN
        FOR i IN 1..10
            LOOP
                FOR j IN 1..10
                    LOOP
                        INSERT INTO productos (nombre, descripcion, precio, magen_url, stock, id_categoria, estado,id_vendedor,
                                               estado_aprobacion)
                        VALUES (CONCAT('Producto ', j, ' del usuario ', i),
                                CONCAT('Descripción del producto ', j, ' del usuario ', i),
                                ROUND((RANDOM() * 500 + 50)::numeric, 2),
                                'https://cdn-icons-png.flaticon.com/512/679/679720.png',
                                (5 + (RANDOM() * 20)::INT),
                                (1 + (RANDOM() * 5)::INT),
                                'nuevo',
                                i,
                                'aprobado');
                    END LOOP;
            END LOOP;
    END
$$;
