import customerModel from "../model/customer.model.js"
import orderModel from "../model/order.model.js"
import productModel from "../model/product.model.js";

const controller = {
    // customer
    // 1. Viết API để lấy toàn bộ danh sách khách hàng.
    getAllCustomer : async (req, res, next) =>{
        try {
            const customer = await customerModel.find();
            console.log(customer);
            res.json(customer);
        }catch (err){
            res.status(500).json({
                message: "Can't get all customer",
                error: err.message,
            });
        }
        
    },
    // 6. Thêm mới khách hàng
    postCustomer: async (req, res, next) =>{
        try{ 
            const {name, email, age} = req.body;
            const newCustomer = new customerModel({
                name,
                email,
                age
            })
            const createdCustomer = await newCustomer.save();
            res.status(201).json(createdCustomer);
        }catch (error){
            res.status(400).json({
                error: error?.message
            })
        }
    },

    // 2. Lấy thông tin chi tiết của một khách hàng
    getSpecific: async (req, res, next) =>{
        try {
            const {id} = req.params;
            const customer = await customerModel.findById(id);
            res.json(customer)
        }catch (error){
            res.status(400).json({
                error: error?.message
            })
        }
    },
    // 3. Lấy danh sách đơn hàng của một khách hàng cụ thể
    getOrderByCustomerId: async (req, res, next) =>{
        try {
            const {customerId} = req.params;
            const customerExist = await customerModel.findById(customerId)
            if (!customerExist ){
                throw new Error ("CustomerId not exist")
            }
            else {
                const order = await orderModel.find({customerId:customerId});
                res.json({
                    data: order,
            })}
        }catch (error){
            res.status(400).json({
                error: error?.message
            })
        }
    },
    // order
    // 7. Tạo mới đơn hàng
    postOrder: async (req, res, next) =>{
        try {
            const {customerId, productId, quantity} = req.body;  
            const product = await productModel.findById(productId);
            const newOrder = new orderModel({
                customerId, 
                productId, 
                quantity,
                totalPrice:  (quantity * product.price)
            })
            const createdOrder = await newOrder.save();
            product.quantity-=quantity;
            await product.save();
            res.json({
                message: "Order created successfully",
                createdOrder});
            
            
        }catch (error) {
            res.json({
                error: error?.message
            })
            
        }
    },
    updateOrder: async (req, res, next) =>{
        try {
            const {orderId} = req.params;
            const {customerId, productId, quantity} = req.body;  
            const product = await productModel.findById(productId);
            const order = await orderModel.findById(orderId);
            order.quantity += quantity;
            order.totalPrice = product.price * quantity;
            await order.save()
            product.quantity-=quantity;
            await product.save();
            res.json({
                message: "Order updated successfully",
                order});
        }catch (error) {
            res.json({
                error: error?.message
            })
            
        }
    },
    // 4. Lấy thông tin các đơn hàng với tổng giá trị trên 10 triệu
    getOrderOverTen: async (req, res, next)=>{
        try{
            const order = await orderModel.find({totalPrice: {$gt:10000000}});
            res.json(order)
        }catch(error){
            res.json({
                error:error?.message,
            })
        }
    },
    //product
    postProduct: async (req, res, next) =>{
        try {
            const {name, price, quantity} = req.body;
            const newProduct = new productModel({
                name, price, quantity
            })
            const createdProduct = await newProduct.save();
            res.json(createdProduct);
        }catch (error) {
            res.json({
                error: error?.message
            })
        }
    },
    // 5. Lọc danh sách sản phẩm theo khoảng giá
    getFilterMaxMin: async (req, res, next) =>{
        try {
            const {minPrice, maxPrice} = req.query;
            const order = await orderModel.find({
                totalPrice: {
                    $gt: minPrice,
                    $lt: maxPrice
                }
            })
            res.json(order)
        }catch (error){
            res.json({
                error: error?.message
            })
        }
    }
    // 8. PUT - Cập nhật số lượng sản phẩm trong đơn hàng


}

export default controller;