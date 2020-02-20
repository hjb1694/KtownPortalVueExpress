const {check} = require('express-validator');
const {sanitizeTextField, sanitizeTextArea} = require('../util/helpers');

module.exports = [
    check('headline').custom(value => {

        value = sanitizeTextField(value);

        if(value.length < 15 || value.length > 100)
            throw new Error('Headline must be between 15 and 100 characters.');

        return true;
    }), 
    check('content').custom(value => {

        value = sanitizeTextArea(value);

        if(value.length < 50 || value.length > 1500)
            throw new Error('Your content is either too short or too long.');

        return true;
    })
];