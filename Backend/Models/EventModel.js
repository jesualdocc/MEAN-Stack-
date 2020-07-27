var mongoose = require('mongoose');


var eventModelSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
        },
        date:{
            type:Date,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        eventType:{
            type:String
        },
        status:{
            type:String,
            required:true
        },
    });

    
    module.exports = mongoose.model('Events', eventModelSchema);