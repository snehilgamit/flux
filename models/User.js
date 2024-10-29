import { Schema, model, models } from "mongoose";
const UserSchema = new Schema({
    user_id: {
        type: String,
        unique: true,
        min: 5,
        max: 14
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
    referralOnboarding: {
        type: Number
    }
}, {
    timestamps: true,
    versionKey: false,
})

const User = models.User || model('User', UserSchema);

export default User;