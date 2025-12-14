"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.db = void 0;
require('dotenv').config();
const mongodb_1 = require("mongodb");
const client = new mongodb_1.MongoClient(process.env.MONGO_URI);
exports.db = client.db("collaborative_task_manager");
const connectDB = async () => {
    await client.connect();
    console.log("MongoDB Connected");
};
exports.connectDB = connectDB;
