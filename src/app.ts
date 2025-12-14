import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";
import taskRoutes from "./modules/task/task.routes";


const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-manager-backend-1-ijnn.onrender.com", 
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);


export default app;