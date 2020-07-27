var donationModel = require('../Models/DonationModel');

exports.getAll = function (req, res, next){

    donationModel.find(function(err, data){
      res.json(data);
    });
    
};

exports.getById = function (req, res, next){

    donationModel.findById({_id: req.params.id}, (err, data)=>{
      res.json(data);
    });
};

exports.postData = function (req, res, next){

  let newDonation = donationModel({
    amount:req.body.amount,
    date:req.body.date,
   donatedBy:req.body.donatedBy,
    donationType:req.body.donationType
  });
  
  newDonation.save((err, someData)=>{
    if(err){
      res.json({msg:'Operation Failed',err});
    }
    else{
      res.json({msg:'successful post'});
    }
  })
  
};

exports.deleteOne = function(req, res, next){
  donationModel.remove({_id:req.params.id}, (err, data)=>{
    if(err){
      res.err(err);
    }
    else{
      res.json(data);
    }
  })
}

exports.deleteAll = function (req, res, next){

  donationModel.remove(function(err, data){
    if(err){
      res.json(err);
    }
    else{
      res.json({msg:"Success"});
    }
    
  });
  
};

exports.update = function(req, res, next){
    
    let upadatedData;
    if(req.body!==undefined){
        upadatedData = req.body;
    }
   
    donationModel.findOneAndUpdate({_id:req.params.id}, upadatedData, {upsert:false, new:true}, (err, data)=>{
        if(err){

          res.json(err);

        } 
          else{
            res.json({msg:"Records Updated"});
          }
      });
 
}