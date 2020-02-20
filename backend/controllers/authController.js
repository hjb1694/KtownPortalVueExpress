const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const User = require('../database/models/User');
const UserProfile = require('../database/models/UserProfile');
const {signUserToken, sanitizeTextField} = require('../util/helpers');


/*
POST /auth/register
Public 
*/

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

        await UserProfile.create(insertId);

        res.json({
            userId : insertId,
            token : signUserToken({userId : insertId, role : 1}) 
        });

        

    }catch(e){

        console.log(e);

        res.status(500).json({
            errors : [
                {msg : 'A server error has occurred.'}
            ]
        });

    }



}

/* 
POST /auth/login
Public
*/
exports.login = async (req,res) => {

    const {email, password} = req.body;

    try {

        const user = await User.findUserByEmail(email);

        if(!user){

            return res.status(404).json({
                errors : [
                    {msg : 'The credentials you entered are invalid or the user does not exist.'}
                ]
            });

        }

        const matched = bcrypt.compareSync(password, user.password);

        if(!matched){

            return res.status(404).json({
                errors : [
                    {msg : 'The credentials you entered are invalid or the user does not exist.'}
                ]
            });

        }

        return res.json({
            userId : user.id, 
            token : signUserToken({userId : user.id, role : user.role})
        });


    }catch(e){

        console.log(e);
        res.status(500).json({
            errors : [
                {msg : 'A server error has occurred.'}
            ]
        });

    }



}