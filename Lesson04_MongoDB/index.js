import express from "express"
import mongoose from "mongoose";
import userModel from "./models/users.model.js";
const app = express();
const PORT = 8080;
app.use(express.json());
// connection to mongoose
const connectToMongoDB = async () =>{
    try{
        const URL = "mongodb://localhost:27017/facebook"
        await mongoose.connect(URL);
        console.log("DB database connected successfully")
    }catch (error){
        console.log("MongoDB connected error: ", error);
        process.exit(1);
    }
}

// CRUD
app.post('/users', async (req, res)=>{
    const {userName, email, fullName, address, gender} = req.body;
    const user = new userModel({
        userName,
        email,
        fullName, 
        address,
        gender
    });
    try {
        const createdUser = await user.save();
        res.status(201).json(createdUser);
    }catch(error){
        res.json({
            message: error?.message,
        });
    };
});

// get all
app.get('/users', async (req, res) =>{
    try {
        const users = await userModel.find();
        res.json(users)
    }catch (error){
        res.json({
            message: error?.message,
        })
    }
})

// get by id
app.get('/users/:id', async (req, res) =>{
    const {id} = req.params;
    try {
        const users = await userModel.findById(id);
        res.json(users)
    }catch (error){
        res.json({
            message: error?.message,
        })
    }
})
// Start the server after connecting
const startServer = async () =>{
    await connectToMongoDB()
    app.listen(PORT, ()=>{
        console.log(`Server is running at PORT ${PORT}`)
    })
}
startServer();
