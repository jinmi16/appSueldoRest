'use strict'
var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var CategoriaSchema=Schema({
	categoria:String

});

module.exports=mongoose.model('Categoria',CategoriaSchema);