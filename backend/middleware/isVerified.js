const User = require('../database/models/User');

module.exports = async (req,res,next) => {

    try{

        const isVerfied = await User.checkIfVerified(req.userId);

        if(!isVerifed)
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