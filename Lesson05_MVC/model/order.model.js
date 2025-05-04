import mongoose from "mongoose";
const orderScheme = new mongoose.Schema({
    customerId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    quantity : {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
})

const orderModel = mongoose.model('Order', orderScheme);
export default orderModel;