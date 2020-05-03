/*CREACION Y CONEXIÓN DE LA BD*/
CREATE DATABASE gestiongym;
\c gestiongym;

/*TABLA GYMS*/
CREATE TABLE gimnasio (
	id_gimnasio INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	nombre varchar(50),
	ciudad VARCHAR(50),
	direccion VARCHAR(50),
	codigo_postal INT,
	provincia VARCHAR(50),
	pais VARCHAR(50)
);

/*TABLA CLIENTES*/
CREATE TABLE cliente (
	id_cliente INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	id_gimnasio INT REFERENCES gimnasio(id_gimnasio),
	dni VARCHAR(9) UNIQUE,
	nombre VARCHAR(50) NOT NULL,
	apellidos VARCHAR(50) NOT NULL,
	fecha_nacimiento VARCHAR(10) NOT NULL,
	fecha_inscripcion VARCHAR(10) NOT NULL,
	email VARCHAR UNIQUE,
	calle VARCHAR,
	codigo_postal INT,
	ciudad VARCHAR,
	provincia VARCHAR,
	telefono VARCHAR,
	telefono_emergencia VARCHAR,
	iban VARCHAR
);

CREATE TABLE usuario (
	id_usuario INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	id_registrohorario INT REFERENCES registrohorario(id_registrohorario),
	username VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	password2 VARCHAR,
	avatar varchar,
	fecha_creacion VARCHAR,
	ultima_mod_password VARCHAR,
	verificado BOOLEAN NOT NULL,
	rol VARCHAR
);
 
CREATE TABLE usuario_rol(
	id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	usuario_id_usuario int,
	rol VARCHAR NOT NULL
);
/*TABLA CHECK_HORAS*/
CREATE TABLE registrohorario (
	id_registrohorario INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	horaEntrada VARCHAR,
	horaSalida VARCHAR,
	dia INT,
	mes INT,
	anio INT
);

ALTER TABLE usuario
        ADD FOREIGN KEY (id_usuario) REFERENCES cliente (id_cliente)
                DEFERRABLE INITIALLY DEFERRED;
 
ALTER TABLE cliente
        ADD FOREIGN KEY (id_cliente) REFERENCES usuario (id_usuario)
                DEFERRABLE INITIALLY DEFERRED;
 


insert into public.gimnasio (direccion, codigo_postal, pais, ciudad, nombre,provincia) values ( 'Passeig de pere III 92', 08241, 'España', 'Manresa','Manresa1','Barcelona');
insert into public.usuario (direccion, codigo_postal, pais, ciudad, nombre,provincia) values ( 'Passeig de pere III 92', 08241, 'España', 'Manresa','Manresa1','Barcelona');
insert into public.cliente ( id_gimnasio, dni, nombre, apellidos, fecha_nacimiento, fecha_inscripcion, email, calle, codigo_postal, ciudad, provincia, telefono, telefono_emergencia, iban) values (1,'39527852Y','Neifi','Alcantara','27/11/1996','02/05/2020','neifi@gmail.es','Calle cos 11 1-1',08241,'Manresa','Barcelona','(34)631285366','(34)631381231','ES4801282374565991935943');
