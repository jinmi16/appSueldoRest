'use strict'

function pruebas(req, res) {
    res.status(200).send({
        mensaje: 'probando controlador de usuarios APIS REST',
       // user: req.user
    });
}

module.exports = {
    pruebas
};
