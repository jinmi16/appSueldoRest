'use strict'
var express = require('express');
var UsuarioController=require('../controllers/usuario');

var api=express.Router();

//api.get('/pruebas-del-controlador',md_auth.ensureAuth,UserController.pruebas);

api.get('/pruebas-del-controlador',UsuarioController.pruebas);
api.get('/register',UsuarioController.saveUser);

module.exports=api;
