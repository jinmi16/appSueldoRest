'use strict'
var express=require('express');
var bodyParser=require('body-parser');
var app=express();

// cargar rutas
var user_routes=require('./routes/usuario');


// middlewares de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// configurar cabeceras y cors
// configurar cabeceras y cors
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
    next();

});






// rutas base
app.use('/api',user_routes);


// ------------------------------------
app.get('/probando',(req,res)=>{
    res.status(200).send({mensaje:'este es un metodo de prueba'});
});

module.exports=app;
