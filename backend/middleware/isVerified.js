const User = require('../database/models/User');

module.exports = async (req,res,next) => {

    try{

        console.log('userId is ', req.userId);

        const isVerified = await User.checkIfVerified(req.userId);

        if(!isVerified)
            return res.status(403).json({
                errors : [
                    {msg : 'User has not been verified yet.'}
                ]
            });

        next();


    }catch(e){

        console.log(e);

        res.status(500).json({
            errors : [
                {msg : 'An error has occurred.'}
            ]
        });

    }


}