import mongoose from "mongoose";
import dotenv from "dotenv";

export async function connectToMongoDB(callback) {
    dotenv.config();
    const uri = process.env.MONGOURI;
    mongoose.connect(uri).then(() => {
        console.log('Connected to MongoDB');
        callback();
    })
}