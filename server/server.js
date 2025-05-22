import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import userRouter from './src/routes/user.js'
import taskRouter from './src/routes/task.js'

dotenv.config();

const app = express();

const connect = async ()=> {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB")
    } catch (error){
        throw error;
    }
};

mongoose.connection.on("disconnected",()=>{
    console.log("MongoDB disconnected");
})
mongoose.connection.on("connected",()=>{
    console.log("MongoDB connected");
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: 'http://localhost:5173',  
    credentials: true,   
}));
app.use(cookieParser())
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));

app.use('/api/v1/user',userRouter);
app.use('/api/v1/task',taskRouter);

app.listen(3000,()=> {
    connect();
    console.log(`Server is listening on port ${process.env.PORT}`);
})