"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// =====================
// AUTH ROUTES
// =====================
router.post("/register", auth_controller_1.register);
router.post("/login", auth_controller_1.login);
router.post("/logout", (req, res) => {
    res.clearCookie("token").json({ message: "Logged out" });
});
router.get("/me", auth_middleware_1.auth, auth_controller_1.profile);
router.get("/users", auth_middleware_1.auth, auth_controller_1.getUsers); // 🔥 dropdown user list
exports.default = router;
