class record_academico {
    constructor(id, codigo, fecha, periodo, cod_estudiante, cod_docente, nota_1, nota_2, nota_3){
        this.id = id;
        this.codigo = codigo,
        this.fecha = fecha,
        this.periodo = periodo,
        this.cod_estudiante = cod_estudiante,
        this.cod_docente = cod_docente,
        this.nota_1 = nota_1,
        this.nota_2 = nota_2,
        this.nota_3 = nota_3
    }
}
module.exports = record_academico;