'use strict'
var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var TipomovimientoSchema=Schema({
	movimiento:String

});

module.exports=mongoose.model('Tipomovimiento',TipomovimientoSchema);