const { Schema, model, models } = require("mongoose");

const EventSchema = new Schema({
    uuid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    limit:{
        type:Number,
        required:true
    },
    left:{
        type:Number,
        required:true
    },
    reward:{
        type:Object,
    },
    description:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    },
    role:{
        type:String,
        default:'users'
    },
    end:{
        type:Number,
        required:true
    },
    api:{
        type:String,
        required:true
    },
    start:{
        type:Number,
        required:true
    },
    tasks:{
        type:Array,
    }
})

const Event = models.Events || model('Events',EventSchema)

export default Event;