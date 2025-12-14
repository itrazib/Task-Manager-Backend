import { Router } from "express";
import {
  register,
  login,
  profile,
  getUsers   // 🔥 MUST IMPORT
} from "./auth.controller";
import { auth } from "../../middlewares/auth.middleware";

const router = Router();

// =====================
// AUTH ROUTES
// =====================
router.post("/register", register);
router.post("/login", login);
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});


router.get("/me", auth, profile);
router.get("/users", auth, getUsers); // 🔥 dropdown user list

export default router;
