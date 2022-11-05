var config = require('./dbconfig');
const sql = require('mssql');
const asignaturas = require('./asignaturas.js')
const estudiantes = require('./estudiantes.js')
const docentes = require('./docentes.js')
const record_academico = require('./record_academico.js')
 
async function mostrar() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request()
    
        .execute("sp_mostrar_asignatura")
        // .execute("sp_mostrar_estudiantes")
        // .execute("sp_mostrar_docentes")
        // .execute("sp_mostrar_record_academico")
        
        // .execute("docente_asig") //Consulta multitabla Docente, materia y créditos de la materia.
        // .execute("sp_est_prom") //Consulta multitabla Estudiante, materia y promedio.


        return products.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function mostrarxId(id) {
    try {
        let pool = await sql.connect(config);        
        let products = await pool.request()
        .input('Id', sql.Int,id)
      
        .execute("sp_buscarxid_a");
        // .execute("sp_buscarxid_e");
        // .execute("sp_buscarxid_d");
        // .execute("sp_buscarxid_ra");
        return products.recordset;
    }
    catch (error) {
        console.log(error);
    }
}
//Crear ---------------------------------------------------------------------------------------------------------------
async function postAsig(asignaturas) {
    try {
        let pool = await sql.connect(config);
        
        let insertProducts = await pool.request()
        .input('codigo', sql.NVarChar,asignaturas.codigo)
        .input('nombre', sql.NVarChar, asignaturas.nombre)
        .input('creditos', sql.TinyInt,asignaturas.creditos)

        .execute('sp_crear_asignatura')
         return insertProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function postEst(estudiantes) {
    try {
        let pool = await sql.connect(config);
        
        let insertProducts = await pool.request()
        .input('codigo', sql.NVarChar,estudiantes.codigo)
        .input('nombre', sql.NVarChar, estudiantes.nombre)
        .input('apellidos', sql.NVarChar,estudiantes.apellidos)
        .input('carrera', sql.NVarChar,estudiantes.carrera)
        .input('semestre', sql.NVarChar,estudiantes.semestre)
        .input('cod_asignatura', sql.NVarChar,estudiantes.cod_asignatura)
        
        .execute('sp_crear_estudiante')
         return insertProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function postDoc(docentes) {
    try {
        let pool = await sql.connect(config);
        
        let insertProducts = await pool.request()
        .input('codigo', sql.NVarChar,docentes.codigo)
        .input('nombre', sql.NVarChar, docentes.nombre)
        .input('apellidos', sql.NVarChar,docentes.apellidos)
        .input('cod_asignatura', sql.NVarChar,docentes.cod_asignatura)
                
        .execute('sp_crear_docente')
         return insertProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function postRA(record_academico) {
    try {
        let pool = await sql.connect(config);
        
        let insertProducts = await pool.request()
        .input('codigo', sql.NVarChar,record_academico.codigo)
        .input('fecha', sql.Date, record_academico.fecha)
        .input('periodo', sql.NVarChar,record_academico.periodo)
        .input('cod_estudiante', sql.NVarChar,record_academico.cod_estudiante)
        .input('cod_docente', sql.NVarChar,record_academico.cod_docente)
        .input('nota_1', sql.Decimal(3,2),record_academico.nota_1)
        .input('nota_2', sql.Decimal(3,2),record_academico.nota_2)
        .input('nota_3', sql.Decimal(3,2),record_academico.nota_3)
                
        .execute('sp_crear_recordA')
         return insertProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Actualizar ------------------------------------------------------------------------------------------------------

async function putAsig(asignaturas,id) {
    try {
        let pool = await sql.connect(config);
        
        let updateProducts = await pool.request()
        .input('id', sql.Int,asignaturas.id)
        .input('codigo', sql.NVarChar,asignaturas.codigo)
        .input('nombre', sql.NVarChar, asignaturas.nombre)
        .input('creditos', sql.TinyInt,asignaturas.creditos)
       
        .execute("sp_put_asignatura")
         return updateProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function putEst(estudiantes,id) {
    try {
        let pool = await sql.connect(config);
        
        let updateProducts = await pool.request()
        .input('id', sql.Int,estudiantes.id)
        .input('codigo', sql.NVarChar,estudiantes.codigo)
        .input('nombre', sql.NVarChar, estudiantes.nombre)
        .input('apellidos', sql.NVarChar,estudiantes.apellidos)
        .input('carrera', sql.NVarChar,estudiantes.carrera)
        .input('semestre', sql.NVarChar,estudiantes.semestre)
        .input('cod_asignatura', sql.NVarChar,estudiantes.cod_asignatura)
      
        .execute("sp_put_estudiante")
         return updateProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function putDoc(docentes,id) {
    try {
        let pool = await sql.connect(config);
        
        let updateProducts = await pool.request()
        .input('id', sql.Int,docentes.id)
        .input('codigo', sql.NVarChar,docentes.codigo)
        .input('nombre', sql.NVarChar, docentes.nombre)
        .input('apellidos', sql.NVarChar,docentes.apellidos)
        .input('cod_asignatura', sql.NVarChar,docentes.cod_asignatura)
        
        .execute("sp_put_docente")
         return updateProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function putRA(record_academico,id) {
    try {
        let pool = await sql.connect(config);
        
        let updateProducts = await pool.request()
        .input('id', sql.Int,record_academico.id)
        .input('codigo', sql.NVarChar,record_academico.codigo)
        .input('fecha', sql.Date, record_academico.fecha)
        .input('periodo', sql.NVarChar,record_academico.periodo)
        .input('cod_estudiante', sql.NVarChar,record_academico.cod_estudiante)
        .input('cod_docente', sql.NVarChar,record_academico.cod_docente)
        .input('nota_1', sql.Decimal(3,2),record_academico.nota_1)
        .input('nota_2', sql.Decimal(3,2),record_academico.nota_2)
        .input('nota_3', sql.Decimal(3,2),record_academico.nota_3)
     
        .execute("sp_put_ra")
         return updateProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

//Eliminar ------------------------------------------------------------------------------------------------------------

async function deleteAsig(asignaturas,id) {
    try {
        let pool = await sql.connect(config);        
        let deleteProducts = await pool.request()

        .input('id', sql.Int,asignaturas.id)
        
        .execute("sp_del_asignatura")
         
         return deleteProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteEst(estudiantes,id) {
    try {
        let pool = await sql.connect(config);        
        let deleteProducts = await pool.request()

        .input('id', sql.Int,estudiantes.id)
        
        .execute("sp_del_estudiante")
         
         return deleteProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteDoc(docentes,id) {
    try {
        let pool = await sql.connect(config);        
        let deleteProducts = await pool.request()

        .input('id', sql.Int,docentes.id)
        
        .execute("sp_del_docente")
         
         return deleteProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteRA(record_academico,id) {
    try {
        let pool = await sql.connect(config);        
        let deleteProducts = await pool.request()

        .input('id', sql.Int,record_academico.id)
        
        .execute("sp_del_ra")
         
         return deleteProducts.recordset;
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {mostrar: mostrar,
     mostrarxId: mostrarxId,
    postAsig: postAsig,
    postEst: postEst,
    postDoc: postDoc,
    postRA: postRA,
    putAsig : putAsig,
    putEst : putEst,
    putDoc : putDoc,
    putRA : putRA,
    deleteAsig: deleteAsig,
    deleteEst: deleteEst,
    deleteDoc: deleteDoc,
    deleteRA: deleteRA
    };