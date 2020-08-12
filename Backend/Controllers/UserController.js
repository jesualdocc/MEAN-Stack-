var userModel = require('../Models/UserModel');
const bcrypt = require('bcryptjs');

exports.getAll = function (req, res, next){

    userModel.find(function(err, data){
      res.json(data);
    });
    
};

exports.getById = function (req, res, next){

    userModel.findById({_id: req.params.id}, (err, data)=>{
      res.json(data);
    });
};

exports.postData = async function (req, res, next){

  try{
    //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
 
  let newUser = userModel({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    userName:req.body.userName,
    email:req.body.email,
    phoneNumber:req.body.phoneNumber,
    role:req.body.role,
    password:hashedPassword
  });

    await newUser.save();
    res.json({msg:'successful post', ok:1});
  }
  catch(err){
    msg = err['errmsg'];
    retStr = {msg, ok:0};
    res.send(retStr);
  }
  
};

exports.deleteOne = function(req, res, next){
  try {
    userModel.remove({_id:req.params.id}, (err, data)=>{
      if(err){
        var tmp = {err};
        tmp = {errorMsg:tmp.err.message, ok:0, n:0} ;
        console.log('Erro' + tmp);
        res.send(tmp);
      }
      else{
        console.log('Good' + data);
        res.json(data);
      }
   
    });
   
} catch (err) {
    res.send(err);
 }
}
 
    

exports.deleteAll = function (req, res, next){

  userModel.remove(function(err, data){
    if(err){
      res.json(err);
    }
    else{
      res.json({msg:"Success"});
    }
    
  });
  
};

exports.update = function(req, res, next){
  // Validate Request (todo)
 
userModel.findByIdAndUpdate({_id:req.params.id},{
  firstName:req.body.firstName,
  lastName:req.body.lastName,
  userName:req.body.userName,
  email:req.body.email,
  phoneNumber:req.body.phoneNumber,
  role:req.body.role,
  password:req.body.password
}, (err, data)=>{

  if(err){
    res.json(err);
  }
  else{
    res.json({msg:"Success"});
  }

});

}
