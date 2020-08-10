var userModel = require('../Models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.login = async function(req, res, next){

    try{

        const user = await userModel.findOne({userName: req.body.userName});

        if(!user){
            
            return res.status(401).send({msg:'Username or Password is incorrect', isValid:false});
        }
    
        const validPass = await bcrypt.compare(req.body.password, user.password);
    
        if(!validPass){
            
            return res.status(401).send({msg:'Username or Password is incorrect', isValid:false}); 
        }
    
        //Create JWT
        
        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY, {expiresIn:"1h"});
        
        res.header('auth-token', token).status(200).send({token, msg: 'Login Successfull', isValid:true, userName:user.userName, role:user.role});
    }

    catch(err){
        
        res.send(err);
    }

};