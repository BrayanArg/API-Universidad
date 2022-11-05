var orderController = require('./ordersController.js');
// var asignaturas = require('./asignaturas.js');
// var estudiantes = require('./estudiantes.js');
// var docentes = require('./docentes.js');
// var record_academico = require('./record_academico.js');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
//const { application } = require('express');
//const { connect } = require('mssql');
var router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);
//Creación server localhost://
var port = process.env.port || 8090;
app.listen(port);
console.log('running in the port '+ port);

router.use((request,response,next) =>{
console.log('Welcome, Time:', Date.now());
next();
});

router.route('/mostrar').get((request, response)=>{
    orderController.mostrar().then(result =>{
        response.json(result);
        console.log(result)
    })
})

router.route('/mostrar/:id').get((request, response)=>{
    orderController.mostrarxId(request.params.id).then(result =>{
        response.json(result);
        console.log(result)
    })
})

//CREAR -----------------------------------------------------------------------------------------------------------
//asignaturas
router.route('/asignaturas/crear').post((request, response)=>{
    let order = {...request.body}
    orderController.postAsig(order).then(result =>{
        response.status(201).json(result);        
        console.log(result)
       console.log('Creado!!!')
    })
})
//estudiantes
router.route('/estudiantes/crear').post((request, response)=>{
    let order = {...request.body}
    orderController.postEst(order).then(result =>{
        response.status(201).json(result);        
        console.log(result)
       console.log('Creado!!!')
    })
})
//docentes
router.route('/docentes/crear').post((request, response)=>{
    let order = {...request.body}
    orderController.postDoc(order).then(result =>{
        response.status(201).json(result);        
        console.log(result)
       console.log('Creado!!!')
    })
})

//record academico
router.route('/recorda/crear').post((request, response)=>{
    let order = {...request.body}
    orderController.postRA(order).then(result =>{
        response.status(201).json(result);        
        console.log(result)
       console.log('Creado!!!')
    })
})

//ACTUALIZAR ------------------------------------------------------------------------------------------------------
//Asignatura
router.route('/asignaturas/edit/:id').put((request, response)=>{
    let order = {...request.body}
    orderController.putAsig(order,request.params.id).then(result =>{
       response.json(result)     
        console.log(result)
       console.log('Editado!!!')
    })
})

//Estudiante
router.route('/estudiantes/edit/:id').put((request, response)=>{
    let order = {...request.body}
    orderController.putEst(order,request.params.id).then(result =>{
       response.json(result)     
        console.log(result)
       console.log('Editado!!!')
    })
})

//Docente
router.route('/docentes/edit/:id').put((request, response)=>{
    let order = {...request.body}
    orderController.putDoc(order,request.params.id).then(result =>{
       response.json(result)     
        console.log(result)
       console.log('Editado!!!')
    })
})

//Record academico
router.route('/recorda/edit/:id').put((request, response)=>{
    let order = {...request.body}
    orderController.putRA(order,request.params.id).then(result =>{
       response.json(result)     
        console.log(result)
       console.log('Editado!!!')
    })
})
//ELIMINAR --------------------------------------------------------------------------------------------------------
//Asignatura
router.route('/asignaturas/delete/:id').delete((request, response)=>{
   let order = {...request.body}
    orderController.deleteAsig(order,request.params.id).then(result =>{
       response.json(result)     
       // console.log(result)
       console.log('Eliminado!!!')
    })
})

//Estudiantes
router.route('/estudiantes/delete/:id').delete((request, response)=>{
    let order = {...request.body}
     orderController.deleteEst(order,request.params.id).then(result =>{
        response.json(result)     
        // console.log(result)
        console.log('Eliminado!!!')
     })
 })

//Docentes
router.route('/docentes/delete/:id').delete((request, response)=>{
    let order = {...request.body}
     orderController.deleteDoc(order,request.params.id).then(result =>{
        response.json(result)     
        // console.log(result)
        console.log('Eliminado!!!')
     })
 })

//Record academico
router.route('/recorda/delete/:id').delete((request, response)=>{
    let order = {...request.body}
     orderController.deleteRA(order,request.params.id).then(result =>{
        response.json(result)     
        // console.log(result)
        console.log('Eliminado!!!')
     })
 }) 