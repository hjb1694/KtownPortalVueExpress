const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const User = require('../database/models/User');
const {signUserToken, sanitizeTextField} = require('../util/helpers');

exports.register = async (req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty())
        return res.status(422).json({errors : errors.array()});


    const {email, username, password, dob} = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);
    const vericode = uuid();

    try {

        const {insertId} = await User.create({
            username : sanitizeTextField(username), 
            email, 
            password : hashedPassword, 
            dob, 
            vericode
        });

        res.json({
            userId : insertId,
            token : signUserToken({userId : insertId, role : 1}) 
        });

        

    }catch(e){

        res.status(500).json({
            errors : [
                {msg : 'A server error has occurred.'}
            ]
        });

    }



}