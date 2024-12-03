import dotenv from 'dotenv'
dotenv.config();

import mongoose from "mongoose";

const URI = process.env.MONGO_URI

let isConnected = false

export const connectToDB = async () => {
    if(isConnected){
        console.log("DB already connected")
        return ;
    }
    try{
        await mongoose.connect(URI);
        isConnected = true;
        console.log("Connection established")
    }catch(error){
        console.log(error);
    }
}