import { authService } from "./auth.service";
import { db } from "../../config/db";

export const register = async (req: any, res: any) => {
  try {
    const result = await authService.register(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: any, res: any) => {
  const { token, user } = await authService.login(req.body);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.send(user );
};

export const profile = async (req: any, res: any) => {
  res.json(req.user);
};

export const getUsers = async (req: any, res: any) => {
  const users = await db
    .collection("users")
    .find({}, { projection: { password: 0 } })
    .toArray();

  res.json(users);
};
