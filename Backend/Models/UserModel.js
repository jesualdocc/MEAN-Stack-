var mongoose = require('mongoose');

var userModelSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        userName:{
            type:String,
            required:true,
            unique:true,
            minlength:5
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        phoneNumber:{
            type:Number
        },
        role:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true,
            minlength:6
        },

        enrollmentDate:{
            type:Date,
            default:Date.now
        }

    }  
);


module.exports = mongoose.model('Users', userModelSchema);

