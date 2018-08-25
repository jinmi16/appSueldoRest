'use strict'
// modulos
var bcrypt = require('bcrypt-nodejs');
// servicios
var jwt = require('../services/jwt');

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
// login de ususarios

function login(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    //comprobamos que el usuario existe
    User.findOne({
        email: email.toLowerCase()
    }, (err, user) => {
        if (err) {
            res.status(500).send({
                mensaje: 'Error al comprobar el usuario'
            });

        } else {

            if (user) {
                // usuario existe-> validamos contraseña
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {

                        if (params.gettoken) {
                            // devolvemos token
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({
                                user
                            });

                        }




                        /*
                        res.status(200).send({
                            user
                        });
                        */
                    } else {
                        res.status(404).send({
                            mensaje: 'El usuario no ha podido logearce correctamente'
                        });
                    }
                });
            } else {
                res.status(404).send({
                    mensaje: 'El usuario no ha podido logearse'
                });
            }
        }
    });

    /*
        res.status(200).send({
            mensaje: 'probando metodo login',
           //  user: req.user
        });
    */
}
// actualizar usuario
function updateUser(req, res) {
    var userId = req.params.id;// recojemos parametro de la url
    var update = req.body;// capturamos datos a actualizar
    if (userId != req.user.sub) {// comparamos usuario enviado por url y el usuario del token 
        res.status(500).
        send({
            mensaje: 'no tienes permiso para actualizar el usuario'
        });
    }

    User.findByIdAndUpdate(userId, update, {// actualizamos el usuario
        new: true
    }, (err, userUpdated) => {
        if (err) {
            res.status(500).send({
                mensaje: 'error al actualizar usuario usuario'
            });
        } else {
            if (!userUpdated) {
                res.status(500).send({
                    mensaje: 'error al actualizar usuario usuario'
                });
            } else {
                res.status(200).send({
                    user: userUpdated
                });
            }
        }
    });

    /*
    res.status(200).send({
        mensaje: 'probando controlador de actualizar usuario',
      //  user: req.user
    });
    */


}

function getUser(req, res) {

    User.find().exec((err, users) => {
        if (err) {
            res.status(500).send({
                mensaje: 'error en la peticion'
            });
        } else {
            if (!users) {
                res.status(404).send({
                    mensaje: 'no hay usuarios'
                });
            } else {
                res.status(200).send(users);
            }
        }
    });
}

function getUserId(req, res) {
    var userId = req.params.id;
    User.find({
        _id : userId
    }).exec((err, users) => {
        if (err) {
            res.status(500).send({
                mensaje: 'error en la peticion'
            });
        } else {
            if (!users) {
                res.status(404).send({
                    mensaje: 'no hay usuarios'
                });
            } else {
                res.status(200).send(users);
            }
        }
    });
   
}






module.exports = {
    pruebas,
    saveUser,
    login,
    updateUser,
    getUser,
    getUserId
};