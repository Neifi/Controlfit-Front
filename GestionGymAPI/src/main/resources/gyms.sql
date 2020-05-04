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
	username VARCHAR NOT NULL,
	password VARCHAR NOT NULL,
	password2 VARCHAR,
	avatar varchar,
	fecha_creacion VARCHAR,
	ultima_mod_password VARCHAR,
	verificado BOOLEAN NOT NULL,
	rol VARCHAR
);
CREATE TABLE registrohorario (
	id_registrohorario INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	id_usuario INT REFERENCES usuario(id_usuario),
	horaEntrada VARCHAR,
	horaSalida VARCHAR,
	dia INT,
	mes INT,
	anio INT
);

 
CREATE TABLE usuario_rol(
	id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	usuario_id_usuario int references usuario(id_usuario),
	rol VARCHAR NOT NULL
);

 


insert into public.gimnasio (direccion, codigo_postal, pais, ciudad, nombre,provincia) values ( 'Passeig de pere III 92', 08241, 'España', 'Manresa','Manresa1','Barcelona');
insert into public.cliente ( id_gimnasio, dni, nombre, apellidos, fecha_nacimiento, fecha_inscripcion, email, calle, codigo_postal, ciudad, provincia, telefono, telefono_emergencia, iban) values (1,'39123852Y','admin','admin','27/11/1996','02/05/2020','neifi@gmail.es','Calle cos 11 1-1',08241,'Manresa','Barcelona','(34)631285366','(34)631381231','ES4801282374565991935943');
insert into public.cliente ( id_gimnasio, dni, nombre, apellidos, fecha_nacimiento, fecha_inscripcion, email, calle, codigo_postal, ciudad, provincia, telefono, telefono_emergencia, iban) values (1,'39783162V','user','user','01/02/1996','02/05/2020','juan@gmail.es','Calle mallorca 36 4-1',08241,'Manresa','Barcelona','(34)689373191','','ES9720385729718233613812');
insert into public.cliente ( id_gimnasio, dni, nombre, apellidos, fecha_nacimiento, fecha_inscripcion, email, calle, codigo_postal, ciudad, provincia, telefono, telefono_emergencia, iban) values (1,'Y3051657P','unverified','unverified','11/04/1992','02/05/2020','maria@gmail.es','Carretera de vic 134 2-2 ',08241,'Manresa','Barcelona','(34)667257327','','ES0704879262838526548852');

insert into public.usuario (username,password,fecha_creacion,ultima_mod_password,verificado) values ('admin','$2y$12$tBb8IOZhtQkleN0MNTE1y.pqoCl8EVkTtPEGuG/ZPNFFBYe3YsyoC','2020-05-02 15:44:20.852+02','2020-05-02 15:44:20.774+02',true);
insert into public.usuario (username,password,fecha_creacion,ultima_mod_password,verificado) values ('user','$2y$12$7V1Mo0FujQvoIPS28r7P1e9yTSghzqKR7ej0iL0R0P5ll/xODVW0W','2020-05-02 15:44:20.852+02','2020-05-02 15:44:20.774+02',true);
insert into public.usuario (username,password,fecha_creacion,ultima_mod_password,verificado) values ('unverified','$2y$12$6WFMUF0jGW/9aTGcyjxn2eCrC51p/nj2UZ6m1vhBSPXVPFJCI1a/a','2020-05-02 15:44:20.852+02','2020-05-02 15:44:20.774+02',false);

insert into public.registrohorario(id_usuario,horaentrada,horasalida,dia,mes,anio) values (1,'11:00:00','14:00:00',04,05,2020);
insert into public.registrohorario(id_usuario,horaentrada,horasalida,dia,mes,anio) values (1,'11:00:00','14:00:00',05,05,2020);
insert into public.registrohorario(id_usuario,horaentrada,horasalida,dia,mes,anio) values (1,'11:00:00','14:00:00',06,05,2020);
insert into public.registrohorario(id_usuario,horaentrada,horasalida,dia,mes,anio) values (1,'11:00:00','14:00:00',07,05,2020);
insert into public.registrohorario(id_usuario,horaentrada,horasalida,dia,mes,anio) values (1,'11:00:00','14:00:00',08,05,2020);
insert into public.registrohorario(id_usuario,horaentrada,horasalida,dia,mes,anio) values (2,'10:00:00','12:00:00',06,05,2020);
insert into public.registrohorario(id_usuario,horaentrada,horasalida,dia,mes,anio) values (2,'10:00:00','12:00:00',07,05,2020);
insert into public.registrohorario(id_usuario,horaentrada,horasalida,dia,mes,anio) values (2,'10:00:00','12:00:00',08,05,2020);
insert into public.registrohorario(id_usuario,horaentrada,horasalida,dia,mes,anio) values (3,'17:00:00','21:00:00',10,05,2020);



insert into public.usuario_rol(usuario_id_usuario,rol) values (1,'ADMIN');
insert into public.usuario_rol(usuario_id_usuario,rol) values (2,'USER');
insert into public.usuario_rol(usuario_id_usuario,rol) values (2,'UNVERIFIED');

ALTER TABLE usuario
        ADD FOREIGN KEY (id_usuario) REFERENCES cliente (id_cliente)
                DEFERRABLE INITIALLY DEFERRED;
 
ALTER TABLE cliente
        ADD FOREIGN KEY (id_cliente) REFERENCES usuario (id_usuario)
                DEFERRABLE INITIALLY DEFERRED;