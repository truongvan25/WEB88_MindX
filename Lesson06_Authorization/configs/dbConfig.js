import mongoose from "mongoose";
export const connectToMongoDB = async () =>{
    try{
        const URL = "mongodb://localhost:27017/Lesson06_Authorization"
        await mongoose.connect(URL);
        console.log("DB database Lesson05 connected successfully")
    }catch (error){
        console.log("MongoDB connected error: ", error);
        process.exit(1);
    }
}