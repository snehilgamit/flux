const { Schema, model, models } = require("mongoose");

const TaskSchema = new Schema({
    uuid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    reward:{
        type:Number,
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
    api:{
        type:String,
        required:true
    },
    href:{
        type:String,
        required:true
    },
    referral_target:{
        type:Number,
        default:0
    }
})

const Task = models.Task || model('Task',TaskSchema)

export default Task;