import dotenv from 'dotenv'
import { MongoClient } from "mongodb";



const client = new MongoClient(process.env.MONGO_URI!);


export const db = client.db("collaborative_task_manager");


export const connectDB = async () => {
await client.connect();
console.log("MongoDB Connected");
};