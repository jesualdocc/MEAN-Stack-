var mongoose = require('mongoose');



var userModelSchema = new mongoose.Schema(
    {
        first_name:{
            type:String,
            required:true
        },
        last_name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        Role:{
            type:String,
            required:true
        },

        enrollmentDate:{
            type:Date,
            default:Date.now
        }


    }
    
);

module.exports = mongoose.model('Users', userModelSchema);
