'use strict'
var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var UserSchema=Schema({
	titulo:String,
	descripcion:String,
	monto:Number,
	fecha:String,
    usuario:{type:Schema.ObjectId,ref:'Usuario'},
    categoria:{type:Schema.ObjectId,ref:'Categoria'},
    tipomovimiento:{type:Schema.ObjectId,ref:'Tipomovimiento'}
});

module.exports=mongoose.model('Movimiento',UserSchema);