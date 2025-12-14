"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const db_1 = require("../../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.authService = {
    async register(data) {
        const exists = await db_1.db.collection("users").findOne({
            $or: [
                { email: data.email },
                { userCode: data.userCode }
            ]
        });
        if (exists)
            return ({ message: "User already exists" });
        const hashed = await bcrypt_1.default.hash(data.password, 10);
        const user = {
            userCode: data.userCode,
            name: data.name,
            email: data.email,
            password: hashed,
            createdAt: new Date()
        };
        await db_1.db.collection("users").insertOne(user);
        return { message: "Registered successfully" };
    },
    async login(data) {
        const user = await db_1.db
            .collection("users")
            .findOne({ email: data.email });
        if (!user)
            return ({ message: "Invalid credentials" });
        const ok = await bcrypt_1.default.compare(data.password, user.password);
        if (!ok)
            return ({ meaasge: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({
            id: user.userCode,
            email: user.email
        }, process.env.JWT_SECRET, { expiresIn: "7d" });
        delete user.password;
        return {
            token,
            user: {
                id: user.userCode,
                name: user.name,
                email: user.email
            }
        };
    }
};
