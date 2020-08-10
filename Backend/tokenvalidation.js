const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function (req, res, next){
    const token = req.header('auth-token');

    if(!token) {
        return res.status(403).send('Unauthorized Access');
    }

    try{
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
    }
    catch(err){
        res.status(403).send('Invalid Token');
    }

    next();

}