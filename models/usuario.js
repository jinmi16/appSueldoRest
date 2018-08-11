'use strict'
var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var UserSchema=Schema({
	nikname:String,
	nombre:String,
	apellido:String,
	email:String,
	telefono:String,
	edad:Number,
	password:String,
	rol : String,
	
});
module.exports=mongoose.model('Usuario',UserSchema);
















