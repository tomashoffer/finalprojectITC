const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Leer el token del header
    const token = req.header('x-auth-token');

    // Revisar si no hay token

    if(!token){ 
        return res.status(401).json({msg: 'No hay Token, permiso denegado'})
    }

    // Validar el token
    try{
        const verificar = jwt.verify(token, process.env.SECRETA);
        req.user = verificar.user;
        next()
    }catch(err){
        res.status(401).json({msg: "Token no valido"})
    }

} 