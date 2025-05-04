import customerModel from "../model/customer.model.js";
import productModel from "../model/product.model.js";
export const orderMiddleWare = async(req, res, next) =>{
    const {customerId, productId, quantity} = req.body;
    if (!customerId || !productId || !quantity){
        return res.json({
            message: "Missing required fields (customerId or productId or quantity)",
        })
    }
    else {
        if (! await customerModel.findById(customerId) || ! await productModel.findById(productId)){
            return res.status(404).json({
                message:"Customer or Product not exist"
            })
        }
        else{
            const product = await productModel.findById(productId);
            if (quantity > product.quantity){
                return res.status(404).json("The quantity of this order is greater than the number in the stock");
            }
            else next();
        }
    }
}