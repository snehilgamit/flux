import { Schema, model, models } from "mongoose";
const UserSchema = new Schema({
    user_id: {
        type: String,
        unique: true,
        min: 5,
        max: 14
    },
    flux:{
        type:Number,
        default:0
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    username: {
        type: String
    },
    referralCode: {
        type: String
    },
    enteredReferralCode: {
        type: String
    },
    wallet:{
        type: Object,
        default:{
            public_key:'',
            status:false
        }
    },
    early_bird:{
        type:Boolean,
        default:false
    },
    transactions:{
        type:Array,
        default:[],
    }
    ,
    daily_login:{
        type:Object,
        default:{
            strike:0,
            timestemp: Date.now()
        }
    },
    completed_tasks:{
        type:Object,
        default:{}
    }
}, {
    timestamps: true,
    versionKey: false,
})

const User = models.User || model('User', UserSchema);

export default User;