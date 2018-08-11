'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

// coneccion a base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/bd_appSueldo', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('la connexion a la base de datos se ha realizado');
         app.listen(port,()=>{
             console.log('el servidor local con node y express esta corriento correctamente');

         });
         
    }
});