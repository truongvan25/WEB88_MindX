import customerModel from "../model/customer.model.js"

export const customerMiddleWare = async (req, res, next)=>{
    const {name, email, age} = req.body;
    if (!name || !email || !age){
        return res.json("Missing required fields (name or email or age) to create a new customer");
    }
    else {
        const customer = await customerModel.find({email:email});
        if (customer.length === 0){
            next()
        }
        else{
            return res.json("This email has already existed, please try another");
        }
    }
}