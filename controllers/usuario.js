'use strict'
// modulos
var bcrypt = require('bcrypt-nodejs');
// modelos
var User = require('../models/usuario');

function pruebas(req, res) {
    res.status(200).send({
        mensaje: 'probando controlador de usuarios APIS REST',
        // user: req.user
    });
}

// insertar usuario
function saveUser(req, res) {

    // creo el objeto del usuario
    var user = new User();
    // recojer parametros peticion
    //  console.log(JSON.stringify(req));
    var params = req.body;
    // console.log(params);

    if (params.nikname && params.password && params.nombre && params.apellido) {
        // asignar valores al objeto usuario
        user.nikname = params.nikname;
        user.password = params.password;
        user.nombre = params.nombre;
        user.apellido = params.apellido;
        user.email = params.email;
        user.telefono = params.telefono;
        user.edad = params.edad;
        user.rol = params.rol;

        User.findOne({
            email: user.email.toLowerCase()
        }, (err, issetUser) => {

            if (err) {
                res.status(500).send({
                    mensaje: 'Error al comprobar el usuario'
                });

            } else {
                
                if (!issetUser) {
                    // ciframos contraseña

                    bcrypt.hash(params.password, null, null, function (err, hash) {
                        user.password = hash;
                        //guardar usuario en la BD
                        user.save((err, userStored) => {
                            if (err) {
                                res.status(500).send({
                                    mensaje: 'Error al guardar el usuario'
                                });
                            } else {
                                if (!userStored) {
                                    res.status(404).send({
                                        mensaje: 'No se ha registrado el usuario'
                                    });
                                } else {

                                    res.status(200).send({
                                        user: userStored
                                    });
                                }

                            }

                        });
                    });


                } else {
                    res.status(200).send({
                        mensaje: 'El usuario ya existe'
                    });
                }
            }

        });




        /*
                // ciframos contraseña
                bcrypt.hash(params.password, null, null, function (err, hash) {
                    user.password = hash;
                    //guardar usuario en la BD

                    user.save((err, userStored) => {

                        if (err) {
                            res.status(500).send({
                                mensaje: 'Error al guardar el usuario'
                            });
                        } else {
                            if (!userStored) {
                                res.status(404).send({
                                    mensaje: 'No se ha registrado el usuario'
                                });
                            } else {

                                res.status(200).send({
                                    user: userStored
                                });
                            }
                        }
                    });

                });

        */

    } else {
        res.status(200).send({
            mensaje: 'ingresa datos correctamente'
        });
    }


}

module.exports = {
    pruebas,
    saveUser
};