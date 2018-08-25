'use strict'
var express = require('express');
var UsuarioController=require('../controllers/usuario');
var api=express.Router();

// middlewares
var md_auth = require('../middlewares/authentited');
var md_admin = require('../middlewares/is_admin');
api.get('/pruebas-del-controlador',md_auth.ensureAuth,UsuarioController.pruebas);
//api.get('/pruebas-del-controlador',UsuarioController.pruebas);
api.post('/register',UsuarioController.saveUser);
api.post('/login',UsuarioController.login);
api.put('/update/:id',md_auth.ensureAuth, UsuarioController.updateUser);
api.get('/list/:id', md_auth.ensureAuth, UsuarioController.getUserId);
api.get('/list', md_auth.ensureAuth, UsuarioController.getUser);
api.get('/search/:q', md_auth.ensureAuth, UsuarioController.getUserSearch);
// api.delete('/delete/:id', md_auth.ensureAuth, UsuarioController.deleteUser);
api.delete('/delete/:id', [md_auth.ensureAuth,md_admin.isAdmin], UsuarioController.deleteUser);
module.exports=api;
