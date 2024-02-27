
-- eliminar base de datos si existe 0000G=8[;-0\P[;
drop database if exists pedidosexpress;

-- crear base de datos si no existe
create database if not exists pedidosexpress;

-- usar base de datos creada
use pedidosexpress;


-- crear enum mtype para el tipo de usuario
create type mtype as enum(
    'ECOMMERCE',
    'CLIENT'
);

-- crear enum ecommerce_type para el tipo de comercio
create type ecommerce_type as enum(
    'GANADERIA',
    'REPOSTERIA',
    'MOBILIARIO',
    'VIVERES',
    'AUTOMOTRIZ'
);

-- crear la tabla usuarios para gestionar el comercio o cliente
create table users(
    user_id varchar(50) not null primary key,
    name varchar(50) not null,
    lastname varchar(50) not null,
    email varchar(100) not null,
    password varchar(100) not null,
    address varchar(255) not null,
    type mtype default 'CLIENT'
);

-- crear la tabla comercio para gestionar los pedidos, pagos etc
create table ecommerce(
    ecommerce_id varchar(50) not null primary key,
    name varchar(100) not null,
    address varchar(255) not null,
    rif varchar(30) not null,
    type_ecommerce ecommerce_type not null,
    contribuyente_especial varchar(2),
    user_id varchar(50) not null -- llave foreana para saber a que usuario pertenece el comercio
);

-- crear tabla cliente para gestionar los pedidos del cliente
create table client(
    client_id varchar(50) not null primary key,
    name varchar(100) not null,
    address varchar(255) not null,
    rif varchar(30) not null
);

create table product(
    product_id varchar(50) not null primary key,
    name varchar(100) not null,
    create_at timestamp not null,
    price varchar(255) not null,
    commerce_id varchar(50) -- llave foreanea donde pertenece este producto del comercio
);

create table pedido(
    pedido_id varchar(50) not null primary key,
    client_id varchar(50) not null,
    product_id varchar(50) not null,
    create_at timestamp not null,
);

create table venta(
    venta_id varchar(50) not null primary key,
    client_id varchar(50) not null,
    
);