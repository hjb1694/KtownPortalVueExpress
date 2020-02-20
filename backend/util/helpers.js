const sanitizeHTML = require('sanitize-html');
const Entities = require('html-entities').AllHtmlEntities;
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const entities = new Entities();

const helpers = {
    stripTags(dirty){

        return sanitizeHTML(dirty, {
            allowedAttributes : []
        });
        
    }, 
    htmlEntityDecode(value){

        return entities.decode(value);

    }, 
    stripExcessWhitespaceTextField(value){

        return value.replace(/ {2,}/gm,' ').replace(/\n/gm, ' ');

    }, 
    stripExcessWhitespaceTextArea(value){

        return value.replace(/ {2,}/gm, ' ').replace(/\n{3,}/gm, '\n\n');

    }, 
    sanitizeTextField(value){

        return helpers.stripExcessWhitespaceTextField(helpers.stripTags(helpers.htmlEntityDecode(value))).trim();

    }, 
    sanitizeTextArea(value){

        return helpers.stripExcessWhitespaceTextArea(helpers.stripTags(helpers.htmlEntityDecode(value))).trim();

    }, 
    signUserToken({userId, role}){

        return jwt.sign({
            userId, 
            role
        }, config.jwt.secret, {
            expiresIn : '1 hour'
        });

    }
}

module.exports = helpers;