import express from 'express';
import { connectToMongoDB } from './configs/db.js';
import appRouter from './routes/index.js';

const app = express();
app.use(express.json());
const PORT = 8080;
app.use('/', appRouter)
const startServer = async ()=>{
    await connectToMongoDB();
    app.listen(PORT, ()=>{
        console.log(`Server is running at ${PORT}`);
    })
}
startServer();
