CREATE DATABASE universidad
GO
USE universidad
GO
CREATE TABLE asignatura(
id int identity (1,1), 
codigo varchar (5) NOT NULL PRIMARY KEY,
nombre varchar (30),
creditos tinyint
)
GO
CREATE TABLE docentes(
id int identity (1,1),
codigo varchar (5)NOT NULL PRIMARY KEY,
nombre varchar (15),
apellido varchar (15),
cod_asignatura varchar (5) constraint fk_docentes_01
FOREIGN KEY REFERENCES asignatura(codigo)
ON UPDATE CASCADE
)
GO
CREATE TABLE estudiantes(
id int identity (1,1),
codigo varchar (5)NOT NULL PRIMARY KEY,
nombre varchar (15),
apellidos varchar (15),
carrera varchar (30),
semestre varchar (15),
cod_asignatura varchar (5) constraint fk_estudiantes_01
FOREIGN KEY REFERENCES asignatura(codigo)
ON UPDATE CASCADE
)
GO
CREATE TABLE record_academico(
id int identity (1,1),
codigo varchar (5) NOT NULL PRIMARY KEY,
fecha date,
periodo varchar (10),
cod_estudiante varchar (5) constraint fk_recordacademico_01
FOREIGN KEY REFERENCES estudiantes(codigo),
cod_docente varchar (5) constraint fk_recordacademico_02
FOREIGN KEY REFERENCES docentes(codigo)
ON UPDATE CASCADE,
nota_1 decimal (3,2),
nota_2 decimal (3,2),
nota_3 decimal (3,2),
promedio AS (nota_1+nota_2+nota_3)/3
)

select * from asignatura
------------SP MOSTRAR TABLAS---------------------------------------------------------------------------------------------
GO
CREATE PROCEDURE sp_mostrar_estudiantes 
AS 
	BEGIN
	SELECT * FROM estudiantes;
END
GO
CREATE PROCEDURE sp_mostrar_asignatura 
AS
	BEGIN
	SELECT * FROM asignatura ;
END
GO
CREATE PROCEDURE sp_mostrar_docentes 
AS 
	BEGIN
	SELECT * FROM docentes ;
END
GO
CREATE PROCEDURE sp_mostrar_record_academico 
AS 
	BEGIN
	SELECT * FROM record_academico ;
END

------MOSTRAR POR ID -------------------------------
--------ESTUDIANTES--------------------
GO
CREATE PROC sp_buscarxid_e(
	@Id INT
) 
AS 
	BEGIN
	SELECT * FROM estudiantes WHERE id = @Id 
END

--------DOCENTES--------------------
GO
CREATE PROC sp_buscarxid_d(
	@Id INT
) 
AS 
	BEGIN
	SELECT * FROM docentes WHERE id = @Id 
END
--------ASIGNATURA--------------------
GO
CREATE PROC sp_buscarxid_a(
	@Id INT
) 
AS 
	BEGIN
	SELECT * FROM asignatura WHERE id = @Id 
END
--------RECOR ACADEMICO--------------------
GO
CREATE PROC sp_buscarxid_ra(
	@Id INT
) 
AS 
	BEGIN
	SELECT * FROM record_academico WHERE id = @Id 
END



-------------------CREAR------------
GO
CREATE PROC sp_crear_asignatura(
	@codigo varchar(5),
	@nombre varchar(30),
	@creditos tinyint
)AS 
BEGIN
	INSERT INTO asignatura(codigo, nombre, creditos) VALUES(@codigo, @nombre, @creditos)
END

exec sp_crear_asignatura 'A0010','FÍSICA III', '4'

select * from asignatura

GO
alter PROC sp_crear_estudiante(
	@codigo varchar(5),
	@nombre varchar(15),
	@apellidos varchar(15),
	@carrera varchar(30),
	@semestre varchar(30),
	@cod_asignatura varchar(5)
)AS 
BEGIN
	INSERT INTO estudiantes(codigo, nombre, apellidos, carrera, semestre, cod_asignatura) 
	VALUES(@codigo, @nombre, @apellidos, @carrera, @semestre, @cod_asignatura)
END


execute sp_rename 'estudiantes.apellido', 'apellidos'
execute sp_rename 'docentes.apellido', 'apellidos'

create PROC sp_crear_docente(
	@codigo varchar(5),
	@nombre varchar(15),
	@apellidos varchar(15),
	@cod_asignatura varchar(5)
	
)AS 
BEGIN
	INSERT INTO docentes(codigo, nombre, apellidos, cod_asignatura) 
	VALUES(@codigo, @nombre, @apellidos, @cod_asignatura)
END

create PROC sp_crear_recordA(
	@codigo varchar(5),
	@fecha date,
	@periodo varchar(10),
	@cod_estudiante varchar(5),
	@cod_docente varchar(5),
	@nota_1 decimal(3,2),
	@nota_2 decimal(3,2),
	@nota_3 decimal(3,2)
	
)AS 
BEGIN
	INSERT INTO record_academico(codigo, fecha, periodo, cod_estudiante, cod_docente, nota_1, nota_2, nota_3) 
	VALUES(@codigo, @fecha, @periodo, @cod_estudiante, @cod_docente, @nota_1, @nota_2, @nota_3)
END


-----UPDATE----------------------------------------------------------------------------------------
---ASIGNATURAS-----------------
GO
create PROC sp_put_asignatura(
	@id INT,
	@codigo VARCHAR(5),
	@nombre VARCHAR(30),
	@creditos TINYINT
)
AS 
	BEGIN
	UPDATE asignatura SET codigo = @codigo WHERE id = @id
	UPDATE asignatura SET nombre = @nombre WHERE id = @id
	UPDATE asignatura SET creditos = @creditos WHERE id = @id
END

---DOCENTES-----------------
create PROC sp_put_docente(
	@id INT,
	@codigo VARCHAR(5),
	@nombre VARCHAR(15),
	@apellidos VARCHAR(15),
	@cod_asignatura VARCHAR (5)
)
AS 
	BEGIN
	UPDATE docentes SET codigo = @codigo WHERE id = @id
	UPDATE docentes SET nombre = @nombre WHERE id = @id
	UPDATE docentes SET apellidos = @apellidos WHERE id = @id
	UPDATE docentes SET cod_asignatura = @cod_asignatura WHERE id = @id
END

---ESTUDIANTES-----------------
GO
CREATE PROC sp_put_estudiante(
	@id INT,
	@codigo VARCHAR(5),
	@nombre VARCHAR(15),
	@apellidos VARCHAR(15),
	@carrera VARCHAR (30),
	@semestre VARCHAR (30),
	@cod_asignatura VARCHAR (5)
)
AS 
	BEGIN
	UPDATE estudiantes SET codigo = @codigo WHERE id = @id
	UPDATE estudiantes SET nombre = @nombre WHERE id = @id
	UPDATE estudiantes SET apellidos = @apellidos WHERE id = @id
	UPDATE estudiantes SET carrera = @carrera WHERE id = @id
	UPDATE estudiantes SET semestre = @semestre WHERE id = @id
	UPDATE estudiantes SET cod_asignatura = @cod_asignatura WHERE id = @id
END

------RECORD ACADEMICO-----------------
GO
CREATE PROC sp_put_ra(
	@id INT,
	@codigo VARCHAR(5),
	@fecha DATE,
	@periodo VARCHAR(10),
	@cod_estudiante VARCHAR (5),
	@cod_docente VARCHAR (5),
	@nota_1 decimal (3,2),
	@nota_2 decimal (3,2),
	@nota_3 decimal (3,2)
)
AS 
	BEGIN
	UPDATE record_academico SET codigo = @codigo WHERE id = @id
	UPDATE record_academico SET fecha = @fecha WHERE id = @id
	UPDATE record_academico SET periodo = @periodo WHERE id = @id
	UPDATE record_academico SET cod_estudiante = @cod_estudiante WHERE id = @id
	UPDATE record_academico SET cod_docente = @cod_docente WHERE id = @id
	UPDATE record_academico SET nota_1 = @nota_1 WHERE id = @id
	UPDATE record_academico SET nota_2 = @nota_2 WHERE id = @id
	UPDATE record_academico SET nota_3 = @nota_3 WHERE id = @id
END


--------ELIMINAR POR ID-----------------------------------------------------------------------------
-----------ASIGNATURAS-----------------------------
GO
CREATE PROC sp_del_asignatura(
@id INT
)
AS
	BEGIN
		DELETE FROM asignatura WHERE id = @id
	END

-----------DOCENTES-----------------------------
GO
CREATE PROC sp_del_docente(
@id INT
)
AS
	BEGIN
		DELETE FROM docentes WHERE id = @id
	END
-----------ESTUDIANTES-----------------------------
GO
CREATE PROC sp_del_estudiante(
@id INT
)
AS
	BEGIN
		DELETE FROM estudiantes WHERE id = @id
	END

-----------RECORD ACADEMICO-----------------------------
GO
CREATE PROC sp_del_ra(
@id INT
)
AS
	BEGIN
		DELETE FROM record_academico WHERE id = @id
	END

------------------SP MULTITABLAS----------------------------------------
GO
create PROCEDURE docente_asig
AS
	BEGIN
	SELECT d.codigo, d.nombre AS DOCENTE, asig.nombre AS MATERIA, asig.creditos FROM docentes AS d 
	INNER JOIN asignatura AS asig
	ON asig.codigo = d.cod_asignatura 
	END

execute docente_asig

go
create PROCEDURE sp_est_prom
AS
	BEGIN
	SELECT e.nombre AS Estudiante, asig.nombre AS MATERIA, ra.promedio FROM estudiantes AS e 
	INNER JOIN asignatura AS asig
	ON asig.codigo = e.cod_asignatura
	INNER JOIN record_academico as ra
	on ra.cod_estudiante = e.codigo
	END

	execute sp_est_prom