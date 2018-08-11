'use strict'
var express=require('express');
var bodyParser=require('body-parser');
var app=express();

// cargar rutas

// middlewares de body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// configurar cabeceras y cors

// rutas base
app.get('/probando',(req,res)=>{
    res.status(200).send({mensaje:'este es un metodo de prueba'});
});

module.exports=app;
