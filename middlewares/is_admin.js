'use strict'

exports.isAdmin=function(req,res,next){
    if(req.user.rol !='ADMIN'){
        return res.status(200).send({message:'No tienes privilegios'});
    }

    next();
};
