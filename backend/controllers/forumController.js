const {validationResult} = require('express-validator');

exports.newPost = (req,res) => {

    let errors = validationResult(req);

    if(!errors.isEmpty())
        return res.status(422).json({errors : errors.array()});

    
    res.send({ok : 'passed'});
    


}