var userModel = require('../Models/UserModel');

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

exports.postData = function (req, res, next){

  let newUser = userModel({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    userName:req.body.userName,
    email:req.body.email,
    phoneNumber:req.body.phoneNumber,
    role:req.body.role,
    password:req.body.password
  });
  
  newUser.save((err, someData)=>{
    if(err){
      res.json({msg:'Operation Failed', ErrorMessage:err})
    }
    else{
      res.json({msg:'successful post'})
    }
  })
  
};

exports.deleteOne = function(req, res, next){
  userModel.remove({_id:req.params.id}, (err, data)=>{
    if(err){
      res.err(err);
    }
    else{
      res.json(data);
    }
  })
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
