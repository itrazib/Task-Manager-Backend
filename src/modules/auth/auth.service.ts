import { db } from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authService = {
 
  async register(data: any) {

    const exists = await db.collection("users").findOne({
      $or: [
        { email: data.email },
        { userCode: data.userCode }
      ]
    });

    if (exists) throw new Error("User already exists");

    const hashed = await bcrypt.hash(data.password, 10);

    const user = {
      userCode: data.userCode, 
      name: data.name,
      email: data.email,
      password: hashed,
      createdAt: new Date()
    };

    await db.collection("users").insertOne(user);

    return { message: "Registered successfully" };
  },


  async login(data: any) {
    const user: any = await db
      .collection("users")
      .findOne({ email: data.email });

    if (!user) throw new Error("Invalid credentials");

    const ok = await bcrypt.compare(data.password, user.password);
    if (!ok) throw new Error("Invalid credentials");

    
    const token = jwt.sign(
      {
        id: user.userCode, 
        email: user.email
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

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
