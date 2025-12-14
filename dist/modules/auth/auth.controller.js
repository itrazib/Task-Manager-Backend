"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.profile = exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const db_1 = require("../../config/db");
const register = async (req, res) => {
    try {
        const result = await auth_service_1.authService.register(req.body);
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { token, user } = await auth_service_1.authService.login(req.body);
    res
        .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax"
    })
        .json(user);
};
exports.login = login;
const profile = async (req, res) => {
    res.json(req.user);
};
exports.profile = profile;
const getUsers = async (req, res) => {
    const users = await db_1.db
        .collection("users")
        .find({}, { projection: { password: 0 } })
        .toArray();
    res.json(users);
};
exports.getUsers = getUsers;
