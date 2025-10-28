CREATE DATABASE proyecto2;

DROP TABLE IF EXISTS notificaciones CASCADE;
DROP TABLE IF EXISTS sanciones CASCADE;
DROP TABLE IF EXISTS calificaciones CASCADE;
DROP TABLE IF EXISTS detalle_pedido CASCADE;
DROP TABLE IF EXISTS pedidos CASCADE;
DROP TABLE IF EXISTS carrito_items CASCADE;
DROP TABLE IF EXISTS carritos CASCADE;
DROP TABLE IF EXISTS tarjetas_credito CASCADE;
DROP TABLE IF EXISTS solicitudes_producto CASCADE;
DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;
DROP TABLE IF EXISTS roles CASCADE;

CREATE TABLE roles
(
    id_rol      SERIAL PRIMARY KEY,
    nombre_rol  VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);

CREATE TABLE usuarios
(
    id_usuario       SERIAL PRIMARY KEY,
    nombre           VARCHAR(100) NOT NULL,
    apellido         VARCHAR(100) NOT NULL,
    email            VARCHAR(150) NOT NULL UNIQUE,
    password         VARCHAR(255) NOT NULL,
    telefono         VARCHAR(20),
    direccion        TEXT,
    fecha_nacimiento DATE,
    id_rol           INTEGER      NOT NULL,
    fecha_registro   DATE    DEFAULT CURRENT_DATE,
    cuenta_activa    BOOLEAN DEFAULT TRUE,
    fecha_suspension DATE,
    FOREIGN KEY (id_rol) REFERENCES roles (id_rol)
);

CREATE TABLE categorias
(
    id_categoria     SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(50) NOT NULL UNIQUE,
    descripcion      TEXT
);

CREATE TABLE productos
(
    id_producto         SERIAL PRIMARY KEY,
    id_vendedor         INTEGER        NOT NULL,
    id_categoria        INTEGER        NOT NULL,
    nombre              VARCHAR(200)   NOT NULL,
    descripcion         TEXT           NOT NULL,
    magen_url           TEXT,
    precio              DECIMAL(10, 2) NOT NULL CHECK (precio > 0),
    stock               INTEGER        NOT NULL CHECK (stock >= 0),
    estado              VARCHAR(20)    NOT NULL CHECK (estado IN ('nuevo', 'usado')),
    estado_aprobacion   VARCHAR(20) DEFAULT 'pendiente' CHECK (estado_aprobacion IN ('pendiente', 'aprobado', 'rechazado')),
    activo              BOOLEAN     DEFAULT TRUE,
    fecha_creacion      DATE        DEFAULT CURRENT_DATE,
    fecha_actualizacion DATE        DEFAULT CURRENT_DATE,
    FOREIGN KEY (id_vendedor) REFERENCES usuarios (id_usuario),
    FOREIGN KEY (id_categoria) REFERENCES categorias (id_categoria)
);

CREATE TABLE solicitudes_producto
(
    id_solicitud         SERIAL PRIMARY KEY,
    id_producto          INTEGER NOT NULL,
    id_moderador         INTEGER,
    fecha_solicitud      DATE        DEFAULT CURRENT_DATE,
    fecha_revision       DATE,
    estado               VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'aprobado', 'rechazado')),
    comentario_moderador TEXT,
    FOREIGN KEY (id_moderador) REFERENCES usuarios (id_usuario)
);

CREATE TABLE tarjetas_credito
(
    id_tarjeta       SERIAL PRIMARY KEY,
    id_usuario       INTEGER      NOT NULL,
    numero_tarjeta   VARCHAR(16)  NOT NULL,
    nombre_titular   VARCHAR(150) NOT NULL,
    fecha_expiracion VARCHAR(7)   NOT NULL, -- Formato: MM/YYYY
    cvv              VARCHAR(4)   NOT NULL,
    tipo_tarjeta     VARCHAR(20) CHECK (tipo_tarjeta IN ('visa', 'mastercard', 'american_express')),
    es_principal     BOOLEAN DEFAULT FALSE,
    fecha_registro   DATE    DEFAULT CURRENT_DATE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
);

CREATE TABLE carritos
(
    id_carrito          SERIAL PRIMARY KEY,
    id_usuario          INTEGER NOT NULL UNIQUE,
    fecha_creacion      DATE DEFAULT CURRENT_DATE,
    fecha_actualizacion DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
);

CREATE TABLE carrito_items
(
    id_carrito_item SERIAL PRIMARY KEY,
    id_carrito      INTEGER        NOT NULL,
    id_producto     INTEGER        NOT NULL,
    cantidad        INTEGER        NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10, 2) NOT NULL,
    fecha_agregado  DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (id_carrito) REFERENCES carritos (id_carrito) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos (id_producto),
    UNIQUE (id_carrito, id_producto)
);

CREATE TABLE pedidos
(
    id_pedido              SERIAL PRIMARY KEY,
    id_comprador           INTEGER        NOT NULL,
    id_tarjeta             INTEGER        NOT NULL,
    total                  DECIMAL(10, 2) NOT NULL,
    fecha_pedido           DATE        DEFAULT CURRENT_DATE,
    fecha_entrega_estimada DATE           NOT NULL,
    fecha_entrega_real     DATE,
    estado                 VARCHAR(20) DEFAULT 'en curso' CHECK (estado IN ('en curso', 'entregado')),
    direccion_entrega      TEXT           NOT NULL,
    FOREIGN KEY (id_comprador) REFERENCES usuarios (id_usuario),
    FOREIGN KEY (id_tarjeta) REFERENCES tarjetas_credito (id_tarjeta)
);

CREATE TABLE detalle_pedido
(
    id_detalle          SERIAL PRIMARY KEY,
    id_pedido           INTEGER        NOT NULL,
    id_producto         INTEGER        NOT NULL,
    id_vendedor         INTEGER        NOT NULL,
    cantidad            INTEGER        NOT NULL CHECK (cantidad > 0),
    precio_unitario     DECIMAL(10, 2) NOT NULL,
    subtotal            DECIMAL(10, 2) NOT NULL,
    comision_plataforma DECIMAL(10, 2) NOT NULL, -- 5% del subtotal
    ganancia_vendedor   DECIMAL(10, 2) NOT NULL, -- 95% del subtotal
    FOREIGN KEY (id_pedido) REFERENCES pedidos (id_pedido),
    FOREIGN KEY (id_producto) REFERENCES productos (id_producto),
    FOREIGN KEY (id_vendedor) REFERENCES usuarios (id_usuario)
);

CREATE TABLE calificaciones
(
    id_calificacion    SERIAL PRIMARY KEY,
    id_producto        INTEGER NOT NULL,
    id_usuario         INTEGER NOT NULL,
    id_pedido          INTEGER NOT NULL,
    puntuacion         INTEGER NOT NULL CHECK (puntuacion BETWEEN 1 AND 5),
    comentario         TEXT,
    fecha_calificacion DATE DEFAULT CURRENT_DATE,
    FOREIGN KEY (id_producto) REFERENCES productos (id_producto),
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
    FOREIGN KEY (id_pedido) REFERENCES pedidos (id_pedido),
    UNIQUE (id_producto, id_usuario, id_pedido)
);

CREATE TABLE sanciones
(
    id_sancion        SERIAL PRIMARY KEY,
    id_usuario        INTEGER NOT NULL,
    id_moderador      INTEGER NOT NULL,
    motivo            TEXT    NOT NULL,
    fecha_sancion     DATE        DEFAULT CURRENT_DATE,
    fecha_fin_sancion DATE,
    estado            VARCHAR(20) DEFAULT 'activa' CHECK (estado IN ('activa', 'finalizada')),
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario),
    FOREIGN KEY (id_moderador) REFERENCES usuarios (id_usuario)
);

CREATE TABLE notificaciones
(
    id_notificacion   SERIAL PRIMARY KEY,
    id_usuario        INTEGER      NOT NULL,
    tipo_notificacion VARCHAR(50)  NOT NULL CHECK (tipo_notificacion IN
                                                   ('pedido_entregado', 'producto_aprobado', 'producto_rechazado',
                                                    'cambio_estado_pedido')),
    asunto            VARCHAR(200) NOT NULL,
    mensaje           TEXT         NOT NULL,
    fecha_envio       DATE    DEFAULT CURRENT_DATE,
    enviado           BOOLEAN DEFAULT FALSE,
    leido             BOOLEAN DEFAULT FALSE,
    id_referencia     INTEGER, -- ID del pedido o producto relacionado
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
);
