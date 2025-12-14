import jwt from "jsonwebtoken";

export const auth = (req: any, res: any, next: any) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = {
      id: decoded.id,
      email: decoded.email
    };
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
