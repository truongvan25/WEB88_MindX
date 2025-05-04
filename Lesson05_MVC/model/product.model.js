import mongoose from "mongoose";
const productScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity : {
        type: Number,
        required: true
    }
})

const productModel = mongoose.model('Product', productScheme);
export default productModel;