'use strict'
var mongoose= require('mongoose');

// coneccion a base de datos
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost:27017/bd_appSueldo',(err,res)=>{
    if(err){
        throw err;
    }else{
        console.log('la connexion a la base de datos bd_appSueldo se ha realizado');

    }
});
