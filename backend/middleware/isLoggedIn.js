const jwt = require('jsonwebtoken');
const config = require('../config/config');


module.exports = (req,res,next) => {

    const token = req.header('authorization-token');

    if(!token)
        return res.status(403).json({errors : [
            {msg : 'Token missing'}
        ]});

    try {

        const decoded = jwt.verify(token, config.jwt.secret);

        req.userId = decoded.userId;

        next();


    }catch(e){

        res.status(403).json({errors : [
            {msg : 'Authentification failed.'}
        ]});


    }



}