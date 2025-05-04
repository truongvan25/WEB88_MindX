import mongoose from "mongoose";
const userScheme = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    fullName: {
        type: String,
        require: true
    },
    address: {
        type: String,
        unique: true
    },
    gender : {
        type: String,
        enum: ['male', 'female', 'other']
    }
},
{
    timestamps:true,
})
const userModel = mongoose.model('User', userScheme);
export default userModel;