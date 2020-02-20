const {check} = require('express-validator');
const moment = require('moment');
const User = require('../database/models/User');
const {sanitizeTextField} = require('../util/helpers');

module.exports = [
    check('email','Please enter a valid email address').trim().isEmail(), 
    check('email').custom(async value => {

        value = sanitizeTextField(value);


        const exists = await User.emailExists(value);

        if(exists) 
            throw new Error('this email address already exists!');

        return true;


    }),
    check('username').custom(value => {

        const usernameRegs = /^[A-Z0-9]{6,15}$/gi;

        if(!usernameRegs.test(value.trim()))
            throw new Error('Username must be between 6 to 15 characters, \
            contain only alphebetic characters and numbers, and have no spaces.');

        return true;
    }), 
    check('username').custom(async value => {

        value = sanitizeTextField(value);

        const exists = await User.usernameExists(value);

        if(exists)
            throw new Error('This username already exists');

        return true;

    
    }), 
    check('dob').custom(value => {

        const dob = moment(value, 'YYYY-MM-DD');

        if(!dob.isValid())
            throw new Error('Please enter a valid date of birth.');

        return true;
    }), 
    check('dob').custom(value => {

        const dob = moment(value, 'YYYY-MM-DD');

        const diff = moment(new Date()).diff(dob, 'years');

        if(diff < 13)
            throw new Error('You must be at least 13 to join.');

        return true;


    })
];