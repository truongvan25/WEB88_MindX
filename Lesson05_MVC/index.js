import express from "express"
import mongoose from "mongoose";
import productRoute  from "./route/productRoute.js";
import customerRoute from "./route/customerRoute.js";
import orderRoute from "./route/orderRoute.js";

const app = express()
app.use(express.json())


const connectToMongoDB = async () =>{
    try{
        const URL = "mongodb://localhost:27017/MVC"
        await mongoose.connect(URL);
        console.log("DB database Lesson05 connected successfully")
    }catch (error){
        console.log("MongoDB connected error: ", error);
        process.exit(1);
    }
}

app.use('/customer', customerRoute)
app.use('/product', productRoute)
app.use('/order', orderRoute )

const startServer = async () =>{
    await connectToMongoDB()
    app.listen(8080, ()=>{
        console.log(`Server is running at PORT 8080`)
    })
}
startServer();