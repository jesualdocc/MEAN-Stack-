var mongoose = require('mongoose');
const user = require('../Models/UserModel');

var donationModelSchema = new mongoose.Schema(
    {
        amount:{
            type:Number,
            required:true
        },
        date:{
            type:Date,
            required:true
        },
      
        donatedBy:{
            type:[user], 
            //required:true
        },
        donationType:{
            type:String,
            required:true
        }
    });

    module.exports = mongoose.model('Donations', donationModelSchema);