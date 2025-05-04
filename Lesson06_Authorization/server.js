import express from 'express';
import { connectToMongoDB } from './configs/dbConfig.js';
const app = express();
app.use(express.json());
const PORT = 8080;
const startServer = async ()=>{
    await connectToMongoDB();
    app.listen(PORT, ()=>{
        console.log(`Server is running at ${PORT}`);
    })
}
startServer();
