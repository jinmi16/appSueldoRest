'use strict'
var express = require('express');
var UsuarioController=require('../controllers/usuario');
var api=express.Router();

// middlewares
var md_auth = require('../middlewares/authentited');
api.get('/pruebas-del-controlador',md_auth.ensureAuth,UsuarioController.pruebas);
//api.get('/pruebas-del-controlador',UsuarioController.pruebas);
api.post('/register',UsuarioController.saveUser);
api.post('/login',UsuarioController.login);
api.put('/update/:id',md_auth.ensureAuth, UsuarioController.updateUser);
api.get('/list/:id', md_auth.ensureAuth, UsuarioController.getUserId);
api.get('/list', md_auth.ensureAuth, UsuarioController.getUser);

module.exports=api;
