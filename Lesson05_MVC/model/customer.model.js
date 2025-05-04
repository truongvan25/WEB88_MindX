import mongoose from "mongoose";
const customerScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    age : {
        type:Number,
        required: true
    }
})

const customerModel = mongoose.model('Customer', customerScheme);
export default customerModel;